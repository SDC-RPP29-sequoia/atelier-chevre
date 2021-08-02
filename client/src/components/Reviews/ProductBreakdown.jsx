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
    if (value) {
      charsToPercent[characteristic.toLowerCase()] = convertToPercent(value);
    }
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

  return (
    <div id="product-breakdown-wrapper">
      {charsToPercent.hasOwnProperty('size') &&
        <div className="breakdown-characteristic" id="breakdown-size">
          <div className="breakdown-title">Size</div>
          <div className="breakdown-scale">
            <div className="breakdown-icon-wrapper">
              <div className="breakdown-bar-wrapper-3">
                <div className="breakdown-bar"></div>
                <div className="breakdown-bar"></div>
                <div className="breakdown-bar"></div>
              </div>
              <div className="breakdown-icon-holder">
                <div className="breakdown-icon" style={sizePostion}>
                  <VscTriangleDown size={25}/>
                </div>
              </div>
            </div>
          </div>
          <div className="breakdown-meaning-3">
            <span>Too Small</span>
            <span className="breakdown-middle">Perfect</span>
            <span className="breakdown-last">Too Wide</span>
          </div>
        </div>
      }
      {charsToPercent.hasOwnProperty('width') &&
        <div className="breakdown-characteristic" id="breakdown-width">
          <div className="breakdown-title">Width</div>
          <div className="breakdown-scale">
            <div className="breakdown-icon-wrapper">
              <div className="breakdown-bar-wrapper-2">
                <div className="breakdown-bar"></div>
                <div className="breakdown-bar"></div>
                <div className="breakdown-bar"></div>
              </div>
              <div className="breakdown-icon-holder">
                <div className="breakdown-icon" style={widthPostion}>
                  <VscTriangleDown size={25}/>
                </div>
              </div>
            </div>
          </div>
          <div className="breakdown-meaning-3">
            <span>Too Narrow</span>
            <span className="breakdown-middle">Perfect</span>
            <span className="breakdown-last">Too Wide</span>
          </div>
        </div>
      }
      {charsToPercent.hasOwnProperty('comfort') &&
        <div className="breakdown-characteristic" id="breakdown-comfort">
          <div className="breakdown-title">Comfort</div>
          <div className="breakdown-scale">
            <div className="breakdown-icon-wrapper">
              <div className="breakdown-bar-wrapper-2">
                <div className="breakdown-bar"></div>
                <div className="breakdown-bar"></div>
                <div className="breakdown-bar"></div>
              </div>
              <div className="breakdown-icon-holder">
                <div className="breakdown-icon" style={comfortPostion}>
                  <VscTriangleDown size={25}/>
                </div>
              </div>
            </div>
          </div>
          <div className="breakdown-meaning-2">
            <span>Uncomfortable</span>
            <span className="breakdown-last">Perfect</span>
          </div>
        </div>
      }
      {charsToPercent.hasOwnProperty('quality') &&
        <div className="breakdown-characteristic" id="breakdown-quality">
          <div className="breakdown-title">Quality</div>
          <div className="breakdown-scale">
            <div className="breakdown-icon-wrapper">
              <div className="breakdown-bar-wrapper-2">
                <div className="breakdown-bar"></div>
                <div className="breakdown-bar"></div>
                <div className="breakdown-bar"></div>
              </div>
              <div className="breakdown-icon-holder">
                <div className="breakdown-icon" style={qualityPostion}>
                  <VscTriangleDown size={25}/>
                </div>
              </div>
            </div>
          </div>
          <div className="breakdown-meaning-2">
            <span>Uncomfortable</span>
            <span className="breakdown-last">Perfect</span>
          </div>
        </div>
      }
      {charsToPercent.hasOwnProperty('length') &&
      <div className="breakdown-characteristic" id="breakdown-Length">
        <div className="breakdown-title">Length</div>
        <div className="breakdown-scale">
          <div className="breakdown-icon-wrapper">
            <div className="breakdown-bar-wrapper-3">
              <div className="breakdown-bar"></div>
              <div className="breakdown-bar"></div>
              <div className="breakdown-bar"></div>
            </div>
            <div className="breakdown-icon-holder">
              <div className="breakdown-icon" style={lengthPostion}>
                <VscTriangleDown size={25}/>
              </div>
            </div>
          </div>
        </div>
        <div className="breakdown-meaning-3">
          <span>Runs Short</span>
          <span className="breakdown-middle">Perfect</span>
          <span className="breakdown-last">Runs Long</span>
        </div>
      </div>
      }
      {charsToPercent.hasOwnProperty('fit') &&
        <div className="breakdown-characteristic" id="breakdown-Fit">
          <div className="breakdown-title">Fit</div>
          <div className="breakdown-scale">
            <div className="breakdown-icon-wrapper">
              <div className="breakdown-bar-wrapper-3">
                <div className="breakdown-bar"></div>
                <div className="breakdown-bar"></div>
                <div className="breakdown-bar"></div>
              </div>
              <div className="breakdown-icon-holder">
                <div className="breakdown-icon" style={fitPostion}>
                  <VscTriangleDown size={25}/>
                </div>
              </div>
            </div>
          </div>
          <div className="breakdown-meaning-3">
            <span>Runs Tight</span>
            <span className="breakdown-middle">Perfect</span>
            <span className="breakdown-last">Runs Loose</span>
          </div>
        </div>
      }
    </div>
  );
};

export default ProductBreakdown;
