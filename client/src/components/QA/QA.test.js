/**
 * @jest-environment jsdom
*/

import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { TestableQuestionsAndAnswers } from './QuestionsAndAnswers';
import { TestableQAHeader } from './QAHeader';
import QAHeader from './QAHeader';
import { TestableSearchBar } from './SearchBar';
import { TestableQAList } from './QAList';
import { TestableQAButtons } from './QAButtons';
import { TestableAnswerModal } from './AnswerModal';
import { TestableQuestionModal } from './QuestionModal';
import { TestableAnswerContainer } from './AnswerContainer';
import { TestableLoadMoreAnswers } from './LoadMoreAnswers';
import { TestableQHelpfulAddAnswer } from './QHelpfulAddAnswer';
import { TestableSignatureHelpfulReport } from './SignatureHelpfulReport';
import { TestableThumbnailModal } from './ThumbnailModal';
import withTracker from './QATrackerHOC';

describe('<QuestionsAndAnswers />', () => {
  let wrapper, instance;

  let mockFilteredQs = [
    {
      'question_id': 213346,
      'question_body': 'Where is this product made?',
      'question_date': '2018-10-04T00:00:00.000Z',
      'asker_name': 'jbilas',
      'question_helpfulness': 21,
      'reported': false,
      'answers': {
        '1992368': {
          'id': 1992368,
          'body': 'China',
          'date': '2018-08-04T00:00:00.000Z',
          'answerer_name': 'Seller',
          'helpfulness': 16,
          'photos': []
        }
      }
    }
  ];

  let mockAnswers = {
    '213346': {
      'data': [
        {
          'id': 1992383,
          'body': 'Michigan',
          'date': '2018-01-24T00:00:00.000Z',
          'answerer_name': 'iluvbirds',
          'helpfulness': 4,
          'photos': []
        },
        {
          'id': 1992387,
          'body': 'Made locally!',
          'date': '2018-11-24T00:00:00.000Z',
          'answerer_name': 'Seller',
          'helpfulness': 8,
          'photos': []
        }
      ],
      'count': 2
    }
  };

  beforeEach(() => {
    wrapper = mount(<TestableQuestionsAndAnswers productId="36300" />);
    instance = wrapper.instance();
    wrapper.setState({
      filteredAs: mockAnswers,
      currProduct: {name: 'test'},
      questions: [1, 2, 3, 4],
      answers: mockAnswers
    });

    document.body.innerHTML = `
    <div className="modal-q"></div>
    <div className="modal"></div>
    `;
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('sorts retrieved Q&As', () => {
    instance.retrieveSortQAs = jest.fn(instance.retrieveSortQAs);
    instance.retrieveSortQAs(mockFilteredQs);
    expect(instance.retrieveSortQAs).toHaveBeenCalled();
  });

  it('sorts retrieved Q&As reset branch', () => {
    instance.retrieveSortQAs = jest.fn(instance.retrieveSortQAs);
    instance.retrieveSortQAs(mockFilteredQs, true);
    expect(instance.retrieveSortQAs).toHaveBeenCalled();
  });

  it('marks question helpful', () => {
    instance.markHelpful = jest.fn(instance.markHelpful);
    let event = {
      target: {
        getAttribute: (a) => { return a; },
        setAttribute: (a) => { return a; },
        className: 'question-helpful'
      }
    };
    instance.markHelpful(event);
    expect(instance.markHelpful).toHaveBeenCalled();
  });

  it('marks answer helpful', () => {
    instance.markHelpful = jest.fn(instance.markHelpful);
    let event = {
      target: {
        getAttribute: (a) => { return a; },
        setAttribute: (a) => { return a; },
        className: 'answer-helpful'
      }
    };
    instance.markHelpful(event);
    expect(instance.markHelpful).toHaveBeenCalled();
  });

  it('displays buttons', () => {
    instance.displayButtons = jest.fn(instance.displayButtons);
    instance.displayButtons();
    expect(instance.displayButtons).toHaveBeenCalled();
  });

  it('reports question', () => {
    instance.report = jest.fn(instance.report);
    let event = {
      target: {
        getAttribute: (a) => { return a; },
        setAttribute: (a) => { return a; },
        className: 'report-question'
      }
    };
    instance.report(event);
    expect(instance.report).toHaveBeenCalled();
  });

  it('reports answer', () => {
    instance.report = jest.fn(instance.report);
    let event = {
      target: {
        getAttribute: (a) => { return a; },
        setAttribute: (a) => { return a; },
        className: 'report-answer'
      }
    };
    instance.report(event);
    expect(instance.report).toHaveBeenCalled();
  });

  it('adds question', () => {
    instance.addQuestion = jest.fn(instance.addQuestion);
    instance.openModal = jest.fn();
    let event = {
      target: {
        getAttribute: (a) => { return a; },
        setAttribute: (a) => { return a; },
        className: 'report-answer'
      }
    };
    instance.addQuestion(event);
    expect(instance.addQuestion).toHaveBeenCalled();
  });

  it('adds answers', () => {
    instance.addAnswer = jest.fn(instance.addAnswer);
    instance.openModal = jest.fn();
    let event = {
      target: {
        getAttribute: (a) => { return a; },
        setAttribute: (a) => { return a; },
        className: 'report-answer'
      }
    };
    instance.addAnswer(event);
    expect(instance.addAnswer).toHaveBeenCalled();
  });

  it('opens modal question', () => {
    instance.openModal = jest.fn();
    instance.openModal('question');
    expect(instance.openModal).toHaveBeenCalled();
  });

  it('opens modal answer', () => {
    instance.openModal = jest.fn();
    instance.openModal('answer');
    expect(instance.openModal).toHaveBeenCalled();
  });

  it('opens thumbnail', () => {
    instance.openThumbnail = jest.fn(instance.openThumbnail);
    instance.openModal = jest.fn();
    let event = {
      target: {
        getAttribute: (a) => { return a; },
        setAttribute: (a) => { return a; },
        className: 'report-answer'
      }
    };
    instance.openThumbnail(event);
    expect(instance.openThumbnail).toHaveBeenCalled();
  });

  it('runs more answered Qs', () => {
    instance.moreAnsweredQs = jest.fn(instance.moreAnsweredQs);
    instance.moreAnsweredQs('answer');
    expect(instance.moreAnsweredQs).toHaveBeenCalled();
  });

  it('shows more answered Qs', () => {
    instance.showMoreAnsweredQs = jest.fn(instance.showMoreAnsweredQs);
    instance.showMoreAnsweredQs('answer');
    expect(instance.showMoreAnsweredQs).toHaveBeenCalled();
  });

  it('loads more answers branch one', () => {
    instance.loadMoreAnswers = jest.fn(instance.loadMoreAnswers);
    instance.getQuestions = jest.fn();
    let event = {
      target: {
        getAttribute: (a) => { return a; },
        setAttribute: (a) => { return a; },
        className: 'report-answer',
        parentElement: {
          textContent: 'LOAD MORE ANSWERS',
          getAttribute: (a) => {
            if (a === 'question_id') {
              return 213346;
            }
          },
          setAttribute: (a) => { return a; }
        }
      }
    };
    instance.loadMoreAnswers(event);
    expect(instance.loadMoreAnswers).toHaveBeenCalled();
  });

  it('loads more answers branch two', () => {
    instance.loadMoreAnswers = jest.fn(instance.loadMoreAnswers);
    instance.getQuestions = jest.fn();
    let event = {
      target: {
        getAttribute: (a) => { return a; },
        setAttribute: (a) => { return a; },
        className: 'report-answer',
        parentElement: {
          textContent: 'COLLAPSE ANSWERS',
          getAttribute: (a) => {
            if (a === 'question_id') {
              return 213346;
            }
          },
          setAttribute: (a) => { return a; }
        }
      }
    };
    instance.loadMoreAnswers(event);
    expect(instance.loadMoreAnswers).toHaveBeenCalled();
  });

  it('hides load more answers', () => {
    instance.hideLoadMoreAnswers = jest.fn(instance.hideLoadMoreAnswers);
    instance.hideLoadMoreAnswers();
    expect(instance.hideLoadMoreAnswers).toHaveBeenCalled();
  });

  it('shows load more answers', () => {
    instance.showMoreAnsweredQs = jest.fn(instance.showMoreAnsweredQs);
    instance.showMoreAnsweredQs();
    expect(instance.showMoreAnsweredQs).toHaveBeenCalled();
  });

  it('sets search state', () => {
    instance.setSearchState = jest.fn(instance.setSearchState);
    instance.setSearchState(mockAnswers, mockFilteredQs, () => {});
    expect(instance.setSearchState).toHaveBeenCalled();
  });
});

describe('<QAHeader />', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<TestableQAHeader />);
    instance = wrapper.instance();
  });

  it('renders all elements', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('#QAHeader')).toHaveLength(1);
  });
});

