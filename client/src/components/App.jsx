import React from 'react';
import '../styles.css';

import Header from './Header.jsx';
import QA from '../QA/QA.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {},
      currProductId: 28213
    };
  }

  render() {
    return (
      <div className="wrapper">
        <Header currentProduct={this.state.currentProduct} />
        <QA currProductId={this.state.currProductId}/>
      </div>
    );
  }
}

export default App;