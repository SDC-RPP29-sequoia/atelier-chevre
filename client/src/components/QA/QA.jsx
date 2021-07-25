import React from 'react';
import axios from 'axios';

import QAHeader from './QAHeader';
import SearchBar from './SearchBar';
import AnswerContainer from './AnswerContainer';
import SignatureHelpfulReport from './SignatureHelpfulReport';
import QHelpfulAddAnswer from './QHelpfulAddAnswer';
import AnswerModal from './AnswerModal';
import QuestionModal from './QuestionModal';

import './QA.scss';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currProduct: {name: 'TEST PRODUCT NAME'},
      currProductId: props.productId,
      questions: [],
      filteredQs: [],
      photos: [],
      productName: '',
      questionBody: '',
      questionId: '',
      searchVal: '',
      count: 2,
      originalLength: null
    };

    this.questionHelpful = this.questionHelpful.bind(this);
    this.questionReport = this.questionReport.bind(this);
    this.answerHelpful = this.answerHelpful.bind(this);
    this.answerReport = this.answerReport.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
    this.uploadPhotos = this.uploadPhotos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.convertDate = this.convertDate.bind(this);
    this.sortAnswers = this.sortAnswers.bind(this);
    this.moreAnsweredQs = this.moreAnsweredQs.bind(this);
  }

  componentDidMount() {
    this.getQuestions((result) => {
      this.setState({
        originalLength: result.length
      });

      let moreAnsweredQs = document.getElementById('more-answered-qs');

      if (result.length <= 2) {
        moreAnsweredQs.style.display = 'none';
      }
    });
  }

  getQuestions(cb) {
    axios({
      method: 'GET',
      url: `/questions/?product_id=${this.state.currProductId}&page=1&count=${this.state.count}`
    })
      .then(response => {
        let questions = response.data.results;

        if (cb) {
          cb(questions);
        }

        questions.sort((a, b) => {
          return b.question_helpfulness - a.question_helpfulness;
        });

        questions = questions.slice(0, this.state.count);

        this.setState({
          questions,
          filteredQs: questions
        });
      })
      .catch(err => {
        console.log('axios get error', err);
      });
  }

  answerHelpful(e) {
    let clicked = e.target.getAttribute('clicked');

    if (clicked === 'true') {
      alert('You cannot vote more than once!');
      return;
    }

    e.target.setAttribute('clicked', 'true');
    let answerId = e.target.getAttribute('answer_id');

    axios({
      method: 'POST',
      url: '/answerHelpful',
      data: {
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
    let clicked = e.target.getAttribute('clicked');

    if (clicked === 'true') {
      alert('You cannot vote more than once!');
      return;
    }

    e.target.setAttribute('clicked', 'true');
    let questionId = e.target.getAttribute('question_id');

    axios({
      method: 'POST',
      url: '/questionHelpful',
      data: {
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

  questionReport(e) {
    let questionId = e.target.getAttribute('question_id');
    e.target.innerHTML = 'Reported';

    axios({
      method: 'POST',
      url: '/reportQuestion',
      data: {
        questionId
      }
    })
      .then(response => {

      })
      .catch(err => {
        console.log('report q axios error', err);
      });
  }

  addAnswer(e) {
    let questionId = e.target.getAttribute('question_id');
    let questionBody = e.target.getAttribute('question_body');
    let productName = this.state.currProduct.name;

    this.setState({
      productName,
      questionBody,
      questionId
    });

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
  }

  uploadPhotos(e) {
    let data = new FormData();
    data.append('file', e.target.files[0]);

    let config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    axios.post('/QAPhotos', data, config)
      .then(res => {
        this.setState({
          photos: [res.data, ...this.state.photos]
        });

        if (this.state.photos.length > 4) {
          document.getElementById('modal-photos').style.display = 'none';
          document.getElementById('modal-photos-label').innerHTML = 'Max 5 photos allowed';
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  submitAnswer(e) {
    e.preventDefault();

    let answer = document.getElementById('modal-answer').value;
    let name = document.getElementById('modal-answer-nickname').value;
    let email = document.getElementById('modal-answer-email').value;
    let photos = document.getElementById('modal-photos').value;

    let tracker = {
      answer,
      name,
      email
    };

    if (!answer || !name || !email || !email.includes('@')) {
      let string = 'You must enter the following: ';

      for (let key in tracker) {
        if (!tracker[key]) {
          string += `${key}, `;
        }
      }

      string = string.slice(0, -2);

      let string2;

      if (!email.includes('@') && email) {
        string2 = '. Your email must also be formatted correctly';
      }

      if (string.length === 28) {
        alert('Your email must be formatted correctly');
      } else if (string2) {
        alert(string + string2);
      } else {
        alert(string);
      }

      return;
    }

    let modal = document.querySelector('.modal');
    modal.style.display = 'none';

    let formElement = document.querySelector('#add-answer');
    let formData = new FormData(formElement);

    let data = {};

    for (let [key, value] of formData) {
      data[key] = value;
    }

    let pics = [];

    for (let i = 0; i < this.state.photos.length; i++) {
      let photo = this.state.photos[i];
      pics.push(`http://localhost:3000/photos/${photo.filename}`);
    }

    data.photos = pics;

    axios({
      method: 'POST',
      url: '/addAnswer',
      data: {
        questionId: this.state.questionId,
        data
      }
    })
      .then(response => {
        document.getElementById('modal-answer').value = '';
        document.getElementById('modal-answer-nickname').value = '';
        document.getElementById('modal-answer-email').value = '';
        this.getQuestions();
      })
      .catch(err => {
        console.log('submit answer axios error', err);
      });
  }

  addQuestion(e) {
    let productName = this.state.currProduct.name;

    this.setState({
      productName
    });

    let modal = document.querySelector('.modal-q');
    modal.style.display = 'block';

    let closeBtn = document.querySelector('.modal-q .close-btn');

    closeBtn.onclick = () => {
      modal.style.display = 'none';
    };

    window.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  submitQuestion(e) {
    e.preventDefault();

    let question = document.getElementById('modal-question').value;
    let name = document.getElementById('modal-question-nickname').value;
    let email = document.getElementById('modal-question-email').value;

    let tracker = {
      question,
      name,
      email
    };

    if (!question || !name || !email || !email.includes('@')) {
      let string = 'You must enter the following: ';

      for (let key in tracker) {
        if (!tracker[key]) {
          string += `${key}, `;
        }
      }

      string = string.slice(0, -2);

      let string2;

      if (!email.includes('@') && email) {
        string2 = '. Your email must also be formatted correctly';
      }

      if (string.length === 28) {
        alert('Your email must be formatted correctly');
      } else if (string2) {
        alert(string + string2);
      } else {
        alert(string);
      }

      return;
    }

    let modal = document.querySelector('.modal-q');
    modal.style.display = 'none';

    let formElement = document.querySelector('#add-question');
    let formData = new FormData(formElement);

    let data = {};

    for (let [key, value] of formData) {
      data[key] = value;
    }

    data['product_id'] = Number(this.state.currProductId);

    axios({
      method: 'POST',
      url: '/questions',
      data: {
        data
      }
    })
      .then(response => {
        document.getElementById('modal-question').value = '';
        document.getElementById('modal-question-nickname').value = '';
        document.getElementById('modal-question-email').value = '';
        this.getQuestions();
      })
      .catch(err => {
        console.log('add q axios error', err);
      });
  }

  handleChange(e) {
    this.setState({
      searchVal: e.target.value
    });

    let text = this.state.searchVal;
    let questions = this.state.questions;

    let filteredQs = questions.filter(q => {
      let question = q.question_body.toLowerCase();
      let answer = JSON.stringify(q.answers).toLowerCase();

      return question.includes(text) || answer.includes(text);
    });

    if (!text || text === '' || text.length < 2) {
      this.setState({
        filteredQs: questions
      });
    }

    if (text.length > 2) {
      this.setState({
        filteredQs
      });
    }
  }

  convertDate(date) {
    let ISOdate = new Date(date);
    let month = ISOdate.toLocaleString('default', { month: 'long'});
    let day = ISOdate.getDate();
    let year = ISOdate.getFullYear();
    let newDate = `${month} ${day}, ${year}`;

    return newDate;
  }

  sortAnswers(ans) {
    let answers = [];
    let sellerAnswers = [];

    for (var key in ans) {
      if (ans[key].answerer_name === 'Seller') {
        sellerAnswers.push(ans[key]);
      } else {
        answers.push(ans[key]);
      }
    }

    answers.sort((a, b) => {
      return b.helpfulness - a.helpfulness;
    });

    sellerAnswers.sort((a, b) => {
      return b.helpfulness - a.helpfulness;
    });

    answers = sellerAnswers.concat(answers);

    return answers;
  }

  moreAnsweredQs(e) {
    this.setState({
      count: this.state.count + 2
    });

    if (this.state.count >= this.state.originalLength) {
      e.target.style.display = 'none';
    }

    this.getQuestions();
  }

  loadMoreAnswers() {
    console.log('LOAD MORE ANSWERS clicked');
  }

  render() {
    return (
      <div className="qa" id="qa-wrapper">
        <QAHeader />
        <SearchBar searchVal={this.state.searchVal} handleChange={this.handleChange}/>
        <div id="qa-list">{this.state.filteredQs.map((q, i) => {
          if (q.answers) {
            let answers = this.sortAnswers(q.answers);

            return (
              <div key={q.question_date + i} className="qa" id="list">
                <div className="question"><b>Q: {q.question_body}</b></div>
                <div>{answers.map(a => {
                  let date = this.convertDate(a.date);
                  let aName = a.answerer_name;

                  if (aName === 'Seller') {
                    aName = '<b>Seller</b>';
                  }

                  return (
                    <AnswerContainer key={a.id} body={a.body} photos={a.photos} aName={aName} date={date} answerHelpful={this.answerHelpful} answer_id={a.id} helpfulness={a.helpfulness} answerReport={this.answerReport} />
                  );
                })}
                <div className="load-more-answers" onClick={this.loadMoreAnswers}><b>LOAD MORE ANSWERS</b></div>
                </div>
                <QHelpfulAddAnswer questionHelpful={this.questionHelpful} addAnswer={this.addAnswer} questionReport={this.questionReport} question_id={q.question_id} question_helpfulness={q.question_helpfulness} question_id={q.question_id} question_body={q.question_body} />
              </div>
            );
          }
        })}

        <div className="qa" id="buttons">
          <button id="more-answered-qs" onClick={this.moreAnsweredQs}>MORE ANSWERED QUESTIONS</button>
          <button id="addq" onClick={this.addQuestion}>ADD A QUESTION +</button>
        </div>
        <AnswerModal productName={this.state.productName} questionBody={this.state.questionBody} photos={this.state.photos} uploadPhotos={this.uploadPhotos} submitAnswer={this.submitAnswer}/>
        <QuestionModal productName={this.state.productName} submitQuestion={this.submitQuestion}/>
        </div>
      </div>
    );
  }
}

export default QuestionsAndAnswers;