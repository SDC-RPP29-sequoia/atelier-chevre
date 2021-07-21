import React from 'react';
import '../styles.css';
import Stars from './Stars';

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
        <div>
          <Stars avg="2.75"/>
        </div>
        <div>
          <Stars avg="2.25"/>
        </div>
        <div>
          <Stars avg="4.5"/>
        </div>
        <div>
          <Stars avg="3.25"/>
        </div>
      </div>
    );
  }
}

export default App;