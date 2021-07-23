import React from 'react';

class QButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  moreAnsweredQs() {
    console.log('MORE ANSWERED QUESTIONS clicked');
  }

  addQ() {
    console.log('ADD Q clicked');
  }

  render() {
    return (
      <div className="qa" id="buttons">
        <button id="more-answered-qs" onClick={this.moreAnsweredQs}>MORE ANSWERED QUESTIONS</button>
        <button id="addq" onClick={this.addQ}>ADD A QUESTION +</button>
      </div>
    );
  }
}

export default QButtons;