import React, {Component} from 'react';
import style from './GamePage.module.css';
import * as request from '../../../utils/backend';

class GamePage extends Component {
    state = {
        streams : null
    };

    componentDidMount() {
        this.getStreams();
    };

    getStreams = async () => {
        let res = await request.getTwitchStreamsByName(this.props.data.name);
        this.setState({streams : res.data});
    };

    streams = () => {
        const streams = this.state.streams;
  
        if(streams && typeof(streams.error) === 'undefined') {
            return streams.map(stream => {
                let imageUrl = stream.thumbnail_url.replace('{width}','360').replace('{height}','203');
                return <a href={'https://twitch.tv/' + stream.user_name} target="_BLANK" rel='noreferrer noopener' className={style.streamCard}>
                    <img 
                        alt={'Twitch Stream - ' + stream.user_name}
                        src={imageUrl}
                    />
                    <span className={style.liveIcon}>LIVE</span>
                    <h2>{stream.user_name} <img src="https://image.flaticon.com/icons/svg/25/25284.svg" alt="External Link"/></h2>
                    <p>{stream.viewer_count} Viewers</p>
                </a>
            });
        } else if(streams && typeof(streams.error) !== 'undefined') {
            return "No streams could be found"
        } else {
            return <div className={style.loaderRing}></div>    
        }
    };

    render() {
        let {data} = this.props;
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
                <div className={style.streams}>
                    {this.streams()}
                </div>
            </div>
        );
    };
};

export default GamePage;