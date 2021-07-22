import React from 'react';
import Stars from './Stars';
import '../styles.css';

import Header from './Header.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {}
    };
  }

  render() {
    return (
      <div className="wrapper">
        <Header currentProduct={this.state.currentProduct} />
      </div>
    );
  }
}

export default App;