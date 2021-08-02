import React from 'react';
import { VscTriangleDown } from 'react-icons/vsc';

const ProductBreakdown = ({currentProductMeta}) => {

  const { characteristics } = currentProductMeta;
  const charsToPercent = {};

  const convertToPercent = (value) => {
    return ((value / 5) * 100) - 5;
  };

  for (let characteristic in characteristics) {
    const value = characteristics[characteristic].value;
    charsToPercent[characteristic.toLowerCase()] = convertToPercent(value);
  }

  const sizePostion = {
    left: charsToPercent.size + '%'
  };

  const widthPostion = {
    left: charsToPercent.width + '%'
  };

  const comfortPostion = {
    left: charsToPercent.comfort + '%'
  };

  const qualityPostion = {
    left: charsToPercent.quality + '%'
  };

  const lengthPostion = {
    left: charsToPercent.length + '%'
  };

  const fitPostion = {
    left: charsToPercent.fit + '%'
  };


  console.log('charsToPercent:', charsToPercent);
  return (
    <div id="product-breakdown-wrapper">
      {characteristics.hasOwnProperty('Size') &&
        <div className="breakdown-characteristic" id="breakdown-size">Size
          <div>Size</div>
          <div></div>
          <div></div>
        </div>
      }
      {characteristics.hasOwnProperty('Width') &&
        <div className="breakdown-characteristic" id="breakdown-width">Width</div>
      }
      {characteristics.hasOwnProperty('Comfort') &&
        <div className="breakdown-characteristic" id="breakdown-comfort">
          <div className="breakdown-title">Comfort</div>
          <div className="breakdown-scale">
            <div className="breakdown-icon-wrapper">
              <div className="breakdown-bar-wrapper-2">
                <div className="breakdown-bar"></div>
                <div className="breakdown-bar"></div>
                <div className="breakdown-bar"></div>
              </div>
              <div id="breakdown-comfort-icon-holder">
                <div id="breakdown-comfort-icon" style={comfortPostion}>
                  <VscTriangleDown size={25}/>
                </div>
              </div>
            </div>
          </div>
          <div className="breakdown-meaning">
            <span>Uncomfortable</span>
            <span className="breakdown-last">Perfect</span>
          </div>
        </div>
      }
      {characteristics.hasOwnProperty('Quality') &&
        <div className="breakdown-characteristic" id="breakdown-quality">

        </div>
      }
      {characteristics.hasOwnProperty('Length') &&
        <div className="breakdown-characteristic" id="breakdown-Length">Length</div>
      }
      {characteristics.hasOwnProperty('Fit') &&
        <div className="breakdown-characteristic" id="breakdown-Fit">Fit</div>
      }
    </div>
  );
};

export default ProductBreakdown;
