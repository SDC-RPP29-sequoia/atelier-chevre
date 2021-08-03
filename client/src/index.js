import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/App/App.jsx';

const productId = JSON.parse(window.__PRODUCTID__);

ReactDOM.hydrate(<App productId={productId}/>, document.getElementById('app'));

