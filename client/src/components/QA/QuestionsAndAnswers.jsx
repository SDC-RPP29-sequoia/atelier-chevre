import React from 'react';
import axios from 'axios';

import QAHeader from './QAHeader';
import SearchBar from './SearchBar';
import QAList from './QAList';
import QAButtons from './QAButtons';
import AnswerModal from './AnswerModal';
import QuestionModal from './QuestionModal';
import ThumbnailModal from './ThumbnailModal';

import API from './QAAPIUtils.js';
import withTracker from './QATrackerHOC';

import './QA.scss';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      currProduct: {name: 'TEST PRODUCT NAME'},
      currProductId: props.productId,
      productName: '',
      questions: [],
      filteredQs: [],
      questionBody: '',
      questionId: '',
      answers: {},
      filteredAs: {},
      photos: [],
      searchVal: '',
      count: 2,
      originalLength: null,
      displayedImage: ''
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
    this.openThumbnail = this.openThumbnail.bind(this);
    this.highlightText = this.highlightText.bind(this);
  }

  componentDidMount() {
    this.getQuestions((result) => {
      this.setState({
        originalLength: result.length,
        isLoaded: true
      });

      const moreAnsweredQs = document.getElementById('more-answered-qs');

      if (result.length <= 2) {
        moreAnsweredQs.style.display = 'none';
      }
    });
  }

  getQuestions(cb, reset) {
    API.getQuestions(this.state.currProductId)
      .then(response => {
        const questions = response.data.results;

        if (cb) {
          cb(questions);
        }

        if (reset) {
          this.retrieveSortQAs(questions, true);
        } else {
          this.retrieveSortQAs(questions);
        }
        this.displayButtons();
      })
      .catch(err => {
        console.log(err);
      });
  }

  retrieveSortQAs(questions, reset) {
    const answers = {};

    questions.forEach(q => {
      const ansObj = {};
      const ansArray = [];

      for (let i in q.answers) {
        ansArray.push(q.answers[i]);
      }

      ansObj.data = ansArray;

      if (reset) {
        ansObj.count = 2;
      } else {
        if (this.state.answers[q.question_id] && this.state.answers[q.question_id].count) {
          ansObj.count = this.state.answers[q.question_id].count;
        } else {
          ansObj.count = 2;
        }
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

    let filteredQs;

    if (reset) {
      filteredQs = questions.slice(0, 2);
    } else {
      filteredQs = questions.slice(0, this.state.count);
    }

    this.setState({
      questions,
      filteredQs
    });
  }

  displayButtons() {
    const displayedAnswers = document.getElementsByClassName('load-more-answers');

    for (let i = 0; i < displayedAnswers.length; i++) {
      let length = displayedAnswers[i].attributes['original-length'].value;

      if (length <= 2) {
        displayedAnswers[i].style.display = 'none';
      }

      if (length > 2) {
        displayedAnswers[i].style.display = 'block';
      }
    }

    const displayedQuestions = document.getElementsByClassName('question');
    const moreAnsweredQs = document.getElementById('more-answered-qs');

    if (displayedQuestions.length >= this.state.originalLength) {
      console.log('hi', displayedQuestions.length, this.state.originalLength);
      moreAnsweredQs.style.display = 'none';
    }
  }

  markHelpful(e) {
    const clicked = e.target.getAttribute('clicked');

    let url, data;

    if (clicked === 'true') {
      alert('You have already marked this as helpful');
      return;
    }

    e.target.setAttribute('clicked', 'true');

    if (e.target.className === 'answer-helpful') {
      let answerId = e.target.getAttribute('answer_id');
      data = { answerId };
    } else if (e.target.className === 'question-helpful') {
      let questionId = e.target.getAttribute('question_id');
      data = { questionId };
    }

    API.markHelpful(e.target.className, data)
      .then(response => {
        this.getQuestions();
      })
      .catch(err => {
        console.log(err);
      });
  }

  report(e) {
    e.target.innerHTML = 'Reported';

    let url, data, questionId, answerId;

    if (e.target.className === 'report-question') {
      questionId = e.target.getAttribute('question_id');
      data = { questionId };

      let filteredQs = this.state.filteredQs;

      for (let i = 0; i < filteredQs.length; i++) {
        if (filteredQs[i].question_id === Number(questionId)) {
          filteredQs.splice(i, 1);
        }
      }

      setTimeout(() => {
        this.setState({
          filteredQs
        });

        this.displayButtons();
      }, 1000);
    } else if (e.target.className === 'report-answer') {
      answerId = e.target.getAttribute('answer_id');
      data = { answerId };

      let filteredAs = this.state.filteredAs;

      for (let key in filteredAs) {
        for (let i = 0; i < filteredAs[key].data.length; i++) {
          if (filteredAs[key].data[i].id === Number(answerId)) {
            filteredAs[key].data.splice(i, 1);
          }
        }
      }

      setTimeout(() => {
        this.setState({
          filteredAs
        });

        this.displayButtons();
      }, 1000);
    }

    API.report(e.target.className, data)
      .catch(err => {
        console.log(err);
      });
  }

  addAnswer(e) {
    const questionId = e.target.getAttribute('question_id');
    const questionBody = e.target.getAttribute('question_body');
    const productName = this.state.currProduct.name;

    this.setState({
      productName,
      questionBody,
      questionId
    });

    this.openModal('answer');
  }

  addQuestion(e) {
    const productName = this.state.currProduct.name;

    this.setState({
      productName
    });

    this.openModal('question');
  }

  openThumbnail(e) {
    const displayedImage = e.target.src;

    document.getElementsByTagName('body')[0].setAttribute('style', 'overflow-y: hidden');

    this.setState({
      displayedImage
    });

    this.openModal('image');
  }

  openModal(target) {
    let modal;

    if (target === 'question') {
      modal = document.querySelector('.modal-q');
    } else if (target === 'answer') {
      modal = document.querySelector('.modal');
    } else if (target === 'image') {
      modal = document.querySelector('.modal-thumbnail');
    }

    modal.style.display = 'block';

    const closeBtn = document.querySelector('.modal .close-btn');
    const closeBtn2 = document.querySelector('.modal-q .close-btn');
    const closeBtn3 = document.querySelector('.modal-thumbnail .close-btn');

    closeBtn.onclick = () => {
      modal.style.display = 'none';
      document.getElementsByTagName('body')[0].removeAttribute('style', 'overflow-y: hidden');
    };

    closeBtn2.onclick = () => {
      modal.style.display = 'none';
      document.getElementsByTagName('body')[0].removeAttribute('style', 'overflow-y: hidden');
    };

    closeBtn3.onclick = () => {
      modal.style.display = 'none';
      document.getElementsByTagName('body')[0].removeAttribute('style', 'overflow-y: hidden');
    };

    window.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  moreAnsweredQs() {
    this.setState({
      count: this.state.count + 5
    });

    this.getQuestions();
  }

  loadMoreAnswers(e) {
    const text = e.target.parentElement.textContent;
    const questionId = e.target.parentElement.getAttribute('question_id');
    const originalLength = e.target.parentElement.getAttribute('original-length');

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

  showLoadMoreAnswers() {
    let loadMoreAnswers = document.getElementsByClassName('load-more-answers');
    for (let i = 0; i < loadMoreAnswers.length; i++) {
      loadMoreAnswers[i].style.display = 'block';
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
    } else {
      this.setState({
        photos
      });
    }
  }

  submitAnswer(e) {
    e.preventDefault();

    const answer = document.getElementById('modal-answer').value;
    const name = document.getElementById('modal-answer-nickname').value;
    const email = document.getElementById('modal-answer-email').value;
    const photos = document.getElementById('modal-photos').files;

    let photoFileNames = [];

    for (let key in photos) {
      if (key !== 'item' && key !== 'length') {
        photoFileNames.push(photos[key].name);
      }
    }

    let tracker = {
      answer,
      name,
      email
    };

    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailValid = regexp.test(email);

    if (!answer || !name || !email || !emailValid) {
      let string = 'You must enter or address the following:\n';

      for (let key in tracker) {
        if (!tracker[key]) {
          string += `- ${key.slice(0, 1).toUpperCase() + key.slice(1)}\n`;
        }
      }

      if (email && !emailValid) {
        string += '- Your email must be formatted correctly\n';
      }

      if (!this.photosValid(photoFileNames)) {
        string += '- You may only upload .jpg, .jpeg, .bmp, .gif, and .png files';
      }

      alert(string);
      return;
    }

    let modal = document.querySelector('.modal');
    modal.style.display = 'none';

    let formElement = document.querySelector('#add-answer');
    let formData = new FormData(formElement);
    formData.append('questionId', this.state.questionId);

    API.postAnswer(formData)
      .then(response => {
        document.getElementById('modal-answer').value = '';
        document.getElementById('modal-answer-nickname').value = '';
        document.getElementById('modal-answer-email').value = '';
        document.getElementById('modal-photos').value = '';
        this.setState({
          photos: []
        });
        this.getQuestions();
      })
      .catch(err => {
        console.log(err);
      });
  }

  photosValid(photos) {
    const validFileExtensions = ['.jpg', '.jpeg', '.bmp', '.png', '.gif'];

    for (let i = 0; i < photos.length; i++) {
      let fileName = photos[i];
      let valid = false;

      for (let j = 0; j < validFileExtensions.length; j++) {
        let currExtension = validFileExtensions[j];
        if (fileName.substr(fileName.length - currExtension.length, currExtension.length).toLowerCase() === currExtension.toLowerCase()) {
          valid = true;
          break;
        }
      }

      if (!valid) {
        return false;
      }
    }

    return true;
  }

  submitQuestion(e) {
    e.preventDefault();

    const question = document.getElementById('modal-question').value;
    const name = document.getElementById('modal-question-nickname').value;
    const email = document.getElementById('modal-question-email').value;

    let tracker = {
      question,
      name,
      email
    };

    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailValid = regexp.test(email);

    if (!question || !name || !email || !emailValid) {
      let string = 'You must enter or address the following:\n';

      for (let key in tracker) {
        if (!tracker[key]) {
          string += `- ${key.slice(0, 1).toUpperCase() + key.slice(1)}\n`;
        }
      }

      if (email && !emailValid) {
        string += '- Your email must be formatted correctly\n';
      }

      alert(string);
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

    API.postQuestion({ data })
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

  highlightText() {
    this.clearText();

    let term = this.state.searchVal;

    let answers = document.getElementsByClassName('answer-text');

    for (let i = 0; i < answers.length; i++) {
      let currText = answers[i].innerHTML;
      let newText = currText.replace(new RegExp(term, 'gi'), (match) => `<mark>${match}</mark>`);

      answers[i].innerHTML = newText;
    }

    let questions = document.getElementsByClassName('question-text');

    for (let i = 0; i < questions.length; i++) {
      let currText = questions[i].innerHTML;
      let newText = currText.replace(new RegExp(term, 'gi'), (match) => `<mark>${match}</mark>`);

      questions[i].innerHTML = newText;
    }
  }

  clearText() {
    const answers = document.getElementsByClassName('answer-text');
    const regex = new RegExp('mark>', 'ig');

    for (let i = 0; i < answers.length; i++) {
      answers[i].innerHTML = answers[i].innerHTML.replace(regex, 'wbr>');
    }

    const questions = document.getElementsByClassName('question-text');

    for (let i = 0; i < questions.length; i++) {
      questions[i].innerHTML = questions[i].innerHTML.replace(regex, 'wbr>');
    }
  }

  showMoreAnsweredQs() {
    const moreAnsweredQs = document.getElementById('more-answered-qs');

    if (this.state.filteredQs.length > 2) {
      moreAnsweredQs.style.display = 'block';
    }
  }

  handleChange(e) {
    this.setState({
      searchVal: e.target.value
    });

    let text = e.target.value;
    let questions = this.state.questions;

    if (!text || text === '' || text.length < 2) {
      this.getQuestions(null, true);
      this.showLoadMoreAnswers();
      this.clearText();
      this.showMoreAnsweredQs();
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

      const originalAnswers = Object.assign({}, this.state.answers);
      const filteredAs = Object.assign({}, originalAnswers);

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
      }, () => {
        this.highlightText();
        this.hideLoadMoreAnswers();
        this.showMoreAnsweredQs();
      });
    }
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div id="loading">Loading...</div>
      );
    }

    return (
      <div className="qa" id="qa-wrapper">
        <QAHeader />
        <SearchBar searchVal={this.state.searchVal} handleChange={this.handleChange} />
        <QAList filteredQs={this.state.filteredQs} markHelpful={this.markHelpful} report={this.report} loadMoreAnswers={this.loadMoreAnswers} addAnswer={this.addAnswer} moreAnsweredQs={this.moreAnsweredQs} addQuestion={this.addQuestion} productName={this.state.productName} questionBody={this.state.questionBody} photos={this.state.photos} uploadPhotos={this.uploadPhotos} submitAnswer={this.submitAnswer} productName={this.state.productName} submitQuestion={this.submitQuestion} answers={this.state.filteredAs} answerCount={this.state.answerCount} getQuestions={this.getQuestions} openThumbnail={this.openThumbnail}/>
        <QAButtons moreAnsweredQs={this.moreAnsweredQs} addQuestion={this.addQuestion} />
        <AnswerModal productName={this.state.productName} questionBody={this.state.questionBody} photos={this.state.photos} uploadPhotos={this.uploadPhotos} submitAnswer={this.submitAnswer} openThumbnail={this.openThumbnail} />
        <QuestionModal productName={this.state.productName} submitQuestion={this.submitQuestion} />
        <ThumbnailModal photo={this.state.displayedImage}/>
      </div>
    );
  }
}

export default withTracker(QuestionsAndAnswers);