import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import Papa from "papaparse";

import { DataContext } from "../../contexts/DataContext";

import InputData from "../InputData/InputData";
import PatientForm from "../PatientForm/PatientForm";

import styles from "./UploadPopup.module.css";

export default function UploadPopup({ setRequestDataUpload }) {
  const { data, setData } = useContext(DataContext);

  const [uploadedBlobs, setUploadedBlobs] = useState([]);

  function handleChange(event) {
    event.preventDefault();
    const reader = new FileReader();
    const uploadedFiles = event.target.files;
    let i = 0;
    let readFiles = [];
    readFile(i, uploadedFiles, reader, readFiles);
  }

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

  function parseFile(blob) {
    const parsedFile = Papa.parse(blob);
    return parsedFile.data;
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

  return (
    <div className={clsx([styles.popupContainer])}>
      <div className={clsx([styles.popupTitleWrapper])}>
        <h1 className={clsx([styles.title])}>Nieuwe meting uploaden</h1>
        <button
          className={clsx([styles.closeButton])}
          onClick={() => {
            setRequestDataUpload((v) => !v);
          }}
          name="popup sluiten"
          aria-label="popup sluiten"
        >
          X
        </button>
      </div>
      <div className={clsx([styles.popupContentWrapper])}>
        <div className={clsx([styles.uploadContainer])}>
           <InputData handleChange={handleChange} />
           <PatientForm />
        </div>
      </div>
    </div>
  );
}
