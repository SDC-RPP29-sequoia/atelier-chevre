import React from 'react';

import AnswerContainer from './AnswerContainer';
import LoadMoreAnswers from './LoadMoreAnswers';
import QHelpfulAddAnswer from './QHelpfulAddAnswer';
import QAButtons from './QAButtons';
import AnswerModal from './AnswerModal';
import QuestionModal from './QuestionModal';

const QAList = (props) => {
  return (
    <div id="qa-list">{props.filteredQs.map((q, i) => {
      if (q.answers) {
        let answers = props.sortAnswers(q.answers);

        return (
          <div key={q.question_date + i} className="qa" id="list">
            <div className="question"><b>Q: {q.question_body}</b></div>
            <div>{answers.map(a => {
              let date = props.convertDate(a.date);
              let aName = a.answerer_name;

              if (aName === 'Seller') {
                aName = '<b>Seller</b>';
              }

              return (
                <AnswerContainer key={a.id} body={a.body} photos={a.photos} aName={aName} date={date} answerHelpful={props.answerHelpful} answer_id={a.id} helpfulness={a.helpfulness} answerReport={props.answerReport} />
              );
            })}
            <LoadMoreAnswers loadMoreAnswers={props.loadMoreAnswers} />
            </div>
            <QHelpfulAddAnswer questionHelpful={props.questionHelpful} addAnswer={props.addAnswer} questionReport={props.questionReport} question_id={q.question_id} question_helpfulness={q.question_helpfulness} question_id={q.question_id} question_body={q.question_body} />
          </div>
        );
      }
    })}
    </div>
  );
};

export default QAList;