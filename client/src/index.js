import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';

import UserReducer from './User/redux-store/Reducers/Auth'
import OrderReducer from './User/redux-store/Reducers/Order'
import AdminReducer from './Admin/redux-store/reducers/gc'
import GcReducer from './GarbageCollector/redux-store/Reducers/garbagecoll'

const rootReducer = combineReducers({
  User: UserReducer,
  Order: OrderReducer,
  Admin: AdminReducer,
  GC: GcReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);
