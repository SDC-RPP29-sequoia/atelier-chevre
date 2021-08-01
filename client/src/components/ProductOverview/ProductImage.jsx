import React, { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { MdFullscreen } from 'react-icons/md';

const ProductImage = (props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const switchImage = (direction) => {
    if (direction === 'prev') {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div id="product-image" className="bg-image" style={{ backgroundImage: `url(${props.images[currentImageIndex]?.url})` }}>
      <div id="image-list">
        {props.images?.map((photo, ind) => (
          <div className={`${ind === currentImageIndex ? 'selected' : ''}`}>
            <div
              className="alt-image bg-image"
              style={{ backgroundImage: `url(${photo.thumbnail_url})` }}
              onClick={() => { setCurrentImageIndex(ind); }}
              key={photo.url}
            ></div>
            <div className="bottom-line">
            </div>
          </div>
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
            onClick={() => switchImage('prev')}
          />
          <AiOutlineArrowRight
            className="clickable"
            onClick={() => switchImage('next')}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImage;