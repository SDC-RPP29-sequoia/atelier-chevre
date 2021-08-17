import API from './ProductOverviewAPIUtils';
import axios from 'axios';
jest.mock('axios');

describe('ProductOverview API', () => {
  it('should return axios response when invoking getProduct', done => {
    const state = {product: { data: {}}};
    axios.get.mockResolvedValue(state);

    API.getProduct('id')
      .then(response => {
        expect(response).toEqual(state);
        expect(axios.get).toHaveBeenCalledWith('/api/products/id');
      })
      .catch(err => console.log(err));
    done();
  });

  it('should return axios response when invoking getProductStyles', done => {
    const state = {productStyles: { data: {}}};
    axios.get.mockResolvedValue(state);

    API.getProductStyles('id')
      .then(response => {
        expect(response).toEqual(state);
        expect(axios.get).toHaveBeenCalledWith('/api/products/id/styles');
      })
      .catch(err => console.log(err));
    done();
  });

  it('should return axios response when invoking getReviews', done => {
    const state = {reviews: { data: {}}};
    axios.get.mockResolvedValue(state);

    API.getReviews('id')
      .then(response => {
        expect(response).toEqual(state);
        expect(axios.get).toHaveBeenCalledWith('/api/reviews/id');
      })
      .catch(err => console.log(err));
    done();
  });
});