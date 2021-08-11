import API from './ReviewsAPIUtils';
import axios from 'axios';
jest.mock('axios');

describe('API Utilities', () => {

  it('should return axios response when invoking getProductReviews', done => {
    const reviews = {reviews: []};
    axios.get.mockResolvedValue(reviews);

    API.getProductReviews('id', 'sort')
      .then(response => {
        expect(response).toEqual(reviews);
        expect(axios.get).toHaveBeenCalledWith('/api/reviews/id/sort');
      });
    done();
  });

  it('should return axios response when invoking getProductReviewsMeta', done => {
    const reviews = {reviews: []};
    axios.get.mockResolvedValue(reviews);

    API.getProductReviewsMeta('id')
      .then(response => {
        expect(response).toEqual(reviews.data);
        expect(axios.get).toHaveBeenCalledWith('/api/reviews/id');
      });
    done();
  });


  it('should return axios response when invoking sendHelpful', done => {
    const reviews = {reviews: []};
    axios.put.mockResolvedValue(reviews);

    API.sendHelpful('id')
      .then(response => {
        expect(response).toEqual(reviews);
      });
    done();
  });


  it('should return axios response when invoking reportReview', done => {
    const reviews = {reviews: []};
    axios.put.mockResolvedValue(reviews);

    API.reportReview('id')
      .then(response => {
        expect(response).toEqual(reviews);
      });
    done();
  });

  it('should return axios response when invoking submitFormData', done => {
    const reviews = {reviews: []};
    axios.post.mockResolvedValue(reviews);

    API.submitFormData({}, {})
      .then(response => {
        expect(response).toEqual(reviews);
      });
    done();
  });


  it('should return axios response when invoking sendClickData', done => {
    const reviews = {reviews: []};
    axios.post.mockResolvedValue(reviews);

    API.sendClickData()
      .then(response => {
        expect(response).toEqual(reviews);
      });
    done();
  });

});