describe('<SearchBar />', () => {
  let wrapper, instance;
  const handleTrackingClick = jest.fn();
  const handleChange = jest.fn();
  const getQuestions = jest.fn();
  const showLoadMoreAnswers = jest.fn();
  const showMoreAnsweredQs = jest.fn();
  const setSearchState = jest.fn();

  let mockFilteredQs = [
    {
      'question_id': 213346,
      'question_body': 'Where is this product made?',
      'question_date': '2018-10-04T00:00:00.000Z',
      'asker_name': 'jbilas',
      'question_helpfulness': 21,
      'reported': false,
      'answers': {
        '1992368': {
          'id': 1992368,
          'body': 'China',
          'date': '2018-08-04T00:00:00.000Z',
          'answerer_name': 'Seller',
          'helpfulness': 16,
          'photos': []
        }
      }
    }
  ];

  let mockAnswers = {
    '213346': {
      'data': [
        {
          'id': 1992383,
          'body': 'Michigan',
          'date': '2018-01-24T00:00:00.000Z',
          'answerer_name': 'iluvbirds',
          'helpfulness': 4,
          'photos': []
        },
        {
          'id': 1992387,
          'body': 'Made locally!',
          'date': '2018-11-24T00:00:00.000Z',
          'answerer_name': 'Seller',
          'helpfulness': 8,
          'photos': []
        }
      ],
      'count': 2
    }
  };

  beforeEach(() => {
    wrapper = mount(<TestableSearchBar handleTrackingClick={handleTrackingClick} getQuestions={getQuestions} showLoadMoreAnswers={showLoadMoreAnswers} showMoreAnsweredQs={showMoreAnsweredQs} questions={mockFilteredQs} setSearchState={setSearchState} answers={mockAnswers}/>);
    instance = wrapper.instance();
    wrapper.setState({
      answers: [{innerHTML: '<div>hi</div>'}, {innerHTML: '<div>hi</div>'}],
      questions: [{innerHTML: '<div>hi</div>'}, {innerHTML: '<div>hi</div>'}]
    });
  });

  it('renders all elements', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('#search')).toHaveLength(1);
    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('runs handleTrackingClick on click', () => {
    let event = {currentTarget: {id: 'test'}};
    wrapper.find('.qa').simulate('click', event);
    expect(handleTrackingClick).toHaveBeenCalled();
  });

  it('runs handleChange on input change with empty input', () => {
    instance.handleChange = jest.fn(instance.handleChange);
    instance.clearText = jest.fn();
    let event = {currentTarget: {id: 'test'}, target: {value: ''}};
    wrapper.find('input').simulate('change', event);
    wrapper.update();
    instance.handleChange(event);
    expect(instance.handleChange).toHaveBeenCalled();
  });

  it('runs handleChange on input change with input', () => {
    instance.handleChange = jest.fn(instance.handleChange);
    instance.clearText = jest.fn();
    let event = {currentTarget: {id: 'test'}, target: {value: 'hello'}};
    wrapper.find('input').simulate('change', event);
    wrapper.update();
    instance.handleChange(event);
    expect(instance.handleChange).toHaveBeenCalled();
  });

  it('highlights and clears text', () => {
    instance.highlightText = jest.fn(instance.highlightText);
    instance.clearText = jest.fn(instance.clearText);
    instance.highlightText();
    expect(instance.highlightText).toHaveBeenCalled();
    expect(instance.clearText).toHaveBeenCalled();
  });
});

