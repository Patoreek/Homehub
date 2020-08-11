import React, { useState, createContext } from 'react';

export const ViewContext = createContext();

export const PatTotalContext = createContext();

export const NickTotalContext = createContext();

export const RentCostContext = createContext();


export const GlobalProvider = (props) => {

    const [view, setView] = useState("menu");

    const [patTotal, setPatTotal] = useState(0);

    const [nickTotal, setNickTotal] = useState(0);

    const [rentCost, setRentCost] = useState(205);



    return (
        <ViewContext.Provider value = {[view, setView]}>
            <PatTotalContext.Provider value = {[patTotal, setPatTotal]}>
                <NickTotalContext.Provider value = {[nickTotal, setNickTotal]}>
                <RentCostContext.Provider value = {[rentCost, setRentCost]}>

                    {props.children}

                </RentCostContext.Provider>
                </NickTotalContext.Provider>
            </PatTotalContext.Provider>
        </ViewContext.Provider>
    );
}