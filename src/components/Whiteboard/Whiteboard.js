import React, { useState, useEffect, useContext } from 'react';

import classes from './Whiteboard.module.scss';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';

import ReplayIcon from '@material-ui/icons/Replay';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

import Modal from '../Modal/Modal';


import { PatTotalContext, NickTotalContext } from '../../context/GlobalContext';


const Whiteboard = (props) => {

    const [split, setSplit] = useState(null);
    const [ name, setName ] = useState('');
    const [ total, setTotal ] = useState('');
    const [ splitTotal, setSplitTotal ] = useState(0);
    const [ finalTotal, setFinalTotal ] = useState(0);
    const [ table, setTable ] = useState([]);

    const [ rent, setRent ] = useState(205);

    const [resetPressed, setResetPressed] = useState(false)

    const [patTotal, setPatTotal] = useContext(PatTotalContext);
    const [nickTotal, setNickTotal] = useContext(NickTotalContext);

    const user = props.user;

    useEffect(() => {
        getWhiteboardHandler();
        setPatTotal(finalTotal);
    }, []);

    useEffect(() => {

        if (split === "Yes"){ 
            setSplitTotal(total / 2);
        } else {
            setSplitTotal(total);
        }
    },[split]);

    const getWhiteboardHandler = () => {
        async function getWhiteboard() {
    
            try {
                const response = await fetch('http://localhost:8080/whiteboard/getWhiteboard/' + user,{
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();

                console.log("Table");
                console.log(data.entries);
                setTable(data.entries);

                // console.log("Rows");
                // console.log(rows);
            
                if (user === "Patrick"){
                    setPatTotal(0);
                } else if (user === "Nick") {
                    setNickTotal(0);
                }

                data.entries.map(entry => {
                    if (user === "Patrick"){
                        setPatTotal(patTotal => patTotal + entry.splitTotal);
                    } else if (user === "Nick") {
                        setNickTotal(nickTotal => nickTotal + entry.splitTotal);
                    }
                });

    
            } catch (error) {
            console.log(error);
            }
        }
    
        getWhiteboard();

        // console.log('Table Below');
        // console.log(table);
    }


    const handleRadioChange = (event) => {
      setSplit(event.target.value);
      console.log(split);
      if (split === "Yes"){ 
          setSplitTotal(total / 2);
      } else {
          setSplitTotal(total);
      }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
        console.log(name);
    };

    const handleTotalChange = (event) => {
        setTotal(event.target.value);
        console.log(total);


    };

    const addBtnHandler = () => {
        console.log('adding to the database!');

        async function addItem() {

            try {
                const response = await fetch('http://localhost:8080/whiteboard/addItem',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        name: name,
                        total: total,
                        split: split,
                        splitTotal: splitTotal,
                        user: user
                    }) 
                });
                const data = await response.json();
                console.log(data);
                getWhiteboardHandler();
                setName("");
                setTotal('');
                setSplit(null);
                setSplitTotal(null);
   
            } catch (error) {
            console.log(error);
            }
        }

        addItem();



    }

    const deleteBtnHandler = (id) => {
        console.log('deleting this entry from the database!');
        console.log(id);

        async function deleteItem() {

            try {
                const response = await fetch('http://localhost:8080/whiteboard/deleteItem',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        entryId: id
                    }) 
                });
                const data = await response.json();
                console.log(data);
                getWhiteboardHandler();
   
            } catch (error) {
            console.log(error);
            }
        }

        deleteItem();
    }

    const resetBtnHandler = () => {
        console.log('reseting...');
        
        async function resetBoard() {

                try {
                    const response = await fetch('http://localhost:8080/whiteboard/resetBoard/' + user,{
                        method: 'GET',
                        credentials: 'include',     
                    });
                    const data = await response.json();
                    console.log(data);
                    getWhiteboardHandler();
    
                } catch (error) {
                console.log(error);
                }
        }

        resetBoard();
        setResetPressed(false)
    }

  return (
    <div className={classes.whiteboard}>

        {resetPressed && (
            <Modal>
                <div className={classes.confirmContainer}>
                    <p className={classes.youSureText}> Are you sure?</p>
                    <button className={classes.noBtn} onClick={() => setResetPressed(false)}><ClearIcon className={classes.noIcon}/></button>
                    <button className={classes.yesBtn} onClick={resetBtnHandler}><CheckIcon className={classes.yesIcon}/></button>
                </div>
            </Modal>
        )}


        <TableContainer component={Paper} className={classes.table}>
            <Table stickyHeader aria-label="users table">
            <TableHead>
                <TableRow>
                    <TableCell className={`${classes.cellText} ${classes.cellBold}`}>Name</TableCell>
                    <TableCell className={`${classes.cellText} ${classes.cellBold}`} align="right">Total</TableCell>
                    <TableCell className={`${classes.cellText} ${classes.cellBold}`} align="right">Split</TableCell>
                    <TableCell className={`${classes.cellText} ${classes.cellBold}`} align="right">Split Total</TableCell>
                    <TableCell className={`${classes.cellText} ${classes.cellBold}`} align="right">Delete</TableCell>

                </TableRow>
            </TableHead>
            <TableBody className={classes.loopedBody}>
            {table.map((row) => (
                <TableRow key={row.name}>
                <TableCell component="th" scope="row" className={classes.cellText}>
                    {row.name}
                </TableCell>
                <TableCell className={classes.cellText} align="right">${row.total}</TableCell>
                <TableCell className={classes.cellText} align="right">{row.split ? "Yes" : "No"}</TableCell>
                <TableCell className={classes.cellText} align="right">${row.splitTotal}</TableCell>
                <TableCell className={classes.cellText} align="right">
                    <button className={classes.deleteBtn} onClick={() => deleteBtnHandler(row._id)}> - </button>
                </TableCell>


                </TableRow>
            ))}
            </TableBody>
            </Table>
        </TableContainer>        

        <TableContainer component={Paper} className={classes.bottomTable}>
            <Table stickyHeader aria-label="users table">
            <TableHead>
                <TableRow key="Final">
                    <TableCell component="th" scope="row" className={`${classes.cellText} ${classes.cellBold}`}>
                        {props.rent ? "Rent" : ""}
                    </TableCell>
                    <TableCell className={`${classes.cellText} ${classes.cellBold}`} align="right">
                        {props.rent ? "$" + rent : ""}
                    </TableCell>
                    <TableCell className={`${classes.cellText} ${classes.cellBold}`} align="right">Final Total</TableCell>
                    <TableCell className={`${classes.cellText} ${classes.cellBold}`} align="right">
                        ${user === "Patrick" ? patTotal.toFixed(2) : nickTotal.toFixed(2)}
                    </TableCell>
                    <TableCell className={`${classes.cellText} ${classes.cellBold}`} align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow key="Add" className={`${classes.rowLine}`}>
                    <TableCell component="th" scope="row" className={`${classes.cellText}`}>
                        <span className={classes.addText}>Add</span>
                    </TableCell>
                    <TableCell className={classes.cellText} align="right"></TableCell>
                    <TableCell className={classes.cellText} align="right"></TableCell>
                    <TableCell className={classes.cellText} align="right"></TableCell>
                    <TableCell className={classes.cellText} align="right">
                        <button className={classes.resetBtn} onClick={() => setResetPressed(true)}> <ReplayIcon className={classes.resetIcon}/> </button>
                    </TableCell>
                </TableRow>
                <TableRow key="Input">
                    <TableCell component="th" scope="row" className={`${classes.cellText} ${classes.inputCell} ${classes.inputNameCell} `}>
                        <input className={classes.input} 
                                type="text" id="name" 
                                name="name" 
                                placeholder="Enter Name here" 
                                value={name} 
                                onChange={handleNameChange}/>
                    </TableCell>
                    <TableCell className={`${classes.cellText} ${classes.inputCell} ${classes.inputTotalCell}  `} align="right">
                        <input className={`${classes.input} ${classes.numberRight}`} 
                                type="number" 
                                step="0.01" 
                                id="name" 
                                name="name" 
                                placeholder="$0.00"
                                value={total}
                                onChange={handleTotalChange}/>
                    </TableCell>
                    <TableCell className={classes.cellText} align="right">
                        Yes
                        <Radio
                            checked={split === 'Yes'}
                            onChange={handleRadioChange}
                            value="Yes"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'Yes' }}
                        />
                        / No
                        <Radio
                            checked={split === 'No'}
                            onChange={handleRadioChange}
                            value="No"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'No' }}
                        />
                    </TableCell>
                    {/* Split Total will automatically be calculated when the first two inputs have values */}
                    <TableCell className={classes.cellText} align="right">${splitTotal}</TableCell>
                    <TableCell className={classes.cellText} align="right">
                        <button className={classes.addBtn} onClick={addBtnHandler}> + </button>
                    </TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </TableContainer>
    </div>
  );
}

export default Whiteboard;


