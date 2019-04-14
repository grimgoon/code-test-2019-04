import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreator from '../../../store/actions/actions';
import style from './Card.module.css';

class Card extends Component {

    componentDidMount() {
        this.props.fetchGame(this.props.name);
    }

    // shouldComponentUpdate(nextProps) {
    //     console.log(this.props.game);
    //     console.log(this.nextProps.game);
    //     if(this.props.game !== nextProps.game) {
    //         return true;
    //     }
    //     return false;
    // }

    render() {
        

        return (
            <div className={style.card}>
                <img src={this.props.imageUrl} alt={this.props.name}/>
                <h3>{this.props.name}</h3>
            </div>
        );
    }

    mapStateToProps = () => ({

    });
};

const mapStateToProps = (state, ownProps) => {
    return {
    game : state.gameData[ownProps.name],
}};

const mapDispatchToProps = dispatch => ({
        fetchGame: (name) => dispatch(actionCreator.fetchGameByName(name)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Card);