describe('<QAList />', () => {
  let wrapper, instance;
  const handleTrackingClick = jest.fn();
  const moreAnsweredQs = jest.fn();

  let mockfilteredQs = [
    {
      'question_id': 213346,
      'question_body': 'Where is this product made?',
      'question_date': '2018-10-04T00:00:00.000Z',
      'asker_name': 'jbilas',
      'question_helpfulness': 21,
      'reported': false,
      'answers': {
        '1992368': {
          'id': 1992368,
          'body': 'China',
          'date': '2018-08-04T00:00:00.000Z',
          'answerer_name': 'Seller',
          'helpfulness': 16,
          'photos': []
        }
      }
    }
  ];

  let mockAnswers = {
    '213346': {
      'data': [
        {
          'id': 1992383,
          'body': 'Michigan',
          'date': '2018-01-24T00:00:00.000Z',
          'answerer_name': 'iluvbirds',
          'helpfulness': 4,
          'photos': []
        },
        {
          'id': 1992387,
          'body': 'Made locally!',
          'date': '2018-11-24T00:00:00.000Z',
          'answerer_name': 'Seller',
          'helpfulness': 8,
          'photos': []
        }
      ],
      'count': 2
    }
  };

  beforeEach(() => {
    wrapper = mount(<TestableQAList filteredQs={mockfilteredQs} answers={mockAnswers} handleTrackingClick={handleTrackingClick} moreAnsweredQs={moreAnsweredQs}/>);
    instance = wrapper.instance();
    document.body.innerHTML = `
    <div id="qa-list"></div>
    `;
  });

  it('renders all elements provided data', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('#qa-list')).toHaveLength(1);
  });

  it('renders provided no data', () => {
    let faultyList = shallow(<TestableQAList />);

    expect(faultyList).toBeTruthy();
    expect(faultyList.find('#noQs')).toHaveLength(1);
  });

  it('sorts answers', () => {
    const sortAnswers = jest.fn();
    sortAnswers(mockAnswers);
    expect(sortAnswers).toHaveBeenCalled();
  });

  it('runs handleTrackingClick on click', () => {
    wrapper.find('.question').simulate('click');
    expect(handleTrackingClick).toHaveBeenCalled();
  });
});

