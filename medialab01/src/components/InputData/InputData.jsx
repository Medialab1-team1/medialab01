import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import Papa from "papaparse";

import { DataContext } from "../../contexts/DataContext";
import { DifferenceContext } from "../../contexts/DifferenceContext";
import { ActivityContext } from "../../contexts/ActivityContext";

import styles from "./InputData.module.css";

export default function InputData() {
  const { data, setData } = useContext(DataContext);
  const { difference, setDifference } = useContext(DifferenceContext);
  const { activity, setActivity } = useContext(ActivityContext);

  const [uploadedBlobs, setUploadedBlobs] = useState([]);

  const [startTime, setStartTime] = useState(getTimeString());

  const reader = new FileReader();

  // handling change in files selected
  function handleChange(event) {
    if (event.target.name === "sensordata") {
      onFilesChange(event);
      return;
    }
    if (event.target.name === "start-time") {
      onTimeChange(event);
      return;
    }
  }

  function onTimeChange(event) {
    setStartTime(event.target.value);
    data.meta.start = startTime;
    setData({ ...data });
  }

  function onFilesChange(event) {
    const uploadedFiles = event.target.files;
    let i = 0;
    let readFiles = [];
    readFile(i, uploadedFiles, reader, readFiles);
  }

  // reading files from disk
  function readFile(i, uploadedFiles, reader, readFiles) {
    reader.readAsText(uploadedFiles[i]);
    i++;
    reader.onload = () => {
      readFiles.push(reader.result);
      if (i < uploadedFiles.length) {
        readFile(i, uploadedFiles, reader, readFiles);
      }
      if (i === uploadedFiles.length) {
        setUploadedBlobs(readFiles);
      }
    };
    reader.onerror = () => console.error(reader.error);
  }

  // parsing read files
  function parseFile(blob) {
    const parsedFile = Papa.parse(blob, { skipEmptyLines: "greedy" });
    return parsedFile.data;
  }

  function getTimeString() {
    const time = new Date().toTimeString();
    return time.slice(0, 5);
  }

  function calculateDifference(arr, i) {
    let diff = [];
    if (i === 0) {
      diff = [0, 0, 0, 0, 0];
    } else {
      const previousEntry = data.legs.left.knee.above[i - 1];
      diff = arr.map((v, i) => v - previousEntry[i]);
    }
    return diff;
  }

  function calculateActivity(inputArr) {
    let averageOutput = { second: [], minute: [], hour: [] };
    let activities = { second: [], minute: [], hour: [] };
    // split input into second long sub-arrays
    let seconds = [];
    let minutes = [];
    let hours = [];

    // calculate average per second
    let i = 0;
    while (i < inputArr.length) {
      seconds.push(inputArr.slice(i, (i += data.meta.measurementsPerSecond)));
    }
    activities.second = calculateTotalActivity(seconds);
    averageOutput.second = calculateAvg(activities.second, seconds);

    // calculate per minute
    i = 0;
    while (i < inputArr.length) {
      minutes.push(
        inputArr.slice(i, (i += data.meta.measurementsPerSecond * 60))
      );
    }
    activities.minute = calculateTotalActivity(minutes);
    averageOutput.minute = calculateAvg(activities.minute, minutes);

    // calculate per hour
    i = 0;
    while (i < inputArr.length) {
      hours.push(
        inputArr.slice(i, (i += data.meta.measurementsPerSecond * 60 * 60))
      );
    }
    activities.hour = calculateTotalActivity(hours);
    averageOutput.hour = calculateAvg(activities.hour, hours);

    return averageOutput;

    // calculate the total activity
    function calculateTotalActivity(array) {
      let output = [];
      array.map((value, i) => {
        let activity = [0, 0, 0, 0, 0];
        value.map((measurement, i) => {
          measurement.map((v, i) => {
            activity[i] += Math.abs(parseFloat(v));
          });
        });
        output.push(activity);
      });
      return output;
    }

    // average activity
    function calculateAvg(activity, timeArray) {
      let average = [];
      activity.map((value, index) => {
        let avg = [0, 0, 0, 0, 0];
        value.map((v, i) => {
          avg[i] = v / timeArray[index].length;
        });
        average.push(avg);
      });
      return average;
    }
  }

  function categoriseActivity(input) {
    let categorisedOutput = { second: [], minute: [], hour: [] };
    // define tresholds if not defined in context
    if (
      activity.meta.tresholds.low[3] === 0 &&
      activity.meta.tresholds.high[3] === 0
    ) {
      let all = [[], [], [], [], []];

      input.second.map((second) => {
        second.map((v, i) => {
          all[i].push(v);
        });
      });
      all.map((array, i) => {
        all[i] = array.sort();
      });
      [activity.meta.tresholds.low[2], activity.meta.tresholds.high[2]] = [
        all[2][Math.floor(all[2].length * 0.2)],
        all[2][Math.floor(all[2].length * 0.7)],
      ];
      [activity.meta.tresholds.low[3], activity.meta.tresholds.high[3]] = [
        all[3][Math.floor(all[3].length * 0.2)],
        all[3][Math.floor(all[3].length * 0.7)],
      ];
      [activity.meta.tresholds.low[4], activity.meta.tresholds.high[4]] = [
        all[4][Math.floor(all[4].length * 0.2)],
        all[4][Math.floor(all[4].length * 0.7)],
      ];
      console.log(
        "tresholds: low:",
        activity.meta.tresholds.low,
        "high:",
        activity.meta.tresholds.high
      );
    }
    console.log(input);
    categorisedOutput.second = assignCategories(input.second);
    categorisedOutput.minute = assignCategories(input.minute);
    categorisedOutput.hour = assignCategories(input.hour);
    console.log(categorisedOutput);
    return categorisedOutput;
    // run through all averages and assign category based on tresholds
    function assignCategories(input) {
      let categorised = [];
      const tresholds = activity.meta.tresholds;

      input.map((value) => {
        let cat = [0, 0, 0, 0, 0];
        value.map((v, i) => {
          if (i >= 2) {
            cat[i] = v > tresholds.high[i] ? 2 : v > tresholds.low[i] ? 1 : 0;
          }
        });
        categorised.push(cat);
      });
      return categorised;
    }
  }

  useEffect(() => {
    if (uploadedBlobs.length > 0) {
      if (data.legs.left.knee.above.length > 0) {
        data.legs.left.knee.above = [];
        setData({ ...data });
      }
      for (let blob of uploadedBlobs) {
        data.legs.left.knee.above.push(parseFile(blob));
      }
      data.legs.left.knee.above = data.legs.left.knee.above.flat();

      if (data.legs.left.knee.above.length > 0) {
        // go through all datapoints and calculate differences
        const differences = data.legs.left.knee.above.map((arr, i) =>
          calculateDifference(arr, i)
        );
        difference.legs.left.knee.above = differences;

        // calculate average activity movement
        activity.averages.legs.left.knee.above = calculateActivity(
          difference.legs.left.knee.above
        );

        //categorise activity
        activity.categorised.legs.left.knee.above = categoriseActivity(
          activity.averages.legs.left.knee.above
        );

        // fill in the meta tags
        data.meta.length = Math.ceil(data.legs.left.knee.above.length / 32);
        data.meta.id = crypto.randomUUID();
        activity.meta = { ...activity.meta, ...data.meta };
        difference.meta = { ...difference.meta, ...data.meta };

        // set data and activity
        setData({ ...data });
        setActivity({ ...activity });
        setDifference({ ...difference });
      }
    }
  }, [uploadedBlobs]);

  // apparently this is important, somehow...
  useEffect(() => {
    data.meta.start = startTime;
  }, [startTime]);

  // useEffect(() => {}, [data]);

  return (
    <>
      <label className={clsx([styles.inputDataLabel])}>
        Selecteer sensordata
      </label>
      <input
        required
        type="file"
        id="sensordata"
        name="sensordata"
        accept=".csv"
        onChange={(event) => handleChange(event)}
        multiple
        className={clsx([styles.inputDataInput])}
      />
      <label className={clsx([styles.inputDataLabel])}>
        Begintijd van meting
      </label>
      <input
        type="time"
        id="start-time"
        name="start-time"
        value={startTime ?? "12:00"}
        min="00:00"
        max="23:59"
        onChange={(event) => handleChange(event)}
      />
    </>
  );
}
