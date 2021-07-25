import React from 'react';
import ProductOverview from './ProductOverview.jsx';
import { shallow } from 'enzyme';
import { jest } from '@jest/globals';
import API from './ProductOverviewAPIUtils.js';

let productIdTest = 28215;

describe('ProductOverview component', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<ProductOverview productId={productIdTest} />);
    instance = wrapper.instance();
  });

  it('renders without crashing', done => {
    expect(wrapper).toBeTruthy();
    done();
  });

  // it('gets data from the API', async () => {
  //   let product = await API.getProduct(productIdTest);
  //   let productStyles = await API.getProductStyles(productIdTest);

  //   expect(product.name).toEqual('Slacker\'s Slacks');
  //   expect(productStyles.results.find(result => result.style_id === 162348).name).toEqual('Black');

  //   return Promise.all([product, productStyles]);
  // });
});