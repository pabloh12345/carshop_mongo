import logo from './logo.svg';
import './App.css';
import Inicio from './Inicio';
import store from './store/configureStore';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
        <Inicio />
    </Provider>
  );
};

export default App;
