import React from 'react';

let withTracker = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.handleTrackingClick = this.handleTrackingClick.bind(this);
    }

    handleTrackingClick(e, element, widget) {
      let time = new Date(e.timeStamp).toString();
      let data = {
        element,
        widget,
        time
      };

      console.log('click data', data);
    }

    render() {
      return <WrappedComponent {...this.props} handleTrackingClick={this.handleTrackingClick}/>;
    }
  };
};

export default withTracker;