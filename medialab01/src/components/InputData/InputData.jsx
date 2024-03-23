import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import Papa from "papaparse";

import { DataContext } from "../../contexts/DataContext";

import styles from "./InputData.module.css";

export default function InputData() {
  const { data, setData } = useContext(DataContext);

  const [uploadedBlobs, setUploadedBlobs] = useState([]);

  const [startDate, setStartDate] = useState(getDateString());

  const reader = new FileReader();

  // handling change in files selected
  function handleChange(event) {
    if (event.target.name === "sensordata") {
      onFilesChange(event);
      return;
    }
    if (event.target.name === "start-time") {
      onDateChange(event);
      return;
    }
  }

  function onDateChange(event) {
    setStartDate(event.target.value);
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
    reader.onerror = () => console.log(reader.error);
  }

  // parsing read files
  function parseFile(blob) {
    const parsedFile = Papa.parse(blob);
    return parsedFile.data;
  }

  function getDateString() {
    const date = new Date().toISOString();
    return date.substring(0, date.length - 8);
  }

  useEffect(() => {
    if (uploadedBlobs.length > 0) {
      if (data.legs.left.knee.above.length > 0) {
        setData((data.legs.left.knee.above = []));
      }
      for (let blob of uploadedBlobs) {
        data.legs.left.knee.above.push(parseFile(blob));
      }
      data.legs.left.knee.above = data.legs.left.knee.above.flat();
      setData(data);
    }
  }, [uploadedBlobs]);

  useEffect(() => {
    data.meta.start = startDate;
    setData(data);
  }, [startDate]);

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
        type="datetime-local"
        id="start-time"
        name="start-time"
        value={startDate && startDate}
        min="2024-01-01T00:00"
        max="2424-12-31T23:59"
        onChange={(event) => handleChange(event)}
      />
    </>
  );
}
