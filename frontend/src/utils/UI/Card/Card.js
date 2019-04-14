import React from 'react';
import style from './Card.module.css';

const Card = (props) => {
    return (
        <div className={style.card}>
            <img src={props.imageUrl} alt={props.name}/>
            <h3>{props.name}</h3>
        </div>
    );
};

export default Card;