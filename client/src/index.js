import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/App/App.jsx';

const { productId } = window.__PRODUCT_ID__;

ReactDOM.hydrate(<App productId={productId}/>, document.getElementById('app'));

