import { useContext, useEffect } from "react";
import clsx from "clsx";

import { PatientContext } from "../../contexts/PatientContext";

import styles from "./PatientChecker.module.css";

export default function PatientChecker() {
  const { patient } = useContext(PatientContext);
  useEffect(() => {
    console.log(patient);
  }, [patient]);
  return (
    <>
      <div
        className={clsx([
          styles.dataChecker,
          patient.age > 0 && styles.success,
        ])}
      >
        {`i ${patient.age > 0 ? "can" : "can't"} see patient's age! ${
          patient.age
        }`}
      </div>
      <div
        className={clsx([
          styles.dataChecker,
          patient.gender === "V" && styles.success,
        ])}
      >
        {`i ${patient.gender ? "can" : "can't"} see gender ${patient.gender}`}
      </div>
      <div
        className={clsx([
          styles.dataChecker,
          patient.markers.length > 0 && styles.success,
        ])}
      >
        {`i ${patient.markers.length > 0 ? "can" : "can't"} see markers ${
          patient.markers.length
        }`}
      </div>
    </>
  );
}
