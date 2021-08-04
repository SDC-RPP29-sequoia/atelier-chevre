import React from 'react';
import API from './ReviewsAPIUtils';

const ClickTracker = (WrappedComponent) => {

  const handleTrackingClick = (event, element, widget) => {
    const time = new Date(event.timeStamp).toString();
    const clickData = {
      element,
      widget,
      time
    };
    API.sendClickData(clickData);
  };

  return (props) => {
    return (
      <>
        <WrappedComponent {...props} handleTrackingClick={handleTrackingClick}/>
      </>
    );
  };
};

export default ClickTracker;
