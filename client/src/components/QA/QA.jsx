import React from 'react';

import QAHeader from './QAHeader';
import SearchBar from './SearchBar';
import QAList from './QAList';

import './QA.scss';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currProductId: props.productId
    };
  }

  render() {
    return (
      <div className="qa" id="qa-wrapper">
        <QAHeader currProductId={this.state.currProductId} />
        {/* <SearchBar /> */}
        <QAList currProductId={this.state.currProductId} />
      </div>
    );
  }
}

export default QuestionsAndAnswers;