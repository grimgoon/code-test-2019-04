import React, {Component} from 'react';
import style from './SearchBar.module.css';
import {withRouter} from 'react-router-dom';

class SearchBar extends Component {

    state = {
        searchValue : null
    }

    submit = (e) => {
        e.preventDefault();
        let searchValue = this.state.searchValue;
        let path = '/search/?value=' + searchValue;
        this.props.history.push({pathname : path});
    };

    searchValueHandler = (e) => {
        this.setState({searchValue : e.target.value});
    }

    render() {
        console.log(this.props);
        return (
            <form onSubmit={this.submit}>
                <input type="text" placeholder="Search..." value={this.state.searchValue} onChange={this.searchValueHandler} className={style.SearchBar}/>
            </form>
        );
    };
};

export default withRouter(SearchBar);