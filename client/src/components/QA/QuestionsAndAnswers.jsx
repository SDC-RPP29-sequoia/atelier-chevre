import React from 'react';
import axios from 'axios';

import QAHeader from './QAHeader';
import SearchBar from './SearchBar';
import QAList from './QAList';
import QAButtons from './QAButtons';
import AnswerModal from './AnswerModal';
import QuestionModal from './QuestionModal';

import './QA.scss';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      currProduct: {name: 'TEST PRODUCT NAME'},
      currProductId: props.productId,
      questions: [],
      filteredQs: [],
      photos: [],
      answers: {},
      filteredAs: {},
      productName: '',
      questionBody: '',
      questionId: '',
      searchVal: '',
      count: 2,
      originalLength: null,
      files: {}
    };

    this.retrieveSortQAs = this.retrieveSortQAs.bind(this);
    this.displayButtons = this.displayButtons.bind(this);
    this.markHelpful = this.markHelpful.bind(this);
    this.report = this.report.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.openModal = this.openModal.bind(this);
    this.uploadPhotos = this.uploadPhotos.bind(this);
    this.moreAnsweredQs = this.moreAnsweredQs.bind(this);
    this.loadMoreAnswers = this.loadMoreAnswers.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getQuestions((result) => {
      this.setState({
        originalLength: result.length,
        isLoaded: true
      });

      let moreAnsweredQs = document.getElementById('more-answered-qs');

      if (result.length <= 2) {
        moreAnsweredQs.style.display = 'none';
      }
    });
  }

  getQuestions(cb) {
    axios.get(`/api/questions/${this.state.currProductId}`)
      .then(response => {
        let questions = response.data.results;

        if (cb) {
          cb(questions);
        }

        this.retrieveSortQAs(questions);
        this.displayButtons();
      })
      .catch(err => {
        console.log(err);
      });
  }

  retrieveSortQAs(questions) {
    let answers = {};

    questions.forEach(q => {
      let ansObj = {};
      let ansArray = [];

      for (let i in q.answers) {
        ansArray.push(q.answers[i]);
      }

      ansObj.data = ansArray;

      if (this.state.answers[q.question_id] && this.state.answers[q.question_id].count) {
        ansObj.count = this.state.answers[q.question_id].count;
      } else {
        ansObj.count = 2;
      }

      answers[q.question_id] = ansObj;
    });

    this.setState({
      answers,
      filteredAs: answers
    });

    questions.sort((a, b) => {
      return b.question_helpfulness - a.question_helpfulness;
    });

    let filteredQs = questions.slice(0, this.state.count);

    this.setState({
      questions,
      filteredQs
    });
  }

  displayButtons() {
    let displayedAnswers = document.getElementsByClassName('load-more-answers');

    for (let i = 0; i < displayedAnswers.length; i++) {
      let length = displayedAnswers[i].attributes['original-length'].value;

      if (length <= 2) {
        displayedAnswers[i].style.display = 'none';
      }
    }

    let displayedQuestions = document.getElementsByClassName('question');
    let moreAnsweredQs = document.getElementById('more-answered-qs');

    if (displayedQuestions.length === this.state.originalLength) {
      moreAnsweredQs.style.display = 'none';
    }
  }

  markHelpful(e) {
    let clicked = e.target.getAttribute('clicked');

    let url, data;

    if (clicked === 'true') {
      alert('You have already marked this as helpful');
      return;
    }

    e.target.setAttribute('clicked', 'true');

    if (e.target.className === 'answer-helpful') {
      url = '/api/questions/answerHelpful';
      let answerId = e.target.getAttribute('answer_id');
      data = { answerId };
    } else if (e.target.className === 'question-helpful') {
      url = '/api/questions/questionHelpful';
      let questionId = e.target.getAttribute('question_id');
      data = { questionId };
    }

    axios.put(url, data)
      .then(response => {
        this.getQuestions();
      })
      .catch(err => {
        console.log(err);
      });
  }

  report(e) {
    e.target.innerHTML = 'Reported';

    let url, data;

    if (e.target.className === 'report-question') {
      url = '/api/questions/reportQuestion';
      let questionId = e.target.getAttribute('question_id');
      data = { questionId };
    } else if (e.target.className === 'report-answer') {
      url = '/api/questions/reportAnswer';
      let answerId = e.target.getAttribute('answer_id');
      data = { answerId };
    }

    axios.put(url, data)
      .then(response => {

      })
      .catch(err => {
        console.log(err);
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

    this.openModal('answer');
  }

  addQuestion(e) {
    let productName = this.state.currProduct.name;

    this.setState({
      productName
    });

    this.openModal('question');
  }

  openModal(target) {
    let modal;

    if (target === 'question') {
      modal = document.querySelector('.modal-q');
    } else if (target === 'answer') {
      modal = document.querySelector('.modal');
    }

    modal.style.display = 'block';

    let closeBtn = document.querySelector('.modal .close-btn');
    let closeBtn2 = document.querySelector('.modal-q .close-btn');

    closeBtn.onclick = () => {
      modal.style.display = 'none';
    };

    closeBtn2.onclick = () => {
      modal.style.display = 'none';
    };

    window.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  moreAnsweredQs() {
    this.setState({
      count: this.state.count + 2
    });

    this.getQuestions();
  }

  loadMoreAnswers(e) {
    let text = e.target.parentElement.textContent;
    let questionId = e.target.parentElement.getAttribute('question_id');
    let originalLength = e.target.parentElement.getAttribute('original-length');

    let answers = this.state.answers;

    if (text === 'LOAD MORE ANSWERS') {
      e.target.parentElement.innerHTML = '<b>COLLAPSE ANSWERS</b>';
      answers[questionId].count = originalLength;
    } else if (text === 'COLLAPSE ANSWERS') {
      answers[questionId].count = 2;
      e.target.parentElement.innerHTML = '<b>LOAD MORE ANSWERS</b>';
    }

    this.setState({
      answers
    });

    this.getQuestions();
  }

  hideLoadMoreAnswers() {
    let loadMoreAnswers = document.getElementsByClassName('load-more-answers');
    for (let i = 0; i < loadMoreAnswers.length; i++) {
      loadMoreAnswers[i].style.display = 'none';
    }
  }

  uploadPhotos(e) {
    let photos = [];

    for (let key in e.target.files) {
      if (key !== 'length' && key !== 'item') {
        photos.push(URL.createObjectURL(e.target.files[key]));
      }
    }

    if (e.target.files.length > 5) {
      alert('You may only upload 5 images');
      e.target.value = '';
      this.setState({
        files: {length: 0}
      });
    } else {
      let files = e.target.files;
      this.setState({
        files,
        photos
      });
    }
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
    formData.append('questionId', this.state.questionId);

    axios.post('/api/questions/addAnswer', formData)
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

    axios.post('/api/questions', { data })
      .then(response => {
        document.getElementById('modal-question').value = '';
        document.getElementById('modal-question-nickname').value = '';
        document.getElementById('modal-question-email').value = '';
        this.getQuestions();
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange(e) {
    this.setState({
      searchVal: e.target.value
    });

    let text = e.target.value;
    let questions = this.state.questions;

    if (!text || text === '' || text.length < 2) {
      this.getQuestions();
    } else if (text.length > 2) {
      let filteredQs = questions.filter(q => {
        let question = q.question_body.toLowerCase();
        let answers = '';

        for (let key in q.answers) {
          answers += q.answers[key].body;
        }

        answers = answers.toLowerCase();

        return question.includes(text) || answers.includes(text);
      });

      let originalAnswers = Object.assign({}, this.state.answers);
      let filteredAs = Object.assign({}, originalAnswers);

      let questionKeys = filteredQs.map(q => {
        return q.question_id;
      });

      for (let key in filteredAs) {
        if (filteredAs[key]) {
          let newData = [];

          for (let i = 0; i < filteredAs[key].data.length; i++) {
            if (filteredAs[key].data[i].body.toLowerCase().includes(text)) {
              newData.push(filteredAs[key].data[i]);
            }

            if (questionKeys.includes(Number(key)) && !newData.includes(filteredAs[key].data[i])) {
              newData.push(filteredAs[key].data[i]);
            }
          }
          filteredAs[key].count = 100;
          filteredAs[key].data = newData;
        }
      }

      this.setState({
        filteredQs,
        filteredAs
      }, this.hideLoadMoreAnswers);
    }
  }

  render() {
    console.log('Questions and Answers was rendered');
    if (!this.state.isLoaded) {
      return (
        <div id="loading">Loading...</div>
      );
    }

    return (
      <div className="qa" id="qa-wrapper">
        <QAHeader />
        <SearchBar searchVal={this.state.searchVal} handleChange={this.handleChange} />
        <QAList filteredQs={this.state.filteredQs} markHelpful={this.markHelpful} report={this.report} loadMoreAnswers={this.loadMoreAnswers} addAnswer={this.addAnswer} moreAnsweredQs={this.moreAnsweredQs} addQuestion={this.addQuestion} productName={this.state.productName} questionBody={this.state.questionBody} photos={this.state.photos} uploadPhotos={this.uploadPhotos} submitAnswer={this.submitAnswer} productName={this.state.productName} submitQuestion={this.submitQuestion} answers={this.state.filteredAs} answerCount={this.state.answerCount} />
        <QAButtons moreAnsweredQs={this.moreAnsweredQs} addQuestion={this.addQuestion} />
        <AnswerModal productName={this.state.productName} questionBody={this.state.questionBody} photos={this.state.photos} uploadPhotos={this.uploadPhotos} submitAnswer={this.submitAnswer} />
        <QuestionModal productName={this.state.productName} submitQuestion={this.submitQuestion} />
      </div>
    );
  }
}

export default QuestionsAndAnswers;