import React from 'react';
import AppRoutes from '../src/routes';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRoutes />
      </div>
    </Provider>
  );
};

export default App;
