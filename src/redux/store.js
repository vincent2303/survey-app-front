import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index.js';

const initialState = {
    auth: {
        pseudo: '',
        password: '',
        isConnected: false
    }
};

const middeleware = [thunk]

const store = createStore(
    rootReducer, 
    initialState,
    compose(
        applyMiddleware(...middeleware),
        window.devToolsExtension  && window.devToolsExtension()
    )
);

export default store