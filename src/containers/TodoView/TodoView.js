import React from 'react';

import classes from './TodoView.module.scss';

import TodoList from '../../components/TodoList/TodoList';

import MenuButton from '../../components/MenuButton/MenuButton';

const TodoView = () => {
    return (
        <div className={classes.todoView}>
            <MenuButton/>
            <div>
            <h3 class={classes.nameHeader}>Todo List</h3>
            <TodoList/>
            </div>
        </div>
    );
};

export default TodoView;