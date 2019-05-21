export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };
  
  export const emptyState = () => {
    localStorage.removeItem('state');
  };

  export const getAccessToken = () => {
    const state = loadState();
    return (state && state.accessToken) || '';
  };
  
  
  export const getLoggedInUser = () => {
    const state = loadState();
    return (state && state.user) || {};
  };

  export const saveState = (data) => {
    try {
      const serializedState = JSON.stringify(data);
      localStorage.setItem('state', serializedState);
    } catch (e) {
      // ignore errors
    }
  };