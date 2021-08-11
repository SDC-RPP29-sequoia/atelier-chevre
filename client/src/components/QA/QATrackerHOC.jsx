import React from 'react';
import API from './QAAPIUtils';

const withTracker = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.handleTrackingClick = this.handleTrackingClick.bind(this);
    }

    handleTrackingClick(e, element, widget) {
      const time = new Date().toString();
      const data = {
        element,
        widget,
        time
      };

      API.sendClickData(data)
        .catch(err => {
          console.log(err);
        });
    }

    render() {
      return <WrappedComponent {...this.props} handleTrackingClick={this.handleTrackingClick}/>;
    }
  };
};

export default withTracker;