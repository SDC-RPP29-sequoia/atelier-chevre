import React from 'react';
import './Header.scss';
import { AiOutlineSearch } from 'react-icons/ai';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: ''
    };
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  search() {
    // Implement
  }

  render() {
    return (
      <header id="header">
        <div id="logo">LOGO</div>
        <div id="search-box">
          <label id="search-box-label">
            <input id="search-box-input" type="text" value={this.state.searchVal} onChange={(e) => this.handleChange('searchVal', e.target.value)}></input>
            Search
          </label>
        </div>
      </header>
    );
  }
}

export default Header;