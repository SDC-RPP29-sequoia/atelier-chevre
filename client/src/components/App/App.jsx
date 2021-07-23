import React from 'react';
import '../../styles.scss';
import './App.scss';

import Header from '../Header/Header.jsx';
import QuestionsAndAnswers from '../QA/QA.jsx';
import RatingsAndReviews from '../Reviews/RatingsAndReviews.jsx';
import Stars from '../Reviews/Stars.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {},
      currProductId: 28214
    };
  }

  render() {
    return (
      <div className="wrapper">
        <Header currentProduct={this.state.currentProduct} />
        <RatingsAndReviews />
        <QuestionsAndAnswers currProductId={this.state.currProductId}/>
      </div>
    );
  }
}

export default App;
