import React, { useContext } from 'react';
import classes from './MenuView.module.scss';

import bgVideo from '../../video/bg-video.mp4';

import { ReactComponent as WhiteboardSVG } from '../../images/whiteboard.svg';
import { ReactComponent as TodoSVG } from '../../images/todo.svg';
import { ReactComponent as CollectionSVG } from '../../images/collections.svg';
import { ReactComponent as EventSVG } from '../../images/events.svg';
import { ReactComponent as TelstraSVG } from '../../images/telstra_logo_1.svg';
import { ReactComponent as OptusSVG } from '../../images/optus_logo_1.svg';

import { ViewContext } from '../../context/GlobalContext';


const MenuView = () => {

    const [ view, setView ] = useContext(ViewContext);

    const buttonHandler = (btnType) => {
        console.log("Button Pressed.");

        if (btnType === "whiteboard"){
            console.log("Whiteboard Pressed");
            setView('whiteboard');
        } else if (btnType === "todo") {
            console.log("Todo Pressed");
            setView('todo');
        } else if (btnType === "collections") {
            console.log("Collections Pressed");
            setView('collections');

        } else if (btnType === "events") {
            console.log("Events Pressed");
            setView('events');
        }
    }


    return (
        <div className={classes.menuView}>
            
            <div className={classes.bgVideoContainer}>
                    <div className={classes.bgOverlay}></div>
                    <video className={classes.video} autoPlay muted loop>
                        <source src={bgVideo} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                    
            </div>

            <h1 className={classes.menuViewHeader}>Homehub</h1>

            <div className={classes.btnContainer}>
                <div className={classes.btn} onClick={() => buttonHandler("whiteboard")}>
                    <WhiteboardSVG className={classes.svg}/>
                    <span className={classes.btnText}>Whiteboard</span>
                </div>
                <div className={classes.btn}>
                    <a href="https://www.telstra.com.au/" target="_blank">
                        <TelstraSVG className={classes.svg}/>
                        <span className={classes.btnText}>Telstra</span>
                    </a>
                </div>
                <div className={classes.btn}>
                    <a href="https://www.optus.com.au/" target="_blank">
                    <OptusSVG className={classes.svg}/>
                    <span className={classes.btnText}>Optus</span>
                    </a>
                </div>
                <div className={classes.btn} onClick={() => buttonHandler("todo")}>
                    <TodoSVG className={classes.svg}/>
                    <span className={classes.btnText}>To do</span>
                </div>
                <div className={classes.btn} onClick={() => buttonHandler("collections")}>
                    <CollectionSVG className={`${classes.svg} ${classes.collectionSVG}`}/>
                    <span className={classes.btnText}>Collections</span>
                </div>
                <div className={classes.btn} onClick={() => buttonHandler("events")}>
                    <EventSVG className={`${classes.svg} ${classes.eventSVG}`}/>
                    <span className={classes.btnText}>Events</span>
                </div>
            </div>
        </div>
    );
};

export default MenuView;