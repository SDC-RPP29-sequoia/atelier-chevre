/**
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { jest } from '@jest/globals';
import API from './ProductOverviewAPIUtils.js';

import CustomSelect from './CustomSelect.jsx';
import ProductDetails from './ProductDetails.jsx';
import ProductExtra from './ProductExtra.jsx';
import ProductImage from './ProductImage.jsx';
import ProductOverview from './ProductOverview.jsx';
import ClickTracker from './ClickTracker.jsx';
import _mockData from './__mocks__/_mockData';

let productIdTest = 36300;

describe('ProductOverview component', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = mount(<ProductOverview productId={productIdTest} />);
    instance = wrapper.instance();

    instance.setState(_mockData);
  });

  it('renders without crashing', done => {
    expect(wrapper).toBeTruthy();
    done();
  });

  it('renders each section of the overview', done => {
    expect(wrapper.find('#announcement-banner')).toBeTruthy();
    expect(wrapper.find('#product-main')).toBeTruthy();
    expect(wrapper.find('#product-extra')).toBeTruthy();
    done();
  });

  it('renders each custom child component', done => {
    expect(wrapper.find(ProductDetails)).toBeTruthy();
    expect(wrapper.find(ProductImage)).toBeTruthy();
    expect(wrapper.find(ProductExtra)).toBeTruthy();
    done();
  });

  it('should have state', done => {
    expect(wrapper.state()).toHaveProperty('product');
    expect(wrapper.state()).toHaveProperty('productStyles');
    expect(wrapper.state()).toHaveProperty('selectedStyle');
    expect(wrapper.state()).toHaveProperty('selectedSku');
    expect(wrapper.state()).toHaveProperty('reviews');
    expect(wrapper.state()).toHaveProperty('images');
    expect(wrapper.state()).toHaveProperty('fullscreen');
    expect(wrapper.state()).toHaveProperty('selectedQuantity');
    done();
  });

  it('should change SKU', done => {
    instance.changeSku('1242306');

    wrapper.update();

    expect(wrapper.state().selectedSku).toHaveProperty('quantity', 4);
    expect(wrapper.state().selectedSku).toHaveProperty('size', 'XL');
    expect(wrapper.state().selectedSku).toHaveProperty('sku_id', '1242306');
    done();
  });

  it('should change style', done => {
    instance.changeStyle(214501);
    wrapper.update();

    let style = _mockData.productStyles.results.find(style => style.style_id === 214501);

    expect(wrapper.state().selectedStyle).toEqual(style);
    expect(wrapper.state().selectedSku).toEqual(null);
    expect(wrapper.state().images).toEqual([...style.photos]);
    expect(wrapper.state().currentImageUrl).toEqual(style.photos[0].url);
    expect(wrapper.state().selectedQuantity).toEqual(0);
    done();
  });

  it('should toggle fullscreen', done => {
    expect(wrapper.state().fullscreen).toEqual(false);

    instance.toggleFullScreen();
    wrapper.update();

    expect(wrapper.state().fullscreen).toEqual(true);

    instance.toggleFullScreen();
    wrapper.update();

    expect(wrapper.state().fullscreen).toEqual(false);
    done();
  });

  it('tracks clicks', done => {
    let HOC = ClickTracker(wrapper);
    let HOCWrapper = shallow(<HOC />);
    let HOCInstance = HOCWrapper.instance();

    let mock = jest.spyOn(HOCInstance, 'clickHandler');

    expect(HOCWrapper.find('.click-tracker')).toBeTruthy();
    HOCWrapper.find('.click-tracker').simulate('click', { target: { value: 1 }});
    mock({ target: { value: 1 }});

    expect(mock).toHaveBeenCalled();
    done();
  });
});

describe('ProductImage component', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = mount(
      <ProductImage
        currentImageUrl={_mockData.images[0].url}
        images={_mockData.images}
        toggleFullScreen={() => {}}
        switchImage={() => {}}
        onChange={() => {}}
        fullscreen={false}
      />
    );
    instance = wrapper.instance();
  });

  it('renders without crashing', done => {
    expect(wrapper).toBeTruthy();
    done();
  });

  it('renders each section', done => {
    expect(wrapper.find('#image-list')).toBeTruthy();
    expect(wrapper.find('#images')).toBeTruthy();
    expect(wrapper.find('.image-alt-scroll')).toHaveLength(2);
    expect(wrapper.find('#image-controls')).toBeTruthy();
    expect(wrapper.find('#image-arrows')).toBeTruthy();
    done();
  });

  it('switches image', done => {
    wrapper.find('.alt-image').last().simulate('click');
    wrapper.update();

    expect(wrapper.find('.selected')).toHaveLength(1);
    done();
  });

  it('calls handleImageClick', done => {
    wrapper.setProps({ fullscreen: true });

    wrapper.find('#product-image').simulate('click');
    wrapper.update();

    expect(wrapper.props().fullscreen).toEqual(true);
    done();
  });
});
