import { createContext, useState } from "react";

// Context to provide the calculated activity data to all components that need it

export const DifferenceContext = createContext();
export const DifferenceContextProvider = ({ children }) => {
  const [difference, setDifference] = useState({
    head: {
      // add head difference here
    },
    body: {
      // add torso difference here
    },
    arms: {
      // divided in a left and right arm
      left: {
        // shoulders down to hand
        shoulder: {
          above: [],
          below: [],
        },
        elbow: {
          above: [],
          below: [],
        },
        wrist: {
          above: [],
          below: [],
        },
        hand: [],
      },
      right: {
        // shoulders down to hand
        shoulder: {
          above: [],
          below: [],
        },
        elbow: {
          above: [],
          below: [],
        },
        wrist: {
          above: [],
          below: [],
        },
        hand: [],
      },
    },
    legs: {
      // divided in a left and right leg
      left: {
        butt: [],
        hip: [],
        knee: {
          above: [],
          below: [],
        },
        ankle: {
          above: [],
          below: [],
        },
        foot: [],
      },
      right: {
        butt: [],
        hip: [],
        knee: {
          above: [],
          below: [],
        },
        ankle: {
          above: [],
          below: [],
        },
        foot: [],
      },
    },
    meta: {
      id: "",
      start: 0, // date time string
      length: 0, // # lines / measurements per second assumed to be 32
    },
  });
  return (
    <DifferenceContext.Provider value={{ difference, setDifference }}>
      {children}
    </DifferenceContext.Provider>
  );
};
