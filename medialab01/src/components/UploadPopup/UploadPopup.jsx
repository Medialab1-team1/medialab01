import clsx from "clsx";

import InputData from "../InputData/InputData";
import PatientForm from "../PatientForm/PatientForm";

import styles from "./UploadPopup.module.css";
import MarkerForm from "../MarkerForm/MarkerForm";

export default function UploadPopup({ setRequestDataUpload }) {
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
          <form
            id="data-form"
            name="data-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className={clsx([styles.formHeader])}>Sensordata</h3>
            <InputData />
            <h3 className={clsx([styles.formHeader])}>Info</h3>
            <PatientForm />
            <h3 className={clsx([styles.formHeader])}>Markers</h3>
            <MarkerForm />
            <input name="submit" type="submit" value={"Meting uploaden"} />
          </form>
        </div>
      </div>
    </div>
  );
}
