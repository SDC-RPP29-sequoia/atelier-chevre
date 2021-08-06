import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/App/App.jsx';

const { productId, reviews, reviewsMeta, product, productStyles, questions } = window.__PRODUCT_ID__;

ReactDOM.hydrate(<App
  productId={productId}
  reviews={reviews}
  reviewsMeta={reviewsMeta}
  product={product}
  productStyles={productStyles}
  questions={questions}
/>, document.getElementById('app'));

