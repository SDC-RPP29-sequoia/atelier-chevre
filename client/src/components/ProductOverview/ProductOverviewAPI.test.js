import API from './ProductOverviewAPIUtils';
import axios from 'axios';
jest.mock('axios');

describe('API methods', () => {

  it('should return axios response when invoking getProduct', done => {
    let product = {
      campus: '',
      category: '',
      created_at: '',
      default_price: '',
      description: '',
      features: [],
      id: 0,
      name: '',
      slogan: '',
      updated_at: ''
    };

    axios.get.mockResolvedValue(product);

    API.getProduct('id')
      .then(response => {
        expect(res).toEqual(product);
      });
    done();
  });
});