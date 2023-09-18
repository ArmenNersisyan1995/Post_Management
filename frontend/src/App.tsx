import { ThemeProvider } from '@mui/material/styles';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Provider } from 'react-redux';

import './App.css';
import store from 'store';
import theme from 'resources/theme';
import Router from 'components/main/Router';
import NotifierProvider from 'components/main/NotifierProvider';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <NotifierProvider>
            <Router />
          </NotifierProvider>
        </LocalizationProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
