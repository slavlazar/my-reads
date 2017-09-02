import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import BookApp from './App';
import './styles/index.css';

ReactDOM.render(
  <BrowserRouter>
    <BookApp />
  </BrowserRouter>,
  document.getElementById('root'));
