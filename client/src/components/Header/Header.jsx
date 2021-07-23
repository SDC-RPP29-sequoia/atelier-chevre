import React from 'react';
import './Header.scss';

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
          <input type="text" value={this.state.searchVal} onChange={(e) => this.handleChange('searchVal', e.target.value)}></input>
        </div>
      </header>
    );
  }
}

export default Header;