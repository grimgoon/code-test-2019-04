import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

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
        "twitch-sings",
        "slots"
    ];

    componentDidMount() {
        this.shouldFetchGame();
    }

    componentDidUpdate() {
        this.shouldFetchGame();    
    };

    shouldFetchGame = () => {
        if(!this.excludeTopGames.some(game => this.props.name === game) && typeof(this.props.game) === 'undefined' && this.props.fetchedCachedGames) {
            this.props.fetchGame(this.props.name);
        }
    }

    card = () => {
        const game = this.props.game;
        if(game) {
            const gameCover = game.cover ? '//images.igdb.com/igdb/image/upload/t_cover_big/' + game.cover.image_id + '.jpg' : 'https://static-cdn.jtvnw.net/ttv-static/404_boxart.jpg';
            return <NavLink to={'/game/' + game.slug} className={style.card}>
                <div className={style.gameCover}>
                    <img src={gameCover} alt={game.name}/>
                </div>
                <h3>{this.props.game.name}</h3>
            </NavLink> 
        }
        return null;
    };

    render() {
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