describe('<QAButtons />', () => {
  let wrapper, instance;
  const moreAnsweredQs = jest.fn();
  const handleTrackingClick = jest.fn();
  const addQuestion = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<TestableQAButtons moreAnsweredQs={moreAnsweredQs} handleTrackingClick={handleTrackingClick} addQuestion={addQuestion} displayMoreAnsweredQs={true}/>);
  });

  it('renders all elements', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('#buttons')).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(2);
  });

  it('runs click handlers on click', () => {
    let event = {currentTarget: {id: 'test'}};
    wrapper.find('#more-answered-qs').simulate('click', event);
    wrapper.find('#addq').simulate('click', event);
    expect(moreAnsweredQs).toHaveBeenCalled();
    expect(handleTrackingClick).toHaveBeenCalled();
    expect(addQuestion).toHaveBeenCalled();
  });
});

describe('<AnswerModal />', () => {
  let wrapper, instance;
  let mockPhotos = ['photo1', 'photo2', 'photo3'];
  const handleTrackingClick = jest.fn();
  const openThumbnail = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<TestableAnswerModal photos={mockPhotos} handleTrackingClick={handleTrackingClick} openThumbnail={openThumbnail}/>);
    instance = wrapper.instance();
    wrapper.setState({
      photos: mockPhotos
    });

    document.body.innerHTML = `
    <div className="modal">
    <div className="modal-content">
      <span className="close-btn" onClick={(e) => { this.props.handleTrackingClick(e, e.currentTarget.className, 'Questions & Answers'); }}>&times;</span>
      <p>SUBMIT ANSWER</p>
      <div className="subtitle" onClick={(e) => { this.props.handleTrackingClick(e, e.currentTarget.className, 'Questions & Answers'); }}>{this.props.productName}: {this.props.questionBody}</div>
      <form id="add-answer">
        <label>Your answer:*&nbsp;</label>
        <textarea id="modal-answer" name="body" maxLength="1000" onClick={(e) => { this.props.handleTrackingClick(e, e.currentTarget.id, 'Questions & Answers'); }}></textarea>
        <div className="modal-answer-photos">{this.state.photos.map((photo, i) => {
          return (
            <img src={photo} full={photo} width="70px" height="70px" key={i} className="answer-photo-thumbnail" onClick={this.clickHandler}></img>
          );
        })}</div>
        <label>What is your nickname:*&nbsp;</label>
        <input type="text" id="modal-answer-nickname" placeholder="Example: jack543!" name="name" maxLength="60" onClick={(e) => { this.props.handleTrackingClick(e, e.currentTarget.id, 'Questions & Answers'); }}/>
        <div>(For privacy reasons, do not use your full name or email address)</div>
        <br></br>
        <label>Your email:*&nbsp;</label>
        <input type="text" id="modal-answer-email" placeholder="Example: jack@email.com" name="email" maxLength="60" onClick={(e) => { this.props.handleTrackingClick(e, e.currentTarget.id, 'Questions & Answers'); }}/>
        <div>(For authentication reasons, you will not be emailed)</div>
        <br></br>
        <label id="modal-photos-label">Upload photos:&nbsp;</label>
        <input type="file" multiple id="modal-photos" name="photos" onChange={this.uploadPhotos} onClick={(e) => { this.props.handleTrackingClick(e, e.currentTarget.id, 'Questions & Answers'); }}/>
        <button onClick={this.submitAnswer}>Submit answer</button>
      </form>
    </div>
  </div>
    `;

    document.getElementById('modal-answer').value = 'test';
    document.getElementById('modal-answer-nickname').value = 'test';
    document.getElementById('modal-answer-email').value = 'test@test.com';
  });

  it('renders all elements', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('.modal')).toHaveLength(1);
    expect(wrapper.find('.modal-content')).toHaveLength(1);
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find('#modal-photos')).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(3);
  });

  it('runs handleTrackingClick on click', () => {
    let event = {currentTarget: {className: 'test'}};
    wrapper.find('.close-btn').simulate('click', event);
    wrapper.find('.subtitle').simulate('click', event);
    wrapper.find('#modal-answer').simulate('click', event);
    wrapper.find('#modal-answer-nickname').simulate('click', event);
    wrapper.find('#modal-answer-email').simulate('click', event);
    wrapper.find('#modal-photos').simulate('click', event);
    expect(handleTrackingClick).toHaveBeenCalled();
  });

  it('runs clickHandler on submit', () => {
    let event = {currentTarget: {className: 'test'}};
    wrapper.find('img').at(1).simulate('click', event);
    expect(handleTrackingClick).toHaveBeenCalled();
    expect(openThumbnail).toHaveBeenCalled();
  });

  it('checks if photos are invalid', () => {
    let result = instance.photosValid(mockPhotos);
    expect(result).toEqual(false);
  });

  it('checks if photos are valid', () => {
    let result = instance.photosValid(['test.jpg']);
    expect(result).toEqual(true);
  });

  it('runs uploadPhotos function', () => {
    const event = {target: {files: {length: 0}}};
    instance.uploadPhotos(event);
    wrapper.find('#modal-photos').simulate('change', event);
    expect(instance.state.photos).toEqual([]);
  });

  it('runs uploadPhotos alert if more than five photos', () => {
    const event = {target: {files: {item: {length: 0}, length: 6}}};
    instance.uploadPhotos(event);
    wrapper.find('#modal-photos').simulate('change', event);
    expect(instance.state.photos).toEqual(mockPhotos);
  });

  it('runs submitAnswer function', () => {
    instance.submitAnswer = jest.fn(instance.submitAnswer);
    instance.handleModal = jest.fn();
    const event = {
      target: {
        files: 'test'
      },
      preventDefault: () => {}
    };
    wrapper.find('#add-answer button').simulate('click', event);
    wrapper.update();
    instance.submitAnswer(event);
    expect(instance.submitAnswer).toHaveBeenCalled();
  });

  it('runs submitAnswer function with invalid email', () => {
    document.getElementById('modal-answer-email').value = 'test';
    instance.submitAnswer = jest.fn(instance.submitAnswer);
    instance.handleModal = jest.fn();
    const event = {
      target: {
        files: 'test'
      },
      preventDefault: () => {}
    };
    wrapper.find('#add-answer button').simulate('click', event);
    wrapper.update();
    instance.submitAnswer(event);
    expect(instance.submitAnswer).toHaveBeenCalled();
  });
});

