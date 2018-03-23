import 'react-mdl/extra/css/material.amber-light_green.min.css';
import 'react-mdl/extra/material';

import React from 'react';
import ReactDOM from 'react-dom';
import './components/css/reset.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
