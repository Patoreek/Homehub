import React, { useEffect, useState } from 'react';

import classes from './TodoList.module.scss';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';

import Checkbox from '@material-ui/core/Checkbox';


const TodoList = () => {

    const [ task, setTask ] = useState('');

    const [ table, setTable ] = useState([]);


    useEffect(() => {
        getListHandler();
    }, []);


    const getListHandler = () => {
        async function getList() {
    
            try {
                const response = await fetch('http://localhost:8080/todo/getList/',{
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();

                console.log("Table");
                console.log(data.entries);
                setTable(data.entries);


    
            } catch (error) {
            console.log(error);
            }
        }
    
        getList();

        // console.log('Table Below');
        // console.log(table);
    }

    const addBtnHandler = () => {
        console.log('adding to the database!');

        async function addTask() {

            try {
                const response = await fetch('http://localhost:8080/todo/addTask',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        task: task,
                        completed: false,
                    }) 
                });
                const data = await response.json();
                console.log(data);
                getListHandler();
                setTask("");
   
            } catch (error) {
            console.log(error);
            }
        }

        addTask();



    }

    const deleteBtnHandler = (id) => {
        console.log('deleting this entry from the database!');
        console.log(id);

        async function deleteTask() {

            try {
                const response = await fetch('http://localhost:8080/todo/deleteTask',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        taskId: id
                    }) 
                });
                const data = await response.json();
                console.log(data);
                getListHandler();
   
            } catch (error) {
            console.log(error);
            }
        }

        deleteTask();
    }

    const handleTaskChange = (event) => {
        setTask(event.target.value);
        console.log(task);
    };

    const handleCheckboxChange = (id) => {
        console.log('updating completion in the database!');
        console.log(id);

        async function updateCheckbox() {

            try {
                const response = await fetch('http://localhost:8080/todo/updateCheckbox/' + id,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        taskId: id
                    }) 
                });
                const data = await response.json();
                console.log(data);
                getListHandler();
   
            } catch (error) {
            console.log(error);
            }
        }

        updateCheckbox();

    }

    // function createData(task, completed) {
    //     return { task, completed};
    //   }
      
    //   const rows = [
    //     createData('Wash this', false),
    //     createData('Do that', true),
    //     createData('Complete this', false),
    //     createData('Finish That', false),
    //     createData('another task', false),
    //     createData('more tasks', true),
    //     createData('tough task', true),
    //     createData('extra things', false),
    //     createData('last task', false),
    //   ];


    return (
        <div className={classes.todoList}>

        <TableContainer component={Paper} className={classes.table}>
            <Table stickyHeader aria-label="todo table">
            <TableHead>
                <TableRow>
                    <TableCell className={`${classes.cellText} ${classes.cellBold}`}>Task</TableCell>
                    <TableCell className={`${classes.cellText} ${classes.cellBold}`} align="right">Completed?</TableCell>
                    <TableCell className={`${classes.cellText} ${classes.cellBold}`} align="right">Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody className={classes.loopedBody}>
            {table.map((row) => (
                <TableRow key={row.task} className={classes.entryRow}>
                <TableCell component="th" scope="row" className={`${classes.cellText}  ${classes.inputCell} `}>
                    {row.task}
                </TableCell>
                <TableCell className={classes.cellText} align="right">
                    <Checkbox
                        checked={row.completed}
                        onChange={() => handleCheckboxChange(row._id)}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        className={classes.checkBox}
                    />
                </TableCell>
                <TableCell className={classes.cellText} align="right">
                    <button className={classes.deleteBtn} onClick={() => deleteBtnHandler(row._id)}> - </button>
                </TableCell>


                </TableRow>
            ))}
            </TableBody>
            </Table>
        </TableContainer>        

        <TableContainer component={Paper} className={classes.bottomTable}>
            <Table stickyHeader aria-label="todo table">
            <TableHead>
                <TableRow key="Final">
                    <TableCell component="th" scope="row" className={`${classes.cellText} ${classes.cellBold}`}>
                       Add Task
                    </TableCell>
                    <TableCell component="th" scope="row" className={`${classes.cellText} ${classes.cellBold}`}/>
                   
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow key="Input">
                    <TableCell component="th" scope="row" className={`${classes.cellText} ${classes.inputCell} ${classes.inputNameCell} `}>
                        <input className={classes.input} 
                                type="text" id="name" 
                                name="name" 
                                placeholder="Enter Name here" 
                                value={task} 
                                onChange={handleTaskChange}/>
                    </TableCell>
                    <TableCell className={classes.cellText} align="right">
                        <button className={classes.addBtn} onClick={addBtnHandler}> + </button>
                    </TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </TableContainer>
    </div>
    );
};

export default TodoList;