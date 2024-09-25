// store.js
import { createStore } from 'redux';
import rootReducer from './userReducer/reducers'; // You need to create this

const store = createStore(rootReducer);

export default store;
