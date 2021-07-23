import React from 'react';

import QAHeader from './QAHeader';
import SearchBar from './SearchBar';
import QAList from './QAList';
import QButtons from './QButtons';

import './QA.scss';

class QA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currProductId: props.currProductId
    };
  }

  render() {
    return (
      <div className="qa" id="qa-wrapper">
        <QAHeader currProductId={this.state.currProductId}/>
        <SearchBar />
        <QAList currProductId={this.state.currProductId}/>
        <QButtons />
      </div>
    );
  }
}

export default QA;