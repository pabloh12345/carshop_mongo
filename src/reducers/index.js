import { combineReducers } from 'redux';
import usuario_reducers from './usuario_reducers';


const rootReducer = combineReducers({
  usuario_red: usuario_reducers,

});

export default rootReducer;
