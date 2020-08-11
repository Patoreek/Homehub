import React, {useContext} from 'react';

import classes from './MenuButton.module.scss';

import { ViewContext } from '../../context/GlobalContext';

const MenuButton = () => {

    const [ view, setView ] = useContext(ViewContext);

    const btnHandler = () => {
        console.log("Back Pressed");
        setView("menu");
    }

    return (
        <div>
            <button 
                className={classes.btn}
                onClick={btnHandler}><span>Menu</span></button>
        </div>
    );
};

export default MenuButton;