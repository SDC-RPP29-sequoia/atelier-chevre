import React from 'react';
import API from './ProductOverviewAPIUtils';

const ClickTracker = (WrappedComponent, moduleName = 'NA') => {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    clickHandler(e) {
      let t = e.target;
      let clickData = { widget: moduleName, time: new Date() };

      if (t.id) {
        clickData.element = '#' + t.id;
      } else {
        let classList = [];

        if (t.classList) {
          t.classList.forEach(_class => {
            classList.push(_class);
          });

          clickData.element = classList.join('.');
        }
      }

      if (clickData.element) {
        API.sendClickData(clickData);
      }
    }

    render() {
      return (
        <div className="click-tracker" onClick={this.clickHandler}>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};

export default ClickTracker;