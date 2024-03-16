import React from 'react';
import { Route } from 'react-router-dom';
import CreateTokenForm from './components/CreateTokenForm';
import MintTokenForm from './components/MintTokenForm';
import CustomSwitch from './components/CustomSwitch';

const App = () => {
  return (
    <div>
      <CustomSwitch>
        <Route path="/create-token" component={CreateTokenForm} />
        <Route path="/mint-token" component={MintTokenForm} />
      </CustomSwitch>
    </div>
  );
};

export default App;