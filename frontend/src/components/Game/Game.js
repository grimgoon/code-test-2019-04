import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import * as actionCreator from '../../store/actions/actions';
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
        let {fetchedCachedGames,match,games} = this.props;
        if(fetchedCachedGames && games[this.path]) {
            return Object.values(games)
                .map(game => {
                    let render = game.error ? <NoMatch/> : <GamePage data={game}/>
                    return <Route
                        key={game.slug} 
                        exact 
                        path={match.path + '/' + game.slug} 
                        render={() => render}
                    />
                }
            );
        }
    };

    render() {
        let gameRoutes = this.gameRoutes();
        return(
            <Switch>
                <Route exact path="/game" component={NoMatch}/>
                {gameRoutes}
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