import { useContext } from "react";
import clsx from "clsx";

import { ActivityContext } from "../../contexts/ActivityContext";
import { DifferenceContext } from "../../contexts/DifferenceContext";

export default function ActivityChecker() {
  const { activity } = useContext(ActivityContext);
  const { difference } = useContext(DifferenceContext);
  return (
    <>
      {console.log("activity:", activity)}
      {console.log("difference:", difference)}
    </>
  );
}
