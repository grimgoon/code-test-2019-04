import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actionCreator from '../../../store/actions/actions';
import style from './Card.module.css';


class Card extends Component {
    excludeTopGames = [
        "just-chatting",
        "twitch-presents",
        "auto-chess",
        "music-and-performing-arts",
        "talk-shows-and-podcasts",
        "poker",
        "chess",
        "asmr",
        "twitch-sings"
    ];

    componentDidUpdate() {
        console.log(this.props.name);
        if(!this.excludeTopGames.some(game => this.props.name === game) && !this.props.game && this.props.fetchedCachedGames) {
            console.log("Blah!");
            this.props.fetchGame(this.props.name);
        }
    };

    card = () => {
        const game = this.props.game;
        if(game) {
            const gameCover = game.cover ? '//images.igdb.com/igdb/image/upload/t_cover_big/' + game.cover.image_id + '.jpg' : 'https://static-cdn.jtvnw.net/ttv-static/404_boxart.jpg';
            return <div className={style.card}>
                <div className={style.gameCover}>
                    <img src={gameCover} alt={game.name}/>
                </div>
                <h3>{this.props.game.name}</h3>
            </div> 
        }
        return null;
    };

    render() {
        console.log(this.props.fetchedCachedGames)
        let card = this.card();
        return (card);
    };
};

const mapStateToProps = (state, ownProps) => ({
    game : state.gameData[ownProps.name],
    fetchedCachedGames : state.fetchedCachedGames
});

const mapDispatchToProps = dispatch => ({
        fetchGame: (slug) => dispatch(actionCreator.fetchGameBySlug(slug)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Card);

