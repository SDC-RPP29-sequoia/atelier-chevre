import React from 'react';

class SearchBar extends React.Component {
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

    console.log(this.state[key]);
  }

  search() {

  }

  render() {
    return (
      <div className="qa" id="search">
        <input type="text" value={this.state.searchVal} placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." onChange={(e) => this.handleChange('searchVal', e.target.value)}></input>
        <img src="https://image.flaticon.com/icons/png/512/61/61088.png"></img>
      </div>
    );
  }
}

export default SearchBar;