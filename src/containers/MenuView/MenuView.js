import React from 'react';

import classes from './MenuView.module.scss';

import bgVideo from '../../video/bg-video.mp4';

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
        </div>
    );
};

export default MenuView;