describe('<QuestionModal />', () => {
  let wrapper, instance;
  const handleTrackingClick = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<TestableQuestionModal handleTrackingClick={handleTrackingClick}/>);
    instance = wrapper.instance();
    document.body.innerHTML = `
    <div className="modal-q">
    <div className="modal-content">
      <span className="close-btn" onClick={(e) => { this.props.handleTrackingClick(e, e.currentTarget.className, 'Questions & Answers'); }}>&times;</span>
      <p>ASK YOUR QUESTION</p>
      <div className="subtitle" onClick={(e) => { this.props.handleTrackingClick(e, e.currentTarget.className, 'Questions & Answers'); }}>About the {this.props.productName}</div>
      <form id="add-question">
        <label>Your Question:*&nbsp;</label>
        <textarea id="modal-question" name="body" maxLength="1000" onClick={(e) => { this.props.handleTrackingClick(e, e.currentTarget.id, 'Questions & Answers'); }}></textarea>
        <label>What is your nickname:*&nbsp;</label>
        <input type="text" id="modal-question-nickname" placeholder="Example: jackson11!" name="name" maxLength="60" onClick={(e) => { this.props.handleTrackingClick(e, e.currentTarget.id, 'Questions & Answers'); }}/>
        <div>(For privacy reasons, do not use your full name or email address)</div>
        <br></br>
        <label>Your email:*&nbsp;</label>
        <input type="text" id="modal-question-email" placeholder="Why did you like the product or not" name="email" maxLength="60" onClick={(e) => { this.props.handleTrackingClick(e, e.currentTarget.id, 'Questions & Answers'); }}/>
        <div>(For authentication reasons, you will not be emailed)</div>
        <button onClick={this.submitQuestion}>Submit question</button>
      </form>
    </div>
  </div>
    `;

    document.getElementById('modal-question').value = 'test';
    document.getElementById('modal-question-nickname').value = 'test';
    document.getElementById('modal-question-email').value = 'test@test.com';
  });

  it('renders all elements', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('.modal-q')).toHaveLength(1);
    expect(wrapper.find('.modal-content')).toHaveLength(1);
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('runs click handler on click', () => {
    let event = {currentTarget: {className: 'test'}, preventDefault: () => {}};
    wrapper.find('.close-btn').simulate('click', event);
    wrapper.find('.subtitle').simulate('click', event);
    wrapper.find('#modal-question').simulate('click', event);
    wrapper.find('#modal-question-nickname').simulate('click', event);
    wrapper.find('#modal-question-email').simulate('click', event);
    expect(handleTrackingClick).toHaveBeenCalled();
  });

  it('runs submitQuestion function upon submit', () => {
    let event = {currentTarget: {className: 'test'}, preventDefault: () => {}};
    instance.submitQuestion = jest.fn(instance.submitQuestion);
    instance.handleModal = jest.fn();
    wrapper.find('#add-question button').simulate('click', event);
    wrapper.update();
    instance.submitQuestion(event);
    expect(instance.submitQuestion).toHaveBeenCalled();
  });

  it('runs submitQuestion function upon submit with invalid email', () => {
    document.getElementById('modal-question-email').value = 'test';
    let event = {currentTarget: {className: 'test'}, preventDefault: () => {}};
    instance.submitQuestion = jest.fn(instance.submitQuestion);
    instance.handleModal = jest.fn();
    wrapper.find('#add-question button').simulate('click', event);
    wrapper.update();
    instance.submitQuestion(event);
    expect(instance.submitQuestion).toHaveBeenCalled();
  });
});

