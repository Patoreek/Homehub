import React, { useEffect, useContext, useState } from 'react';

import classes from './WhiteboardView.module.scss';

import Whiteboard from '../../components/Whiteboard/Whiteboard';
import MenuButton from '../../components/MenuButton/MenuButton';



import {PatTotalContext, NickTotalContext, RentCostContext} from '../../context/GlobalContext';


const WhiteboardView = () => {


    const [ patTotal, setPatTotal ] = useContext(PatTotalContext);

    const [ nickTotal, setNickTotal ] = useContext(NickTotalContext);

    const [ rentCost, setRentCost ] = useContext(RentCostContext);

    const [higherAmount, setHigherAmount] = useState({
        name:"",
        total: null
    });

    const [lowerAmount, setLowerAmount] = useState({
        name:"",
        total: null
    });

    const [formula, setFormula] = useState(0);

    useEffect(() => {

        if (nickTotal > patTotal){
            setHigherAmount({
                name: "Nick",
                total: nickTotal
            });
            setLowerAmount({
                name: "Patrick",
                total: patTotal
            })

            setRentCost(205);

            const calcFormula = (nickTotal - patTotal) + rentCost;
            setFormula(calcFormula.toFixed(2));


        } else {
            setHigherAmount({
                name: "Patrick",
                total: patTotal
            });
            setLowerAmount({
                name: "Nick",
                total: nickTotal
            })

            const leftOver = patTotal - nickTotal;

            if (leftOver > 0){
                setRentCost(205 - leftOver);
                setFormula((205 - leftOver).toFixed(2));

            }


        }




    },[nickTotal, patTotal])




  return (
    <div className={classes.whiteboardView}>

        <MenuButton/>

        <div className={classes.tableContainer}>
            <h3 className={classes.nameHeader}>Patrick</h3>
            <Whiteboard user="Patrick" rent={false}/>
        </div>
        <div className={classes.tableContainer}>
            <h3 className={classes.nameHeader}>Nick</h3>
            <Whiteboard user="Nick" rent={true}/>
        </div>



        <div className={classes.finalContainer}>
            <div className={classes.higherAmountTotalDiv}>
                <span className={classes.higherAmountTotalName}>{higherAmount.name}'s Total</span>
                <span className={classes.higherAmountTotalNum}>${higherAmount.total}</span>
            </div>

            <div className={classes.lowerAmountTotalDiv}>
                <span className={classes.lowerAmountTotalName}>{lowerAmount.name}'s Total</span>
                <span className={classes.lowerAmountTotalNum}>${lowerAmount.total}</span>
            </div>

            <div className={classes.minusCalcDiv}>
                <span className={classes.minusCalcName}>{higherAmount.name} Total - {lowerAmount.name} Total</span>
                <span className={classes.minusCalcNum}>${(higherAmount.total - lowerAmount.total).toFixed(2)} </span>
            </div>

            {rentCost === 205 && (
                <div className={classes.rentCalcDiv}>
                    <span className={classes.rentCalcName}>{higherAmount.name} Total - {lowerAmount.name} Total + Rent (${rentCost})</span>
                    <span className={classes.rentCalcNum}>${formula}</span>
                <br/>
                </div>
            )}
            {rentCost === 205 && (
                <div className={classes.finalCalcDiv}>
                    <span className={classes.finalCalcName}>Patrick owes Nick </span>
                    <span className={classes.finalCalcNum}>${formula}</span>
                </div>
            )}
            {rentCost != 205 && (
                /*I pay Nick this much for rent if I pay more than him that week: ${formula}*/
                <div className={classes.finalCalcDiv}>
                <span className={classes.finalCalcNamePat}>Patrick pays Nick this much for rent </span>
                <span className={classes.finalCalcNum}>${formula}</span>
            </div>
            )}

        </div>
        
        
    </div>
  );
}

export default WhiteboardView;