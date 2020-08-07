import React from 'react';
import classes from './App.module.scss';

import MenuView from './containers/MenuView/MenuView';

function App() {
  return (
    <div className={classes.App}>
      
      <MenuView/>
    </div>
  );
}

export default App;
