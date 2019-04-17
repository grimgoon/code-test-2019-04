import React from 'react';
import style from './GamePage.module.css';

const GamePage = (props) => {
    let {data} = props;
    const gameCover = data.cover ? 
        '//images.igdb.com/igdb/image/upload/t_cover_big/' + data.cover.image_id + '.jpg' :
        'https://static-cdn.jtvnw.net/ttv-static/404_boxart.jpg';


    return(
        <div className={style.content}>
            <div className={style.header}>
                <img src={gameCover} alt={data.name} />
                <div className={style.headerData}>
                    <h1>{data.name}</h1>
                    <p>{data.summary}</p>
                </div>
                
            </div>
        </div>
    )
}

export default GamePage;

