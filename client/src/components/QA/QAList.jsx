import React from 'react';

import AnswerContainer from './AnswerContainer';
import LoadMoreAnswers from './LoadMoreAnswers';
import QHelpfulAddAnswer from './QHelpfulAddAnswer';
import QAButtons from './QAButtons';
import AnswerModal from './AnswerModal';
import QuestionModal from './QuestionModal';

class QAList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let allAnswers = this.props.answers;
    // console.log('all answers', allAnswers);

    return (
      <div id="qa-list">{this.props.filteredQs.map((q, i) => {
        let answers = this.props.sortAnswers(allAnswers[q.question_id].data);
        let originalLength = answers.length;

        let count = allAnswers[q.question_id].count;

        answers = answers.slice(0, count);

        return (
          <div key={q.question_date + i} className="qa" id="list">
            <div className="question"><b>Q: {q.question_body}</b></div>
            <div>{answers.map(a => {
              let date = this.props.convertDate(a.date);
              let aName = a.answerer_name;

              if (aName === 'Seller') {
                aName = '<b>Seller</b>';
              }

              return (
                <AnswerContainer key={a.id} body={a.body} photos={a.photos} aName={aName} date={date} answerHelpful={this.props.answerHelpful} answer_id={a.id} helpfulness={a.helpfulness} answerReport={this.props.answerReport} />
              );
            })}
            <LoadMoreAnswers loadMoreAnswers={this.props.loadMoreAnswers} question_id={q.question_id} originalLength={originalLength} />
            </div>
            <QHelpfulAddAnswer questionHelpful={this.props.questionHelpful} addAnswer={this.props.addAnswer} questionReport={this.props.questionReport} question_id={q.question_id} question_helpfulness={q.question_helpfulness} question_id={q.question_id} question_body={q.question_body} />
          </div>
        );
      })}
      </div>
    );
  }
}

export default QAList;