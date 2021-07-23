import React from 'react';

import QAconfig from './QAconfig';

class QButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currProductId: props.currProductId
    };

    this.addQuestion = this.addQuestion.bind(this);
  }

  moreAnsweredQs() {
    console.log('MORE ANSWERED QUESTIONS clicked');
  }

  addQuestion() {
    console.log('ADD QUESTION clicked');

    axios({
      method: 'POST',
      url: '/addQuestion',
      data: {
        auth: QAconfig.GITHUB,
        data: {
          body: 'This is my test question?',
          name: 'testUsername456',
          email: 'guineapig@mail.com',
          'product_id': this.state.currProductId
        }
      }
    })
      .then(response => {
        props.getQuestions();
      })
      .catch(err => {
        console.log('add q axios error', err);
      });
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