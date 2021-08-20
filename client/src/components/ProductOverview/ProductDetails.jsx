import React, { useState } from 'react';
import { AiOutlineCheck, AiOutlineStar } from 'react-icons/ai';
import Stars from '../Stars/Stars.jsx';
import CustomSelect from './CustomSelect.jsx';
import helpers from '../../helpers.js';
import { map, filter, forEach } from 'lodash';

const ProductDetails = ({ data, methods }) => {
  let price, sizes;
  let reviewCount = 0;
  let reviewAvg = 0;

  if (!data?.selectedStyle.sale_price) {
    price = <p>${data?.selectedStyle.original_price}</p>;
  } else {
    price = (
      <p className='canceled-price'>
        <span>${data?.selectedStyle.original_price}</span>
        <span>${data?.selectedStyle.sale_price}</span>
      </p>
    );
  }

  sizes = filter(
    map(data?.selectedStyle.skus, (sku, key) => {
      return { label: sku.size, value: key, quantity: sku.quantity };
    }),
    size => size.quantity > 0
  );

  sizes.unshift({ label: 'SELECT SIZE', value: '' });

  forEach(data?.reviews.results, review => {
    reviewAvg += parseInt(review.rating);
    reviewCount++;
  });

  reviewAvg /= reviewCount;

  const [open, setOpen] = useState(false);
  const [helpText, setHelpText] = useState('');

  const handleOpen = e => {
    setOpen(true);
  };

  const handleClose = e => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleAddToBag = e => {
    let sku = data?.selectedSku;
    let quantity = data?.selectedQuantity;
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

    methods.addToBag({ sku, quantity });
  };

  return (
    <div id='product-details'>
      <div className='group horizontal' style={{ display: reviewCount > 0 ? 'flex' : 'none' }}>
        <Stars average={reviewAvg} />
        <button className='underlined text' onClick={() => document.getElementById('reviews-section').scrollIntoView({ behavior: 'smooth', block: 'center' })}>
          Read all {reviewCount} reviews
        </button>
      </div>

      <div className='group'>
        <p>{data?.product.category}</p>
        <h1>{data?.product.name}</h1>
      </div>

      <div className='group'>{price}</div>

      <div className='group'>
        <p>
          <b>style &gt;</b>&nbsp;{data?.selectedStyle.name}
        </p>
      </div>

      <div className='group horizontal gapped'>
        {data?.productStyles.results?.map(style => (
          <div className='style-selector-wrapper' key={style.style_id}>
            <div
              className={`style-selector bg-image ${data?.selectedStyle.style_id === style.style_id ? 'selected' : ''}`}
              onClick={() => {
                methods.changeStyle(style.style_id);
              }}
              style={{ backgroundImage: `url(${style.photos[0].thumbnail_url.replace('q=80', 'q=10')})` }}
            >
              <div className='selected-check'>
                <AiOutlineCheck />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div id='help-text' className='red'>
        {helpText}
      </div>

      <div className='group horizontal gapped stretch'>
        <div className='control-wrapper'>
          <div style={{ display: sizes.length > 1 ? 'block' : 'none' }} onClick={handleOpen}>
            <CustomSelect
              handleOpen={handleOpen}
              handleClose={handleClose}
              open={open}
              value={data?.selectedSku?.sku_id || ''}
              options={sizes}
              onChange={e => {
                methods.changeSku(e.target.value);
              }}
            />
          </div>
          <p style={{ display: sizes.length < 1 ? 'block' : 'none' }}>
            <b>OUT OF STOCK</b>
          </p>
        </div>
        <div className='control-wrapper'>
          <CustomSelect
            value={data?.selectedQuantity || 0}
            options={[{ value: 0, label: '-' }].concat(
              helpers.range(1, data?.selectedSku?.quantity <= 15 ? data?.selectedSku?.quantity : 15).map(num => {
                return { value: num, label: num };
              })
            )}
            onChange={e => {
              methods.onChange('selectedQuantity', e.target.value);
            }}
            disabled={!data?.selectedSku || !data?.selectedSku?.quantity}
          />
        </div>
      </div>

      <div className='group horizontal gapped stretch'>
        <div className='control-wrapper button' onClick={handleAddToBag}>
          <p style={{ display: data?.selectedSku?.quantity ? 'flex' : 'none' }} id='add-to-bag'>
            <b>ADD TO BAG</b>
          </p>
        </div>
        <div className='control-wrapper'>
          <AiOutlineStar />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
