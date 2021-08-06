import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineCheck, AiOutlineStar } from 'react-icons/ai';
import { MdFullscreen } from 'react-icons/md';
import API from './ProductOverviewAPIUtils.js';
import _ from 'lodash';
import helpers from '../../helpers.js';

import Stars from '../Stars/Stars.jsx';
import CustomSelect from './CustomSelect.jsx';
import ProductImage from './ProductImage.jsx';
import ProductDetails from './ProductDetails.jsx';
import ProductExtra from './ProductExtra.jsx';

import '../../styles.scss';
import './ProductOverview.scss';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      productStyles: {},
      selectedStyle: '',
      selectedSku: null,
      reviews: {},
      images: [],
      fullscreen: false,
      selectedQuantity: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.changeSku = this.changeSku.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }

  async componentDidMount() {
    await API.getProduct(this.props.productId)
      .then(response => {
        this.setState({
          product: response
        });
      })
      .catch(err => {
        console.error(err);
      });

    await API.getProductStyles(this.props.productId)
      .then(response => {
        let defaultStyle = response.results.find(result => result['default?'] === true);
        let skus = _.map(defaultStyle.skus, (sku, key) => {
          sku.sku_id = key;
          return sku;
        });

        this.setState({
          productStyles: response,
          selectedStyle: defaultStyle,
          selectedSku: null,
          images: defaultStyle.photos,
          currentImageUrl: defaultStyle.photos[0].url
        });
      })
      .catch(err => {
        console.error(err);
      });

    await API.getReviews(this.props.productId)
      .then(response => {
        this.setState({
          reviews: response
        });
      })
      .catch(err => {
        console.error(err);
      });

    console.log(this.state);
  }

  onChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  changeSku(skuId) {
    let sku = _.map(this.state.selectedStyle.skus, (sku, key) => {
      sku.sku_id = key;
      return sku;
    })
      .find(sku => sku.sku_id === skuId);

    this.setState({
      selectedSku: sku,
      selectedQuantity: sku?.quantity > 0 ? 1 : ''
    });
  }

  changeStyle(styleId) {
    let style = this.state.productStyles.results.find(result => result.style_id === styleId);
    let skus = _.map(style.skus, (sku, key) => {
      sku.sku_id = key;
      return sku;
    });

    this.setState({
      selectedStyle: style,
      selectedSku: null,
      images: [...style.photos],
      currentImageUrl: style.photos[0].url,
      selectedQuantity: 0
    });
  }

  toggleFullScreen() {
    this.setState({
      fullscreen: !this.state.fullscreen
    });
  }

  render() {
    console.log('Product Overview was rendered');
    return (
      <div id="product-overview">
        <div id="announcement-banner">
          <p className="light"><i>Site-wide announcement message!</i> -- sale / discount <b>offer</b> -- <u>new product highlight</u></p>
        </div>

        <div id="product-main" className={`${this.state.fullscreen ? 'fullscreen' : ''}`}>
          <ProductImage currentImageUrl={this.state.currentImageUrl} images={this.state.images} toggleFullScreen={this.toggleFullScreen} switchImage={this.switchImage} onChange={this.onChange} />
          <ProductDetails addToBag={this.props.addToBag} reviews={this.state.reviews} product={this.state.product} productStyles={this.state.productStyles} selectedSku={this.state.selectedSku} onChange={this.onChange} selectedStyle={this.state.selectedStyle} changeSku={this.changeSku} productStyles={this.state.productStyles} changeStyle={this.changeStyle} selectedQuantity={this.state.selectedQuantity} />
        </div>

        <div id="product-extra">
          <ProductExtra product={this.state.product}/>
        </div>
      </div>
    );
  }
}

export default ProductOverview;