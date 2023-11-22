// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { isAndroid, isIOS } from 'react-device-detect';

const App: React.FC = () => {
  const getRedirectUrl = () => {
    if (isAndroid) {
      return 'https://play.google.com/store/apps/details?id=com.gdglagos.devfestlg';
    } else if (isIOS) {
      return 'https://apps.apple.com/us/app/devfest-lagos-23/id6471590430';
    } else {
      return 'https://devfestlagos.com/';
    }
  };

  return (
    <Router>
      <Route
        render={() => <Redirect to={getRedirectUrl()} />}
      />
    </Router>
  );
};

export default App;
