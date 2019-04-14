import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actionCreator from '../../store/actions/actions'
import Card from '../../utils/UI/Card';

class Home extends Component {
    componentDidMount() {
        this.props.fetchTwitchTop();
    }

    render() {
        console.log(this.props.twitchTop);
        return ( 
            <div>
                Home!
            </div>
        );
    }
};

const mapStateToProps = state => ({
    twitchTop : state.twitchTop
});

const mapDispatchToProps = dispatch => ({
        fetchTwitchTop: () => dispatch(actionCreator.fetchTwitchTop()),
});

export default connect(mapStateToProps,mapDispatchToProps)(Home);