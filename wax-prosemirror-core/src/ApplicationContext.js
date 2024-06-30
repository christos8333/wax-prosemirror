/* eslint react/prop-types: 0 */
/* eslint react/destructuring-assignment: 0 */
import React, { useEffect, useState } from 'react';

export const ApplicationContext = React.createContext({
  app: null,
  getPlugins: null,
});

export default ({ app, children }) => {
  const [application, setApplication] = useState(app);

  useEffect(() => {
    setApplication({ ...app });
  }, [app]);

  return (
    <ApplicationContext.Provider value={{ app: application }}>
      {children}
    </ApplicationContext.Provider>
  );
};
