import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';

import * as actionCreator from '../../store/actions/actions';
import style from './Game.module.css';
import NoMatch from '../NoMatch/NoMatch';

class Game extends Component {

    getRoute = () => {
        let path = this.props.location.pathname.replace('/game/','');
        // if(this.props.fetchedCachedGames && )
    }

    render () {
        this.getRoute();
        return (
            <div></div>
        );
    };
};

const mapStateToProps = state => ({
    games : state.gameData,
    fetchedCachedGames : state.fetchedCachedGames
});

export default connect(mapStateToProps, null)(Game);