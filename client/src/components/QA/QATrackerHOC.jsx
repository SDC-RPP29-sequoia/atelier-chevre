import React from 'react';

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

      console.log(data);
    }

    render() {
      return <WrappedComponent {...this.props} handleTrackingClick={this.handleTrackingClick}/>;
    }
  };
};

export default withTracker;