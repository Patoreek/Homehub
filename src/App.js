import React, { useContext } from 'react';
import classes from './App.module.scss';

import MenuView from './containers/MenuView/MenuView';
import WhiteboardView from './containers/WhiteboardView/WhiteboardView';
import CollectionsView from './containers/CollectionsView/CollectionsView';
import EventsView from './containers/EventsView/EventsView';


import { ViewContext } from './context/GlobalContext';

function App() {

  const [ view, setView ] = useContext(ViewContext);



  return (
    <div className={classes.App}>

      {view === 'menu' ? <MenuView/> : ''}
      {view === 'whiteboard' ? <WhiteboardView/> : ''}
      {view === 'collections' ? <CollectionsView/> : ''}
      {view === 'events' ? <EventsView/> : ''}

    </div>
  );
}

export default App;
