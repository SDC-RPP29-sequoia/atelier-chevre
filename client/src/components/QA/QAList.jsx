import React from 'react';
import axios from 'axios';

import QAconfig from './QAconfig';

class QAList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currProductId: props.currProductId,
      questions: [],
      answers: [],
      currProduct: {}
    };

    this.questionHelpful = this.questionHelpful.bind(this);
    this.answerHelpful = this.answerHelpful.bind(this);
    this.answerReport = this.answerReport.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
    this.getProduct();
  }

  getProduct() {
    axios({
      method: 'GET',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${this.state.currProductId}`,
      headers: {
        Authorization: QAconfig.GITHUB,
      }
    })
      .then(response => {
        let currProduct = response.data;

        this.setState({
          currProduct
        });
      })
      .catch(err => {
        console.log('axios get error', err);
      });

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
        this.getQuestions();
      })
      .catch(err => {
        console.log('a helpful axios error', err);
      });
  }

  answerReport(e) {
    let answerId = e.target.getAttribute('answer_id');

    e.target.innerHTML = 'Reported';

    axios({
      method: 'POST',
      url: '/reportAnswer',
      data: {
        auth: QAconfig.GITHUB,
        answerId
      }
    })
      .then(response => {

      })
      .catch(err => {
        console.log('report a axios error', err);
      });
  }

  questionHelpful(e) {
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
        this.getQuestions();
      })
      .catch(err => {
        console.log('q helpful axios error', err);
      });
  }

  addAnswer(e) {
    let questionId = e.target.getAttribute('question_id');
    let questionBody = e.target.getAttribute('question_body');
    let productName = this.state.currProduct.name;

    console.log('add answer clicked for question id', questionId, 'question body', questionBody, 'product name', productName);

    let modal = document.querySelector('.modal');

    modal.style.display = 'block';

    let closeBtn = document.querySelector('.close-btn');

    closeBtn.onclick = () => {
      modal.style.display = 'none';
    };

    window.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    };

    // axios({
    //   method: 'POST',
    //   url: '/addAnswer',
    //   data: {
    //     auth: QAconfig.GITHUB,
    //     questionId,
    //     data: {
    //       body: 'This is my test answer',
    //       name: 'testUsername123',
    //       email: 'tester@test.com',
    //       photos: ['https://raw.githubusercontent.com/PKief/vscode-markdown-checkbox/master/logo.png', 'https://raw.githubusercontent.com/PKief/vscode-markdown-checkbox/master/logo.png', 'https://raw.githubusercontent.com/PKief/vscode-markdown-checkbox/master/logo.png']
    //     }
    //   }
    // })
    //   .then(response => {
    //     this.getQuestions();
    //   })
    //   .catch(err => {
    //     console.log('q helpful axios error', err);
    //   });
  }

  addQuestion() {
    axios({
      method: 'POST',
      url: '/addQuestion',
      data: {
        auth: QAconfig.GITHUB,
        data: {
          body: 'This is my test question?',
          name: 'testUsername456',
          email: 'guineapig@mail.cmm',
          'product_id': this.state.currProductId
        }
      }
    })
      .then(response => {
        this.getQuestions();
      })
      .catch(err => {
        console.log('add q axios error', err);
      });
  }

  loadMoreAnswers() {
    console.log('LOAD MORE ANSWERS clicked');
  }

  moreAnsweredQs() {
    console.log('MORE ANSWERED QUESTIONS clicked');
  }

  render() {
    return (
      <div id="qa-list">{this.state.questions.map((q, i) => {

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
            <div key={q.question_date + i} className="qa" id="list">
              <div className="question">Q: {q.question_body}</div>

              <div>{answers.map(a => {
                let ISOdate = new Date(a.date);
                let month = ISOdate.toLocaleString('default', { month: 'long'});
                let day = ISOdate.getDate();
                let year = ISOdate.getFullYear();

                let date = `${month} ${day}, ${year}`;

                let aName = a.answerer_name;

                if (aName === 'Seller') {
                  aName = '<b>Seller</b>';
                }

                return (
                  <div className="answer-container" key={a.id}>

                    <div className="answer" key={a.body}>A: {a.body}</div>
                    <div className="answer-photos">{a.photos.map((photo, i) => {
                      return (
                        <img src={photo} width="50px" height="50px" key={i}></img>
                      );
                    })}</div>

                    <div className="signature-helpful-report">
                      <div>by&nbsp;</div>
                      <div className="author-date" dangerouslySetInnerHTML={{__html: aName}}></div>
                      <div>, {date} | Helpful?&nbsp;</div>
                      <div className="answer-helpful" onClick={this.answerHelpful} answer_id={a.id}>Yes ({a.helpfulness}) |&nbsp;</div>
                      <div className="report-answer" onClick={this.answerReport} answer_id={a.id}>Report</div>
                    </div>

                  </div>
                );
              })}</div>

              <div className="qhelpful-addanswer">
                <div>Helpful?&nbsp;</div>
                <div className="question-helpful" onClick={this.questionHelpful} question_id={q.question_id}>Yes ({q.question_helpfulness}) |&nbsp;</div>
                <div className="add-answer" onClick={this.addAnswer} question_id={q.question_id} question_body={q.question_body}>Add Answer</div>
              </div>

            </div>
          );
        }
      })}

      <div id="load-more-answers" onClick={this.loadMoreAnswers}>LOAD MORE ANSWERS</div>

      <div className="qa" id="buttons">
        <button id="more-answered-qs" onClick={this.moreAnsweredQs}>MORE ANSWERED QUESTIONS</button>
        <button id="addq" onClick={this.addQuestion}>ADD A QUESTION +</button>
      </div>

      <div className="modal">
        <div className="modal-content">
          <span className="close-btn">&times;</span>
          <p>Submit Answer</p>
          <div className="subtitle">Product Name: Question Body</div>
          <form id="add-answer">
            <ul>
              <li>
                <label>Your answer:</label>
                <input type="text" id="modal-answer" placeholder="Your Answer"/>
              </li>
              <li>
                <label>What is your nickname:</label>
                <input type="text" id="modal-answer-nickname" placeholder="What is your nickname Example: jack543!"/>
              </li>
              <li>
                <label>Your email:</label>
                <input type="text" id="modal-answer-email" placeholder="Your email Example: jack@email.com"/>
              </li>
              <li>
                <label>Upload photos here:</label>
                <input type="text" id="modal" placeholder="Upload Photos here"/>
              </li>
              <input type="submit" value="Submit answer"/>
            </ul>
          </form>
        </div>
      </div>

      </div>
    );
  }
}

export default QAList;