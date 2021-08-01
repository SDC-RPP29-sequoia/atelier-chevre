import React from 'react';
import '../../styles.scss';
import './App.scss';

import Header from '../Header/Header.jsx';
import QuestionsAndAnswers from '../QA/QuestionsAndAnswers.jsx';
import RatingsAndReviews from '../Reviews/RatingsAndReviews.jsx';
import Stars from '../Stars/Stars.jsx';
import ProductOverview from '../ProductOverview/ProductOverview.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {},
      bag: []
    };

    this.addToBag = this.addToBag.bind(this);
  }

  addToBag(item) {
    this.setState({
      bag: [...this.state.bag, item]
    });
  }

  render() {
    return (
      <div className="wrapper">
        <Header currentProduct={this.state.currentProduct} />
        <ProductOverview productId="28213" addToBag={this.addToBag} />
        <QuestionsAndAnswers productId="28213" />
        <RatingsAndReviews productId="28213"/>
      </div>
    );
  }
}

export default App;