import React, { useState } from 'react';
import { AiOutlineCheck, AiOutlineStar } from 'react-icons/ai';
import Stars from '../Stars/Stars.jsx';
import CustomSelect from './CustomSelect.jsx';
import helpers from '../../helpers.js';
import { map, filter, forEach } from 'lodash';


const ProductDetails = (props) => {
  let price, sizes;
  let reviewCount = 0;
  let reviewAvg = 0;

  if (!props.selectedStyle.sale_price) {
    price = <p>${props.selectedStyle.original_price}</p>;
  } else {
    price = <p className="canceled-price"><span>${props.selectedStyle.original_price}</span><span>${props.selectedStyle.sale_price}</span></p>;
  }

  sizes = filter(map(props.selectedStyle.skus, (sku, key) => {
    return { label: sku.size, value: key, quantity: sku.quantity };
  }), size => size.quantity > 0);

  sizes.unshift({ label: 'SELECT SIZE', value: '' });

  forEach(props.reviews.ratings, (numRatings, rating) => {
    for (let i = 0; i < parseInt(numRatings); i++) {
      reviewAvg += parseInt(rating);
      reviewCount++;
    }
  });

  reviewAvg /= reviewCount;

  const [open, setOpen] = useState(false);
  const [helpText, setHelpText] = useState('');

  const handleOpen = (e) => {
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleAddToBag = (e) => {
    let sku = props.selectedSku;
    let quantity = props.selectedQuantity;
    let ht;

    if (!sku) {
      ht = 'Please select a size.';
      handleOpen();
    } else if (!quantity) {
      ht = 'Please select a valid quantity.';
    } else {
      ht = '';
    }

    setHelpText(ht);

    props.addToBag({ sku, quantity });
  };

  return (
    <div id="product-details">
      <div className="group horizontal" style={{ display: reviewCount > 0 ? 'flex' : 'none' }}>
        <Stars average={reviewAvg} />
        <button
          className="underlined text"
          onClick={() => document.getElementById('reviews-section').scrollIntoView({ behavior: 'smooth', block: 'center' })}
        >Read all {reviewCount} reviews</button>
      </div>

      <div className="group">
        <p>{props.product.category}</p>
        <h1>{props.product.name}</h1>
      </div>

      <div className="group">
        {price}
      </div>

      <div className="group">
        <p><b>style &gt;</b>&nbsp;{props.selectedStyle.name}</p>
      </div>

      <div className="group horizontal gapped">
        {props.productStyles.results?.map(style => (
          <div className="style-selector-wrapper" key={style.style_id}>
            <div
              className={`style-selector bg-image ${props.selectedStyle.style_id === style.style_id ? 'selected' : ''}`}
              onClick={() => { props.changeStyle(style.style_id); }}
              style={{ backgroundImage: `url(${style.photos[0].thumbnail_url})` }}
            >
              <div className="selected-check">
                <AiOutlineCheck />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div id="help-text" className="red">{helpText}</div>

      <div className="group horizontal gapped stretch">
        <div className="control-wrapper">
          <div style={{ display: sizes.length > 1 ? 'block' : 'none' }} onClick={handleOpen}>
            <CustomSelect
              handleOpen={handleOpen}
              handleClose={handleClose}
              open={open}
              value={props.selectedSku?.sku_id || ''}
              options={sizes}
              onChange={(e) => { props.changeSku(e.target.value); }}
            />
          </div>
          <p style={{ display: sizes.length < 1 ? 'block' : 'none' }}><b>OUT OF STOCK</b></p>
        </div>
        <div className="control-wrapper">
          <CustomSelect
            value={props.selectedQuantity || 0}
            options={
              [{ value: 0, label: '-' }].concat(helpers.range(1, props.selectedSku?.quantity <= 15 ? props.selectedSku?.quantity : 15).map(num => {
                return { value: num, label: num };
              }))
            }
            onChange={(e) => { props.onChange('selectedQuantity', e.target.value); }}
            disabled={!props.selectedSku || !props.selectedSku?.quantity}
          />
        </div>
      </div>

      <div className="group horizontal gapped stretch">
        <div className="control-wrapper button" onClick={handleAddToBag}>
          <p style={{ display: props.selectedSku?.quantity ? 'flex' : 'none' }} id="add-to-bag"><b>ADD TO BAG</b></p>
        </div>
        <div className="control-wrapper">
          <AiOutlineStar />
        </div>
      </div>
    </div >
  );
};

export default ProductDetails;
