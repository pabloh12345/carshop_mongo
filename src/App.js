import logo from './logo.svg';
import './App.css';
import Inicio from './Inicio';
import store from './store/configureStore';
import { Provider } from 'react-redux';

import AWS from 'aws-sdk';

AWS.config.update({
  accesKeyId: procces.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccesKey: procces.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region:'us-east-1',
  sessionToken: procces.env.REACT_APP_AWS_SESSION_TOKEN
 });
 
function App() {
  return (
    <Provider store={store}>
        <Inicio />
    </Provider>
  );
};

export default App;
