import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store';
import './index.css';
import { GlobalStyle } from 'global-styles';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyle>
                <App />
            </GlobalStyle>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
