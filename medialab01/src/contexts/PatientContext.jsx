import { createContext, useState } from "react";

// Context to provide the patient info to all components that need it.
export const PatientContext = createContext();

export const PatientContextProvider = ({ children }) => {
  const [patient, setPatient] = useState({
      age: "0", // starting age of bracket
      gender: "0", // unsure if this is needed
      // add other needed info here
      labels : []
    
  });
  return (
    <PatientContext.Provider value={{ patient, setPatient }}>
      {children}
    </PatientContext.Provider>
  );
};
