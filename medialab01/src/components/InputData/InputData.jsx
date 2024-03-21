import clsx from "clsx";
import styles from "./InputData.module.css";

export default function InputData({ handleChange }) {

    return (
        <>
        <label className={clsx([styles.inputDataLabel])}>Upload sensordata</label>
            <input
              required
              type="file"
              id="sensordata"
              name="sensordata"
              accept=".csv"
              onChange={(event) => handleChange(event)}
              multiple
              className={clsx([styles.inputDataInput])}
            />
            </>
    )
}