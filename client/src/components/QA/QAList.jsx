import React from 'react';

import AnswerContainer from './AnswerContainer';
import LoadMoreAnswers from './LoadMoreAnswers';
import QHelpfulAddAnswer from './QHelpfulAddAnswer';
import QAButtons from './QAButtons';
import AnswerModal from './AnswerModal';
import QuestionModal from './QuestionModal';

import withTracker from './QATrackerHOC';

class QAList extends React.Component {
  constructor(props) {
    super(props);

    this.sortAnswers = this.sortAnswers.bind(this);
    this.convertDate = this.convertDate.bind(this);
  }

  componentDidMount() {
    let element = document.getElementById('qa-list');

    if (element) {
      element.onscroll = () => {
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
          this.props.moreAnsweredQs();
        }
      };
    }
  }

  sortAnswers(ans) {
    let answers = [];
    let sellerAnswers = [];

    for (var key in ans) {
      if (ans[key].answerer_name === 'Seller') {
        sellerAnswers.push(ans[key]);
      } else if (ans[key].id) {
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

  convertDate(date) {
    const ISOdate = new Date(date);
    const month = ISOdate.toLocaleString('default', { month: 'long'});
    const day = ISOdate.getDate();
    const year = ISOdate.getFullYear();
    const newDate = `${month} ${day}, ${year}`;

    return newDate;
  }

  render() {
    const allAnswers = this.props.answers;

    if (!this.props.answers || !this.props.filteredQs) {
      return (
        <div id="noQs">No questions or answers.</div>
      );
    }

    return (
      <div id="qa-list">{this.props.filteredQs.map((q, i) => {
        let answers = this.sortAnswers(allAnswers[q.question_id].data);
        let originalLength = answers.length;
        let count = allAnswers[q.question_id].count;

        answers = answers.slice(0, count);

        return (
          <div key={q.question_date + i} className="qa" id="list">
            <div className="question" onClick={(e) => { this.props.handleTrackingClick(e, e.currentTarget.className, 'Questions & Answers'); }}><b>Q: <span className="question-text">{q.question_body}</span></b></div>
            <div className="answer-wrapper">{answers.map(a => {
              let date = this.convertDate(a.date);
              let aName = a.answerer_name;

              if (aName === 'Seller') {
                aName = '<b>Seller</b>';
              }

              return (
                <AnswerContainer key={a.id} body={a.body} photos={a.photos} aName={aName} date={date} markHelpful={this.props.markHelpful} answer_id={a.id} helpfulness={a.helpfulness} report={this.props.report} openThumbnail={this.props.openThumbnail} />
              );
            })}
            <LoadMoreAnswers loadMoreAnswers={this.props.loadMoreAnswers} question_id={q.question_id} originalLength={originalLength} />
            </div>
            <QHelpfulAddAnswer markHelpful={this.props.markHelpful} addAnswer={this.props.addAnswer} report={this.props.report} question_id={q.question_id} question_helpfulness={q.question_helpfulness} question_id={q.question_id} question_body={q.question_body} />
          </div>
        );
      })}
      </div>
    );
  }
}

export default withTracker(QAList);