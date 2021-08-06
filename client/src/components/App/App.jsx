import React from 'react';
import '../../styles.scss';
import './App.scss';

import Header from '../Header/Header.jsx';
import QuestionsAndAnswers from '../QA/QuestionsAndAnswers.jsx';
import RatingsAndReviews from '../Reviews/RatingsAndReviews.jsx';
import Stars from '../Stars/Stars.jsx';
import ProductOverview from '../ProductOverview/ProductOverview.jsx';

export class App extends React.Component {
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
        <Header />
        <ProductOverview productId={this.props.productId} addToBag={this.addToBag} />
        <QuestionsAndAnswers productId={this.props.productId}/>
        <RatingsAndReviews
          productId={this.props.productId}
          reviews={this.props.reviews}
          reviewsMeta={this.props.reviewsMeta}
        />
      </div>
    );
  }
}
