import React, { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { MdFullscreen } from 'react-icons/md';

const ProductImage = (props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [firstImageInd, setFirstImageInd] = useState(0);
  const imagesRef = React.createRef();

  const switchImage = (direction) => {
    if (direction === 'prev') {
      setCurrentImageIndex(currentImageIndex - 1);
      if (currentImageIndex <= firstImageInd) {
        scroll('up');
      }
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
      if (currentImageIndex >= firstImageInd + 6) {
        scroll('down');
      }
    }
  };

  const scroll = (direction) => {
    if (direction === 'down') {
      setFirstImageInd(firstImageInd + 1);
      imagesRef.current.scrollTop += 72;
    } else {
      setFirstImageInd(firstImageInd - 1);
      imagesRef.current.scrollTop -= 72;
    }
  };


  return (
    <div id="product-image" className="bg-image" style={{ backgroundImage: props.images[currentImageIndex]?.url ? `url(${props.images[currentImageIndex]?.url})` : 'none' }}>
      <div id="image-list">
        <div className="image-alt-scroll up" style={{ color: firstImageInd === 0 ? 'transparent' : '#454545' }}>
          <AiOutlineUp
            className="clickable"
            onClick={() => scroll('up')}
          />
        </div>
        <div id="images" ref={imagesRef}>
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
        <div className="image-alt-scroll down" style={{ color: firstImageInd > props.images.length - 6 ? 'transparent' : '#454545' }}>
          <AiOutlineDown
            className="clickable"
            onClick={() => scroll('down')}
          />
        </div>
      </div>

      <div id="image-controls">
        <div id="fullscreen-toggle">
          <MdFullscreen
            className="clickable"
            onClick={() => { props.toggleFullScreen(); }}
          />
        </div>

        <div id="image-arrows">
          <div>
            <AiOutlineArrowLeft
              className="clickable"
              onClick={() => switchImage('prev')}
              style={{ display: currentImageIndex > 0 ? 'block' : 'none' }}
            />
          </div>
          <div>
            <AiOutlineArrowRight
              className="clickable"
              onClick={() => switchImage('next')}
              style={{ display: currentImageIndex !== props.images.length - 1 ? 'block' : 'none' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImage;