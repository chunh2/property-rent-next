"use client";

import { createContext, useEffect, useState } from "react";
import getStates, { StateType } from "../_utils/getStates";

export const StatesContext = createContext<null | StateType[]>(null);

function StatesProvider({ children }: { children: React.ReactNode }) {
  const [states, setStates] = useState<StateType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const states: StateType[] = (await getStates()) || [];

      setStates(states);
    };

    fetchData();
  }, []);

  return (
    <StatesContext.Provider value={states}>{children}</StatesContext.Provider>
  );
}

export default StatesProvider;
