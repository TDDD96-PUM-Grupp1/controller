import React from 'react';
import ReactDOM from 'react-dom';
import WebFontLoader from 'webfontloader';
import './components/css/reset.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons']
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
