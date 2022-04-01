import { createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk'
import RootReducer from '../redux/Root-Reducer'

const middleware = [reduxThunk]

if(process.env.NODE_ENV === 'development'){
    middleware.push(logger);
}

const store = createStore(RootReducer, applyMiddleware(...middleware));

export default store;