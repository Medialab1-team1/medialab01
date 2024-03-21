import { useContext, useEffect, useState } from "react";
import clsx from "clsx";

import { PatientContext } from "../../contexts/PatientContext";

import styles from "./PatientForm.module.css";

export default function PatientForm({  }) {
   const {patient, setPatient } = useContext(PatientContext);

   function handleChange(e) {
    console.log(e)
   }
   
   return (
   <>
   <form className={clsx([styles.patientForm])} onSubmit={(e) => e.preventDefault()} id="patientForm" name="patientForm">
    <h3>Info</h3>
    <input type="number" value={patient.age} id="age" name="age" onChange={(e) => handleChange(e)}/>
    <select id="gender" name="gender" onChange={(e) => handleChange(e)}>
        <option>M</option>
        <option>V</option>
    </select>

    <h3>Labels</h3>
    

    <input type="submit" value="Verzenden" onSubmit={(e) => e.preventDefault()}/>
   </form>
    </>
   )
}