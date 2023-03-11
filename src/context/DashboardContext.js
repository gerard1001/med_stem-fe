import { createContext, useMemo, useState } from 'react';

export const DashboardContext = createContext();

const DashboardContextProvider = ({ children }) => {
  const [rightSideBarContent, setRightSideBarContent] = useState(null);
  const [rightSideBarSize, setRightSideBarSize] = useState(null);

  const value = useMemo(
    () => ({
      rightSideBarContent,
      setRightSideBarContent,
      rightSideBarSize,
      setRightSideBarSize
    }),
    [rightSideBarContent, rightSideBarSize]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
