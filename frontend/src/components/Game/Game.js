import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import * as actionCreator from '../../store/actions/actions';
import style from './Game.module.css';
import NoMatch from '../NoMatch/NoMatch';
import GamePage from './GamePage/GamePage';

class Game extends Component {
    path = null;

    componentDidMount() {
        let {location, match} = this.props;
        let updatedPath = location.pathname.replace(match.path + '/','');
        if(!match.isExact || !updatedPath.indexOf('/')) {
            this.path = updatedPath;
        }
    }

    componentDidUpdate() {
        if(!this.props.games[this.path] && this.props.fetchedCachedGames) {
            this.props.fetchGame(this.path);
        }
    }

    gameRoutes = () => {
        let {fetchedCachedGames,match} = this.props;
        if(fetchedCachedGames) {
            return Object.values(this.props.games)
                .map(game => game.error ? null : 
                    <Route 
                        exact 
                        path={match.path + '/' + game.slug} 
                        render={() => <GamePage data={game}/>}
                    />
                );
        }
        return null;
    };

    render() {
        console.log(this.props);
        let gameRoutes = this.gameRoutes();
        console.log(gameRoutes);
        return(
            <Switch>
                <Route exact path="/game" component={NoMatch}/>
                {gameRoutes}
                <Route component={NoMatch}/>
            </Switch>
        )
    };
};

const mapStateToProps = state => ({
    games : state.gameData,
    fetchedCachedGames : state.fetchedCachedGames
});

const mapDispatchToProps = dispatch => ({
        fetchGame: (slug) => dispatch(actionCreator.fetchGameBySlug(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);