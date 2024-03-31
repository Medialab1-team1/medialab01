//import contexts
import { DataContextProvider } from "../../contexts/DataContext";
import { ActivityContextProvider } from "../../contexts/ActivityContext";
import { DifferenceContextProvider } from "../../contexts/DifferenceContext";
import { PatientContextProvider } from "../../contexts/PatientContext";

export default function ContextsProvider({ children }) {
  return (
    <>
      <PatientContextProvider>
        <DataContextProvider>
          <DifferenceContextProvider>
            <ActivityContextProvider>{children}</ActivityContextProvider>
          </DifferenceContextProvider>
        </DataContextProvider>
      </PatientContextProvider>
    </>
  );
}
