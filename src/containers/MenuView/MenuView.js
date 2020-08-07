import React from 'react';

import classes from './MenuView.module.scss';

import bgVideo from '../../video/bg-video.mp4';

import { ReactComponent as WhiteboardSVG } from '../../images/whiteboard.svg';
import { ReactComponent as TodoSVG } from '../../images/todo.svg';
import { ReactComponent as CollectionSVG } from '../../images/collections.svg';
import { ReactComponent as EventSVG } from '../../images/events.svg';
import { ReactComponent as TelstraSVG } from '../../images/telstra_logo_1.svg';
import { ReactComponent as OptusSVG } from '../../images/optus_logo_1.svg';


const MenuView = () => {
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
                <button className={classes.btn}>
                    <WhiteboardSVG className={classes.svg}/>
                    <span className={classes.btnText}>Whiteboard</span>
                </button>
                <button className={classes.btn}>
                    <TelstraSVG className={classes.svg}/>
                    <span className={classes.btnText}>Telstra</span>
                </button>
                <button className={classes.btn}>
                    <OptusSVG className={classes.svg}/>
                    <span className={classes.btnText}>Optus</span>
                </button>
                <button className={classes.btn}>
                    <TodoSVG className={classes.svg}/>
                    <span className={classes.btnText}>To do</span>
                </button>
                <button className={classes.btn}>
                    <CollectionSVG className={classes.svg}/>
                    <span className={classes.btnText}>Collections</span>
                </button>
                <button className={classes.btn}>
                    <EventSVG className={classes.svg}/>
                    <span className={classes.btnText}>Events</span>
                </button>
            </div>
        </div>
    );
};

export default MenuView;