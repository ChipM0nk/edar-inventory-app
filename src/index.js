import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
const root = ReactDOM.createRoot(document.getElementById('root'));
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

const theme = createTheme({
  palette: {
    primary: {
      main: '#153D02',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#bfc5c1'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { width: 60, alignSelf: 'center' }
      }
    }
  }
});

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <App />
          <NotificationContainer />
        </StyledEngineProvider>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
