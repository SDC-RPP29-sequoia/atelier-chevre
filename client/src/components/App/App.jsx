import React from 'react';
import '../../styles.scss';
import './App.scss';

import Header from '../Header/Header.jsx';
import QuestionsAndAnswers from '../QA/QA.jsx';
import RatingsAndReviews from '../Reviews/RatingsAndReviews.jsx';
import Stars from '../Stars/Stars.jsx';
import ProductOverview from '../ProductOverview/ProductOverview.jsx';

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
        <ProductOverview productId="28215" />
        <QuestionsAndAnswers productId="28213" />
        <RatingsAndReviews productId="28213"/>
      </div>
    );
  }
}

export default App;
