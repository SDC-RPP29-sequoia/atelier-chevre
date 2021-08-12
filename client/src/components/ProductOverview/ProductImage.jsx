import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDown, AiOutlineUp, AiOutlineBorder, AiOutlineMinusSquare } from 'react-icons/ai';
import { MdFullscreen } from 'react-icons/md';

const ProductImage = props => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [firstImageInd, setFirstImageInd] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const imagesRef = React.createRef();

  const switchImage = direction => {
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

  const scroll = direction => {
    if (direction === 'down') {
      setFirstImageInd(firstImageInd + 1);
      imagesRef.current.scrollTop += 72;
    } else {
      setFirstImageInd(firstImageInd - 1);
      imagesRef.current.scrollTop -= 72;
    }
  };

  const handleImageclick = e => {
    let current = e.target;
    let elements = [current];

    while (current.parentElement) {
      elements.push(current.parentElement.id);
      current = current.parentElement;
    }

    if (elements.includes('image-list')) {
      return;
    }
    if (elements.includes('image-arrows')) {
      return;
    }
    if (elements.includes('fullscreen-toggle')) {
      return;
    }

    document.body.style.height = 'auto';
    document.body.style.overflowY = 'scroll';

    if (!props.fullscreen) {
      props.toggleFullScreen();
    } else {
      setZoomed(!zoomed);

      if (!zoomed) {
        document.body.style.height = '100vh';
        document.body.style.overflowY = 'hidden';

        const img = document.querySelector('#product-image');

        img.addEventListener('mousemove', e => {
          let width = parseInt(window.getComputedStyle(document.querySelector('#product-image')).getPropertyValue('width'));
          let height = parseInt(window.getComputedStyle(document.querySelector('#product-image')).getPropertyValue('height'));

          img.style.setProperty('--x', width * 2.5 - e.pageX + 'px');
          img.style.setProperty('--y', height * 2.5 - e.pageY + 'px');
        });
      }
    }
  };

  return (
    <div
      id='product-image'
      className={`bg-image ${props.fullscreen ? 'fullscreen' : ''} ${zoomed ? 'zoomed' : ''}`}
      style={{ backgroundImage: props.images[currentImageIndex]?.url ? `url(${props.images[currentImageIndex]?.url})` : 'none' }}
      onClick={handleImageclick}
    >
      <div id='image-list' className={`${props.fullscreen ? 'collapsed' : ''}`} styld={{ display: zoomed ? 'none' : 'flex' }}>
        <div className='image-alt-scroll up' style={{ color: firstImageInd === 0 ? 'transparent' : '#454545' }}>
          <AiOutlineUp className='clickable' onClick={() => scroll('up')} />
        </div>
        <div id='images' ref={imagesRef}>
          {props.images?.map((photo, ind) => (
            <div className={`${ind === currentImageIndex ? 'selected' : ''}`} key={photo.url}>
              <div
                className='alt-image bg-image'
                style={{ backgroundImage: `url(${photo.thumbnail_url})` }}
                onClick={() => {
                  setCurrentImageIndex(ind);
                }}
                key={photo.url}
              ></div>
              <AiOutlineBorder
                className='image-icon'
                onClick={() => {
                  setCurrentImageIndex(ind);
                }}
              />
              <AiOutlineMinusSquare className='selected-image-icon' />
              <div className='bottom-line'></div>
            </div>
          ))}
        </div>
        <div className='image-alt-scroll down' style={{ color: firstImageInd > props.images.length - 6 ? 'transparent' : '#454545' }}>
          <AiOutlineDown className='clickable' onClick={() => scroll('down')} />
        </div>
      </div>

      <div id='image-controls'>
        <div id='fullscreen-toggle'>
          <MdFullscreen
            className='clickable'
            onClick={() => {
              props.toggleFullScreen();
            }}
          />
        </div>

        <div id='image-arrows'>
          <div>
            <AiOutlineArrowLeft id='arrow-left' className='clickable' onClick={() => switchImage('prev')} style={{ display: currentImageIndex > 0 ? 'block' : 'none' }} />
          </div>
          <div>
            <AiOutlineArrowRight id='arrow-right' className='clickable' onClick={() => switchImage('next')} style={{ display: currentImageIndex !== props.images.length - 1 ? 'block' : 'none' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
