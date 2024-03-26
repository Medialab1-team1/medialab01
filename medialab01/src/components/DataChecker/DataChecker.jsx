import { useContext } from "react";
import clsx from "clsx";

import { DataContext } from "../../contexts/DataContext";

import styles from "./DataChecker.module.css";

export default function DataChecker() {
  const { data } = useContext(DataContext);
  return (
    <>
      <div
        className={clsx([
          styles.dataChecker,
          data.legs.left.knee.above.length > 0 && styles.success,
        ])}
      >
        {`i ${
          data.legs.left.knee.above.length > 0 ? "can" : "can't"
        } see left knee data! ${data.legs.left.knee.above.length}`}
      </div>
      <div
        className={clsx([
          styles.dataChecker,
          data.meta.start.length && styles.success,
        ])}
      >
        {`i ${data.meta.start.length > 0 ? "can" : "can't"} see start time ${
          data.meta.start
        }`}
      </div>
    </>
  );
}
