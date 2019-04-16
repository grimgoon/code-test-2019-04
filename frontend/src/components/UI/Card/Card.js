import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreator from '../../../store/actions/actions';
import style from './Card.module.css';


class Card extends Component {
    excludeTopGames = [
        "Just Chatting",
        "Twitch Presents",
        "Auto Chess",
        "Music & Performing Arts",
        "Talk Shows & Podcasts",
        "Poker",
        "Chess",
        "ASMR",
        "Twitch Sings"
    ];

    componentDidMount() {
        if(!this.excludeTopGames.some(game => this.props.name === game) && !this.props.game && this.props.fetchedAllGames) {
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
                <h3>{this.props.name}</h3>
            </div> 
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
    fetchedAllGames : state.fetchedAllGames
});

const mapDispatchToProps = dispatch => ({
        fetchGame: (name) => dispatch(actionCreator.fetchGameByName(name)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Card);

