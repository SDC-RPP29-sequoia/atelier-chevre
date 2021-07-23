import React from 'react';
import axios from 'axios';

import QAconfig from './QAconfig';

class QAList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currProductId: props.currProductId,
      questions: [],
      answers: []
    };

    this.questionHelpful = this.questionHelpful.bind(this);
    this.answerHelpful = this.answerHelpful.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions() {
    axios({
      method: 'POST',
      url: '/getQuestions',
      data: {
        auth: QAconfig.GITHUB,
        productId: this.state.currProductId
      }
    })
      .then(response => {
        console.log('axios get response', response);

        let questions = response.data.results;

        questions.sort((a, b) => {
          return b.question_helpfulness - a.question_helpfulness;
        });

        this.setState({
          questions
        });
      })
      .catch(err => {
        console.log('axios get error', err);
      });
  }

  answerHelpful(e) {
    console.log('Answer Helpful clicked');

    let answerId = e.target.getAttribute('answer_id');

    axios({
      method: 'POST',
      url: '/answerHelpful',
      data: {
        auth: QAconfig.GITHUB,
        answerId
      }
    })
      .then(response => {
        console.log('a helpful axios put', response);
        this.getQuestions();
      })
      .catch(err => {
        console.log('a helpful axios error', err);
      });
  }

  answerReport() {
    console.log('Answer Report clicked');
  }

  questionHelpful(e) {
    console.log('Question Helpful clicked');
    let questionId = e.target.getAttribute('question_id');

    axios({
      method: 'POST',
      url: '/questionHelpful',
      data: {
        auth: QAconfig.GITHUB,
        questionId
      }
    })
      .then(response => {
        console.log('q helpful axios put', response);
        this.getQuestions();
      })
      .catch(err => {
        console.log('q helpful axios error', err);
      });
  }

  addAnswer() {
    console.log('Add Answer clicked');
  }

  loadMoreAnswers() {
    console.log('LOAD MORE ANSWERS clicked');
  }

  render() {
    return (
      <div id="qa-list">{this.state.questions.map(q => {

        if (q.answers) {
          let answers = [];
          let sellerAnswers = [];

          for (var key in q.answers) {
            if (q.answers[key].answerer_name === 'Seller') {
              sellerAnswers.push(q.answers[key]);
            } else {
              answers.push(q.answers[key]);
            }
          }

          answers.sort((a, b) => {
            return b.helpfulness - a.helpfulness;
          });

          sellerAnswers.sort((a, b) => {
            return b.helpfulness - a.helpfulness;
          });

          answers = sellerAnswers.concat(answers);

          return (
            <div key={q.question_id} id={q.question_id} className="qa" id="list">
              <div className="question">Q: {q.question_body}</div>

              <div>{answers.map(a => {
                let ISOdate = new Date(a.date);
                let month = ISOdate.toLocaleString('default', { month: 'long'});
                let day = ISOdate.getDate();
                let year = ISOdate.getFullYear();

                let date = `${month} ${day}, ${year}`;

                return (
                  <div className="answer-container" key={a.id}>

                    <div className="answer" key={a.body}>A: {a.body}</div>
                    <div className="answer-photos">{a.photos.map(photo => {
                      return (
                        <img src={photo} width="50px" height="50px" key={photo}></img>
                      );
                    })}</div>

                    <div className="signature-helpful-report">
                      <div className="author-date">by {a.answerer_name}, {date} | Helpful (A)?</div>
                      <div className="answer-helpful" onClick={this.answerHelpful} answer_id={a.id}>Yes ({a.helpfulness}) |</div>
                      <div className="report-answer" onClick={this.answerReport}>Report (A)</div>
                    </div>

                  </div>
                );
              })}</div>

              <div className="qhelpful-addanswer">
                <div>Helpful (Q)?</div>
                <div className="question-helpful" onClick={this.questionHelpful} question_id={q.question_id}>Yes ({q.question_helpfulness}) |</div>
                <div className="add-answer" onClick={this.addAnswer}>Add Answer</div>
              </div>

            </div>
          );
        }
      })}

      <div id="load-more-answers" onClick={this.loadMoreAnswers}>LOAD MORE ANSWERS</div>

      </div>
    );
  }
}

export default QAList;