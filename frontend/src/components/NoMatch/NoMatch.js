import React from 'react';
import style from './NoMatch.module.css';
import {NavLink} from 'react-router-dom'

const NoMatch = (props) => {
    console.log(props)
    return (
        <div className={style.content}>
            <p>The page you were looking for could not be found!</p>
            <NavLink to="/" className={style.button}>Back to start page</NavLink>
        </div>);
}

export default NoMatch;