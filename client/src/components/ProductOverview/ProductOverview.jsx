import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineCheck, AiOutlineStar } from 'react-icons/ai';
import { MdFullscreen } from 'react-icons/md';
import API from './ProductOverviewAPIUtils.js';
import _ from 'lodash';
import helpers from '../../helpers.js';

import Stars from '../Stars/Stars.jsx';
import CustomSelect from './CustomSelect.jsx';

import '../../styles.scss';
import './ProductOverview.scss';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      productStyles: {},
      selectedStyle: '',
      selectedSku: '',
      reviews: [],
      images: [],
      currentImageUrl: '',
      fullscreen: false
    };

    this.onChange = this.onChange.bind(this);
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
          selectedSku: skus[0],
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
      selectedSku: sku
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
      selectedSku: skus[0],
      images: [...style.photos],
      currentImageUrl: style.photos[0].url
    });

    console.log(this.state.images);
  }

  switchImage(direction) {
    let currentInd;
    this.state.images.forEach((image, ind) => {
      if (image.url === this.state.currentImageUrl) {
        currentInd = ind;
      }
    });

    this.setState({
      currentImageUrl: this.state.images[direction === 'next' ? 'nextItem' : 'previousItem'](currentInd).url
    });
  }

  toggleFullScreen() {
    this.setState({
      fullscreen: !this.state.fullscreen
    });
  }

  render() {
    let price;

    if (!this.state.selectedStyle.sale_price) {
      price = <p>${this.state.selectedStyle.original_price}</p>;
    } else {
      price = <p className="canceled-price"><span>${this.state.selectedStyle.original_price}</span><span>${this.state.selectedStyle.sale_price}5678</span></p>;
    }

    return (
      <div id="product-overview">
        <div id="announcement-banner">
          <p className="light"><i>Site-wide announcement message!</i> -- sale / discount <b>offer</b> -- <u>new product highlight</u></p>
        </div>

        <div id="product-main" className={`${this.state.fullscreen ? 'fullscreen' : ''}`}>
          <div id="product-image" className="bg-image" style={{ backgroundImage: `url(${this.state.currentImageUrl})` }}>
            <div id="image-list">
              {this.state.images?.map(photo => (
                <div
                  className="image bg-image"
                  style={{ backgroundImage: `url(${photo.url})` }}
                  onClick={() => { this.onChange('currentImageUrl', photo.url); }}
                  key={photo.url}
                ></div>
              ))}
            </div>

            <div id="image-controls">
              <div id="fullscreen-toggle">
                <MdFullscreen
                  className="clickable"
                  onClick={() => { this.toggleFullScreen(); }}
                />
              </div>

              <div id="image-arrows">
                <AiOutlineArrowLeft
                  className="clickable"
                  onClick={() => this.switchImage('prev')}
                />
                <AiOutlineArrowRight
                  className="clickable"
                  onClick={() => this.switchImage('next')}
                />
              </div>
            </div>
          </div>

          <div id="product-details">
            <div className="group horizontal" style={{ display: this.state.reviews.count > 0 ? 'flex' : 'none' }}>
              <Stars average={3.3} />
              <button className="underlined text">Read all {this.state.reviews.count} reviews</button>
            </div>

            <div className="group">
              <p>{this.state.product.category}</p>
              <h1>{this.state.product.name}</h1>
            </div>

            <div className="group">
              {price}
            </div>

            <div className="group">
              <p><b>style &gt;</b>&nbsp;{this.state.selectedStyle.name}</p>
            </div>

            <div className="group horizontal gapped">
              {this.state.productStyles.results?.map(style => (
                <div className="style-selector-wrapper">
                  <div
                    className={`style-selector bg-image ${this.state.selectedStyle.style_id === style.style_id ? 'selected' : ''}`}
                    onClick={() => { this.changeStyle(style.style_id); }}
                    style={{ backgroundImage: `url(${style.photos[0].thumbnail_url})` }}
                    key={style.style_id}
                  >
                    <div className="selected-check">
                      <AiOutlineCheck />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="group horizontal gapped stretch">
              <div className="control-wrapper">
                <CustomSelect
                  value={this.state.selectedSku.sku_id || ''}
                  options={
                    _.map(this.state.selectedStyle.skus, (sku, key) => {
                      return { label: sku.size, value: key };
                    })
                  }
                  onChange={(e) => { this.changeSku(e.target.value); }}
                />
              </div>
              <div className="control-wrapper">
                <CustomSelect value={1} options={[{ value: 1, label: '1' }]} />
              </div>
            </div>

            <div className="group horizontal gapped stretch">
              <div className="control-wrapper">
                <p><b>ADD TO BAG</b></p>
              </div>
              <div className="control-wrapper">
                <AiOutlineStar />
              </div>
            </div>
          </div>
        </div>

        <div id="product-extra">
          <div id="product-description">
            <h4 id="description-title">Product slogan or catchphrase...</h4>
            <p id="description">Spicy jalapeno bacon ipsum dolor amet burgdoggen pork belly esse bacon, bresaola strip steak ut drumstick eiusmod chicken flank ea sed. Laboris corned beef aliqua sausage pancetta ball tip rump bacon qui spare ribs nostrud. Hamburger beef incididunt, cow fugiat do prosciutto pastrami filet mignon pancetta deserunt lorem sausage <br /><br />andouille picanha. Ham cupidatat ipsum, spare ribs esse velit kielbasa magna in doner cupim. Dolore reprehenderit adipisicing ullamco.

              Short loin dolore cow laborum culpa velit nostrud irure.  Qui pork loin nisi bresaola cillum anim pig salami dolore nostrud.</p>
          </div>
          <div id="product-features">
            <div className="feature">
              <div className="check">
                <AiOutlineCheck />
              </div>
              <p>GMO and Pesticide-free</p>
            </div>

            <div className="feature">
              <div className="check">
                <AiOutlineCheck />
              </div>
              <p>Made with 100% genetic modification</p>
            </div>

            <div className="feature">
              <div className="check">
                <AiOutlineCheck />
              </div>
              <p>This is made up</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductOverview;