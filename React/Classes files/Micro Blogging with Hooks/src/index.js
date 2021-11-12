import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Firebase from './utlis/firebase'
ReactDOM.render(
  <React.StrictMode>
    <Firebase>
      <App />
    </Firebase>
  </React.StrictMode>,
  document.getElementById('root')
);

