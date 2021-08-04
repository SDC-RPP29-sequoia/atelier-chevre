import React from 'react';
import API from './ReviewsAPIUtils';

const ClickTracker = (WrappedComponent) => {

  const handleTrackingClick = (event, element) => {
    const time = new Date(event.timeStamp).toString();
    const clickData = {
      element,
      widget: 'Ratings and Reviews',
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
