import React from 'react';
import './ProductOverview.scss';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="product-overview">
        <div id="announcement-banner">
        </div>

        <div id="product-main">
          <div id="product-images"></div>
          <div id="product-details"></div>
        </div>

        <div id="product-extra">
          <div id="product-description"></div>
          <div id="product-features"></div>
        </div>
      </div>
    );
  }
}