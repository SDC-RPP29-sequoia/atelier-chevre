import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineCheck, AiOutlineStar } from 'react-icons/ai';
import { MdFullscreen } from 'react-icons/md';
import API from './ProductOverviewAPIUtils.js';

import Stars from '../Stars/Stars.jsx';
import CustomSelect from './CustomSelect.jsx';

import '../../styles.scss';
import './ProductOverview.scss';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      productStyles: {}
    };
  }

  componentDidMount() {
    API.getProduct(this.props.productId)
      .then(response => {
        this.setState({
          product: response
        });
      })
      .catch(err => {
        console.error(err);
      });

    API.getProductStyles(this.props.productId)
      .then(response => {
        this.setState({
          productStyles: response
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div id="product-overview">
        <div id="announcement-banner">
          <p className="light"><i>Site-wide announcement message!</i> -- sale / discount <b>offer</b> -- <u>new product highlight</u></p>
        </div>

        <div id="product-main">
          <div id="product-images">
            <div id="image-list">
              <div className="image"></div>
              <div className="image"></div>
              <div className="image"></div>
              <div className="image"></div>
              <div className="image"></div>
            </div>

            <div id="image-controls">
              <div id="fullscreen-toggle">
                <MdFullscreen className="clickable" />
              </div>

              <div id="image-arrows">
                <AiOutlineArrowLeft className="clickable" />
                <AiOutlineArrowRight className="clickable" />
              </div>
            </div>
          </div>

          <div id="product-details">
            <div className="group horizontal">
              <Stars average={3.3} />
              <button className="underlined text">Read all reviews</button>
            </div>

            <div className="group">
              <p>category</p>
              <h1>Expanded Product Name</h1>
            </div>

            <div className="group">
              <p>$369</p>
            </div>

            <div className="group">
              <p><b>style &gt;</b> selected style</p>
            </div>

            <div className="group horizontal gapped">
              <div className="style-selector">
                <div className="selected-check">
                  <AiOutlineCheck />
                </div>
              </div>
              <div className="style-selector"></div>
              <div className="style-selector"></div>
              <div className="style-selector"></div>
              <div className="style-selector"></div>
              <div className="style-selector"></div>
              <div className="style-selector"></div>
              <div className="style-selector"></div>
            </div>

            <div className="group horizontal gapped stretch">
              <div className="control-wrapper">
                <CustomSelect value={1} options={[{ value: 1, label: 'SELECT STYLE' }]} />
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