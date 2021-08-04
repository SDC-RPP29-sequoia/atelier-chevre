import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/App/App.jsx';

const { productId, reviews, reviewsMeta } = window.__PRODUCT_ID__;

ReactDOM.hydrate(<App productId={productId}
  reviews={reviews}
  reviewsMeta={reviewsMeta}

/>, document.getElementById('app'));

