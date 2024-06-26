import { createContext, useState } from "react";

// Context to provide the data to all components that need it

export const DataContext = createContext();
export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState({
    head: {
      // add head sensors here
    },
    body: {
      // add torso sensors here
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
          above: [], // [0:'', 1:'', 2:yaw, 3:pitch, 4:roll, 5: 0, 6: 0, 7: diff(yaw), 8:diff(pitch), 9: diff(roll)]
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
      measurementsPerSecond: 32,
      start: 0, // date time string
      length: 0, // # lines / measurements per second
    },
  });
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
