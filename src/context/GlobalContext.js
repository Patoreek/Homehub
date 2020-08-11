import React, { useState, createContext } from 'react';

export const ViewContext = createContext();

export const PatTotalContext = createContext();

export const NickTotalContext = createContext();


export const GlobalProvider = (props) => {

    const [view, setView] = useState("menu");

    const [patTotal, setPatTotal] = useState(0);

    const [nickTotal, setNickTotal] = useState(0);


    return (
        <ViewContext.Provider value = {[view, setView]}>
            <PatTotalContext.Provider value = {[patTotal, setPatTotal]}>
                <NickTotalContext.Provider value = {[nickTotal, setNickTotal]}>

                {props.children}

                </NickTotalContext.Provider>
            </PatTotalContext.Provider>
        </ViewContext.Provider>
    );
}