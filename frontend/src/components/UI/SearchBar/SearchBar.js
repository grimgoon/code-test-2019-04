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
        if(searchValue) {
            const search = '?value=' + searchValue;
            this.props.history.push({
                pathname : '/search/',
                search,
            });
        }
    };

    searchValueHandler = (e) => {
        this.setState({searchValue : e.target.value});
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                <input type="text" placeholder="Search..." value={this.state.searchValue} onChange={this.searchValueHandler} className={style.SearchBar}/>
            </form>
        );
    };
};

export default withRouter(SearchBar);