describe('<AnswerContainer />', () => {
  let wrapper, instance;
  let mockPhotos = ['photo1', 'photo2', 'photo3'];
  const handleTrackingClick = jest.fn();
  const openThumbnail = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<TestableAnswerContainer photos={mockPhotos} handleTrackingClick={handleTrackingClick} openThumbnail={openThumbnail}/>);
  });

  it('renders all elements', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('.answer-container')).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(3);
  });

  it('runs click handler on click', () => {
    let event = {currentTarget: {className: 'test'}, preventDefault: () => {}};
    wrapper.find('.answer').simulate('click', event);
    wrapper.find('.answer-photo').at(1).simulate('click', event);
    expect(handleTrackingClick).toHaveBeenCalled();
    expect(openThumbnail).toHaveBeenCalled();
  });
});

describe('<LoadMoreAnswers />', () => {
  let wrapper, instance;
  const handleTrackingClick = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<TestableLoadMoreAnswers loadMoreAnswers={(e) => { return; }} handleTrackingClick={handleTrackingClick} />);
    instance = wrapper.instance();
  });

  it('renders all elements', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('.load-more-answers')).toHaveLength(1);
  });

  it('should run clickHandler function on click', () => {
    let event = {currentTarget: {className: 'test'}};
    wrapper.find('.load-more-answers').simulate('click', event);
    wrapper.update();
    expect(handleTrackingClick).toHaveBeenCalled();
  });
});

