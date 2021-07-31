import React, { useState } from 'react';
import { AiOutlineCheck, AiOutlineStar } from 'react-icons/ai';
import Stars from '../Stars/Stars.jsx';
import CustomSelect from './CustomSelect.jsx';
import helpers from '../../helpers.js';


const ProductDetails = (props) => {
  let price, sizes;

  if (!props.selectedStyle.sale_price) {
    price = <p>${props.selectedStyle.original_price}</p>;
  } else {
    price = <p className="canceled-price"><span>${props.selectedStyle.original_price}</span><span>${props.selectedStyle.sale_price}5678</span></p>;
  }

  sizes = _.filter(_.map(props.selectedStyle.skus, (sku, key) => {
    return { label: sku.size, value: key, quantity: sku.quantity };
  }), size => size.quantity > 0);

  sizes.unshift({ label: 'SELECT SIZE', value: '' });


  const [open, setOpen] = useState(false);
  const [helpText, setHelpText] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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

    console.log(sku, quantity);
  };

  return (
    <div id="product-details">
      <div className="group horizontal" style={{ display: props.reviews.count > 0 ? 'flex' : 'none' }}>
        <Stars average={3.3} />
        <button className="underlined text">Read all {props.reviews.count} reviews</button>
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

      <div className="group horizontal gapped stretch">
        <div className="control-wrapper">
          <div style={{ display: sizes.length > 1 ? 'block' : 'none' }}>
            <CustomSelect
              open={open}
              onOpen={handleOpen}
              onClose={handleClose}
              value={props.selectedSku?.sku_id || ''}
              options={sizes}
              onChange={(e) => { props.changeSku(e.target.value); handleClose(); }}
            />
          </div>
          <p style={{ display: sizes.length < 1 ? 'block' : 'none' }} ><b>OUT OF STOCK</b></p>
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
          <p><b>ADD TO CART</b></p>
        </div>
        <div className="control-wrapper">
          <AiOutlineStar />
        </div>
      </div>

      <div id="help-text" className="red">{helpText}</div>
    </div>
  );
};

export default ProductDetails;
