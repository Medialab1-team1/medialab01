import { useContext, useEffect, useState } from "react";
import clsx from "clsx";

import { PatientContext } from "../../contexts/PatientContext";

import styles from "./PatientForm.module.css";

export default function PatientForm({}) {
  const { patient, setPatient } = useContext(PatientContext);
  const [age, setAge] = useState(patient.age);

  function handleChange(event) {
    if (event.target.name === "age") {
      setAge(event.target.value);
      patient.age = age;
      setPatient(patient);
      return;
    }
  }

  return (
    <>
      <input
        type="number"
        value={age}
        id="age"
        name="age"
        onChange={(event) => handleChange(event)}
      />
      <select id="gender" name="gender" onChange={(e) => handleChange(e)}>
        <option>M</option>
        <option>V</option>
      </select>

      <h3>Labels</h3>
    </>
  );
}