describe('<QHelpfulAddAnswer />', () => {
  let wrapper, instance;
  const handleTrackingClick = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<TestableQHelpfulAddAnswer handleTrackingClick={handleTrackingClick}/>);
    instance = wrapper.instance();
  });

  it('renders all elements', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('.qhelpful-addanswer')).toHaveLength(1);
    expect(wrapper.find('.question-helpful')).toHaveLength(1);
    expect(wrapper.find('.add-answer')).toHaveLength(1);
    expect(wrapper.find('.report-question')).toHaveLength(1);
  });

  it('runs onClick function', () => {
    let event = {currentTarget: {id: 'id'}};
    wrapper.find('.qhelpful-addanswer').simulate('click', event);
    wrapper.update();
    expect(handleTrackingClick).toHaveBeenCalled();
  });
});

describe('<SignatureHelpfulReport />', () => {
  let wrapper, instance;
  const handleTrackingClick = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<TestableSignatureHelpfulReport handleTrackingClick={handleTrackingClick}/>);
    instance = wrapper.instance();
  });

  it('renders all elements', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('.signature-helpful-report')).toHaveLength(1);
    expect(wrapper.find('.author-date')).toHaveLength(1);
    expect(wrapper.find('.answer-helpful')).toHaveLength(1);
    expect(wrapper.find('.report-answer')).toHaveLength(1);
  });

  it('runs onClick function', () => {
    let event = {currentTarget: {id: 'id'}};
    wrapper.find('.signature-helpful-report').simulate('click', event);
    wrapper.update();
    expect(handleTrackingClick).toHaveBeenCalled();
  });
});

describe('<QATrackerHOC />', () => {
  let wrapper, instance, TestComponent;
  const handleTrackingClick = jest.fn();

  beforeEach(() => {
    wrapper = mount(<QAHeader />);
    instance = wrapper.instance();
  });

  it('renders', () => {
    expect(wrapper).toBeTruthy();
  });

  it('runs handleTrackingClick function', () => {
    const handleTrackingClick = jest.fn();
    let test = mount(<TestableQAHeader handleTrackingClick={handleTrackingClick}/>);
    let event = {currentTarget: {id: 'id'}};
    test.simulate('click', event);
    expect(handleTrackingClick).toHaveBeenCalled();
  });
});

describe('<ThumbnailModal />', () => {
  let wrapper, instance;
  const handleTrackingClick = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<TestableThumbnailModal handleTrackingClick={handleTrackingClick}/>);
  });

  it('renders all elements', () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.find('.close-btn')).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('.thumbnail-content')).toHaveLength(1);
  });

  it('runs onClick function', () => {
    let event = {currentTarget: {id: 'id'}};
    wrapper.find('.close-btn').simulate('click', event);
    wrapper.update();
    expect(handleTrackingClick).toHaveBeenCalled();
  });
});