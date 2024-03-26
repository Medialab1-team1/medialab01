import { useContext, useEffect, useState } from "react";
import clsx from "clsx";

import { PatientContext } from "../../contexts/PatientContext";

import styles from "./PatientForm.module.css";

export default function PatientForm() {
  const { patient, setPatient } = useContext(PatientContext);
  const [age, setAge] = useState(patient.age);
  const [gender, setGender] = useState(patient.gender);

  function handleChange(event) {
    console.log(event.target.name, event.target.value);
    if (event.target.name === "age") {
      onAgeChange(event);
    }
    if (event.target.name === "gender") {
      onGenderChange(event);
    }
  }

  function onAgeChange(event) {
    console.log(event.target);
    setAge(event.target.value);
    patient.age = age;
    setPatient(patient);
    return;
  }

  function onGenderChange(event) {
    console.log(event.target, event.target.value);
    setGender(event.target.value);
    patient.gender = gender;
    setPatient(patient);
    return;
  }

  return (
    <>
      <label htmlFor="age">Leeftijd</label>
      <input
        required
        type="number"
        value={age}
        id="age"
        name="age"
        onChange={(event) => handleChange(event)}
        min="1"
      />
      <label htmlFor="gender">Geslacht</label>
      <select
        id="gender"
        name="gender"
        value={gender}
        onChange={(event) => handleChange(event)}
      >
        <option value="M" sele>
          M
        </option>
        <option value="V">V</option>
      </select>
    </>
  );
}
