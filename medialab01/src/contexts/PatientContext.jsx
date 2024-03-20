import { createContext } from "react";

// Context to provide the patient info to all components that need it.
export const PatientContext = createContext({
  age: "0", // starting age of bracket
  gender: "0", // unsure if this is needed
  // add other needed info here
});
