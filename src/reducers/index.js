import { combineReducers } from 'redux';
import usuario_reducers from './usuario_reducers';

import AWS from 'aws-sdk';

AWS.config.update({
  accesKeyId: procces.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccesKey: procces.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region:'us-east-1',
  sessionToken: procces.env.REACT_APP_AWS_SESSION_TOKEN
 });
 
const rootReducer = combineReducers({
  usuario_red: usuario_reducers,

});

export default rootReducer;
