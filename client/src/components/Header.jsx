import React from 'react';

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
      <header>
        <div id="logo">LOGO</div>
        <div id="search-box">
          <input type="text" value={this.state.searchVal} onChange={(e) => handleChange('searchVal', e.target.value)}></input>
        </div>
      </header>
    );
  }
}

export default Header;