import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { MdFullscreen } from 'react-icons/md';

const ProductImage = (props) => (
  <div id="product-image" className="bg-image" style={{ backgroundImage: `url(${props.currentImageUrl})` }}>
    <div id="image-list">
      {props.images?.map(photo => (
        <div
          className="image bg-image"
          style={{ backgroundImage: `url(${photo.url})` }}
          onClick={() => { props.onChange('currentImageUrl', photo.url); }}
          key={photo.url}
        ></div>
      ))}
    </div>

    <div id="image-controls">
      <div id="fullscreen-toggle">
        <MdFullscreen
          className="clickable"
          onClick={() => { props.toggleFullScreen(); }}
        />
      </div>

      <div id="image-arrows">
        <AiOutlineArrowLeft
          className="clickable"
          onClick={() => props.switchImage('prev')}
        />
        <AiOutlineArrowRight
          className="clickable"
          onClick={() => props.switchImage('next')}
        />
      </div>
    </div>
  </div>
);

export default ProductImage;