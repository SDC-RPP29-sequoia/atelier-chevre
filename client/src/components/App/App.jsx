import React from 'react';
import '../../styles.scss';
import './App.scss';

import Header from '../Header/Header.jsx';
import QuestionsAndAnswers from '../QA/QuestionsAndAnswers.jsx';
import RatingsAndReviews from '../Reviews/RatingsAndReviews.jsx';
import Stars from '../Stars/Stars.jsx';
import { tracked } from '../ProductOverview/ProductOverview.jsx';
const ProductOverview = tracked;

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
        <ProductOverview productId="28216" addToBag={this.addToBag} />
        <QuestionsAndAnswers productId="28212" />
        <RatingsAndReviews productId="28223"/>
      </div>
    );
  }
}

export default App;