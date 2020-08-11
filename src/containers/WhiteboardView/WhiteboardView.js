import React, { useContext } from 'react';

import classes from './WhiteboardView.module.scss';

import Whiteboard from '../../components/Whiteboard/Whiteboard';

import {PatTotalContext, NickTotalContext} from '../../context/GlobalContext';


const WhiteboardView = () => {


    const [ patTotal, setPatTotal ] = useContext(PatTotalContext);

    const [ nickTotal, setNickTotal ] = useContext(NickTotalContext);


  return (
    <div className={classes.whiteboardView}>
        <div className={classes.tableContainer}>
            <h3 className={classes.nameHeader}>Patrick</h3>
            <Whiteboard user="Patrick" rent={false}/>
        </div>
        <div className={classes.tableContainer}>
            <h3 className={classes.nameHeader}>Nick</h3>
            <Whiteboard user="Nick" rent={true}/>
        </div>
        <div className={classes.finalContainer}>
            Pat Total = {patTotal}
            Nick Total = {nickTotal}
        </div>
        
    </div>
  );
}

export default WhiteboardView;