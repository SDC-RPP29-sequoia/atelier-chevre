import React from 'react';
import { shallow, mount } from 'enzyme';
import { jest } from '@jest/globals';
import API from './ProductOverviewAPIUtils.js';

import CustomSelect from './CustomSelect.jsx';
import ProductDetails from './ProductDetails.jsx';
import ProductExtra from './ProductExtra.jsx';
import ProductImage from './ProductImage.jsx';
import ProductOverview from './ProductOverview.jsx';

let productIdTest = 28215;

describe('ProductOverview component', () => {
  let productOverviewWrapper,
    productOverviewInstance,
    productImageWrapper,
    productDetailsWrapper,
    productExtraWrapper,
    customSelectWrapper;

  beforeEach(() => {
    productOverviewWrapper = shallow(<ProductOverview productId="28216" />);
    productOverviewInstance = productOverviewWrapper.instance();

    productImageWrapper = shallow(<ProductImage currentImageUrl={productOverviewInstance.state.currentImageUrl} images={productOverviewInstance.state.images} toggleFullScreen={productOverviewInstance.toggleFullScreen} switchImage={productOverviewInstance.switchImage} onChange={productOverviewInstance.onChange} />);
    productDetailsWrapper = shallow(<ProductDetails addToBag={productOverviewInstance.props.addToBag} reviews={productOverviewInstance.state.reviews} product={productOverviewInstance.state.product} productStyles={productOverviewInstance.state.productStyles} selectedSku={productOverviewInstance.state.selectedSku} onChange={productOverviewInstance.onChange} selectedStyle={productOverviewInstance.state.selectedStyle} changeSku={productOverviewInstance.changeSku} productStyles={productOverviewInstance.state.productStyles} changeStyle={productOverviewInstance.changeStyle} selectedQuantity={productOverviewInstance.state.selectedQuantity} />);
    productExtraWrapper = shallow(<ProductExtra />);
    customSelectWrapper = shallow(<CustomSelect />);
  });

  it('renders without crashing', done => {
    expect(productOverviewWrapper).toBeTruthy();
    done();
  });

  it('renders each section of the overview', done => {
    expect(productOverviewWrapper.find('#announcement-banner')).toHaveLength(1);
    expect(productOverviewWrapper.find('#product-main')).toHaveLength(1);
    expect(productOverviewWrapper.find('#product-extra')).toHaveLength(1);
    done();
  });

  it('renders each custom child component', done => {
    expect(productDetailsWrapper).toBeTruthy();
    expect(productImageWrapper).toBeTruthy();
    expect(customSelectWrapper).toBeTruthy();
    expect(productExtraWrapper).toBeTruthy();

    expect(productDetailsWrapper.find('#product-details')).toBeTruthy();
    expect(productImageWrapper.find('#product-image')).toBeTruthy();
    expect(productExtraWrapper.find('#product-extra')).toBeTruthy();
    done();
  });

  it('renders product image controls', done => {
    expect(productImageWrapper.find('#image-list')).toHaveLength(1);
    expect(productImageWrapper.find('#images')).toHaveLength(1);
    expect(productImageWrapper.find('#fullscreen-toggle')).toHaveLength(1);
    expect(productImageWrapper.find('#image-arrows')).toHaveLength(1);
    done();
  });

  it('renders product details information groups', done => {
    expect(productDetailsWrapper.find('.group')).toHaveLength(7);
    done();
  });

  it('renders size and quantity custom selects', done => {
    expect(productDetailsWrapper.find(CustomSelect)).toHaveLength(2);
    done();
  });

  it('renders product extra info', done => {
    expect(productExtraWrapper.find('#product-description')).toHaveLength(1);
    expect(productExtraWrapper.find('#product-features')).toHaveLength(1);
    done();
  });
});

describe('ProductOverview API', () => {
});