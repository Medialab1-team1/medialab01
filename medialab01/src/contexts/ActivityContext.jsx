import { createContext, useState } from "react";

// Context to provide the calculated activity data to all components that need it

export const ActivityContext = createContext();
export const ActivityContextProvider = ({ children }) => {
  const [activity, setActivity] = useState({
    averages: {
      head: {
        // add head activity here
      },
      body: {
        // add torso activity here
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
    },
    categorised: {
      // 0 = none , 1 = light intensity, 2 = high intensity
      head: {
        // add head activity here
      },
      body: {
        // add torso activity here
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
    },
    meta: {
      id: "",
      tresholds: {
        low: [0, 0, 0, 0, 0],
        high: [0, 0, 0, 0, 0],
      },
    },
  });
  return (
    <ActivityContext.Provider value={{ activity, setActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};
