import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

const ProductExtra = (props) => (
  <div id="product-extra">
    <div id="product-description">
      <h4 id="description-title">{props.product?.slogan}</h4>
      <p id="description">{props.product?.description}</p>
    </div>
    <div id="product-features">

      {props.product?.features?.map(feature => (
        <div className="feature">
          <div className="check">
            <AiOutlineCheck />
          </div>
          <p>{feature.value}</p>
        </div>
      ))}

    </div>
  </div>
);

export default ProductExtra;