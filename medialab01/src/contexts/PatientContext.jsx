import { createContext, useState } from "react";

// Context to provide the patient info to all components that need it.
export const PatientContext = createContext();

export const PatientContextProvider = ({ children }) => {
  const [patient, setPatient] = useState({
    age: 60, // starting age of bracket
    gender: "M", // unsure if this is needed
    // add other needed info here
    markers: [
      // {
      //   id: "", // index + type
      //   name: "", // optional
      //   type: "meal" | "poi", // type of marker medicine | meal | point of interest
      //   time: 0, // date time object
      // },
    ],
  });
  return (
    <PatientContext.Provider value={{ patient, setPatient }}>
      {children}
    </PatientContext.Provider>
  );
};
