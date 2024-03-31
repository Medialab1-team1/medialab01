import { useContext } from "react";
import clsx from "clsx";

import { ActivityContext } from "../../contexts/ActivityContext";
import { DifferenceContext } from "../../contexts/DifferenceContext";

export default function ActivityChecker() {
  const { activity } = useContext(ActivityContext);
  const { difference } = useContext(DifferenceContext);

  // Extract the hour array
  const hourArray = activity?.categorised?.legs?.left?.knee?.above?.hour ?? [];

  // Flatten the nested array and turn it into numbers
  const flattenedHours = hourArray.flat().map(Number);

  // Sum up all the numbers
  const totalHours = flattenedHours.reduce((acc, curr) => acc + curr, 0);

  return (
    <>
      {console.log("activity:", activity)}
      {console.log("hours:", totalHours)}
      {console.log("difference:", difference)}
    </>
  );
}
