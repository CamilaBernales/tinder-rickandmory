import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import generateStore from './redux/store' 
import './index.css';


const store = generateStore();

let WithRouter = () => <BrowserRouter><App /></BrowserRouter>
let WithStore = () => <Provider store={store} ><WithRouter /></Provider>

ReactDOM.render(<WithStore />, document.getElementById('root'));
