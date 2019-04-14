import React, {Component} from 'react';
import style from './SearchBar.module.css';

class SearchBar extends Component {

    submit = (e) => {
        e.preventDefault();
        
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                <input type="text" placeholder="Search..." className={style.SearchBar}/>
            </form>
        );
    };
   
};

export default SearchBar;