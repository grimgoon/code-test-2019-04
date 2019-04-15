import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreator from '../../../store/actions/actions';
import style from './Card.module.css';

class Card extends Component {

    excludeTopGames = [
        "Just Chatting",
        "Twitch Presents",
        "Auto Chess",
        "Music & Performing Arts"
    ]

    componentDidMount() {
        console.log(this.props.name)
        if(!this.excludeTopGames.some(game => this.props.name === game)) {
            this.props.fetchGame(this.props.name);
        }
    }

    card = () => {
        const game = this.props.game;
        if(game) {
            const gameCover = game.cover ? '//images.igdb.com/igdb/image/upload/t_cover_big/' + game.cover.image_id + '.jpg' : 'https://static-cdn.jtvnw.net/ttv-static/404_boxart.jpg';
            return <div className={style.card}>
                <img src={gameCover} alt={game.name}/>
                <h3>{this.props.name}</h3>
            </div> 
        }
        return null;
    }

    render() {
        return (this.card());
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
    game : state.gameData[ownProps.name],
}};

const mapDispatchToProps = dispatch => ({
        fetchGame: (name) => dispatch(actionCreator.fetchGameByName(name)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Card);

