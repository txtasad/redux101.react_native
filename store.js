import { createStore, combineReducers } from 'redux';
import catReducer from './reducers/catReducer';

const rootReducer = combineReducers({
  catReducer: catReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;
