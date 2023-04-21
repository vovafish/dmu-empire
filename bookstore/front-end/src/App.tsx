import { HashRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Details from './pages/Details/Details';
import About from './pages/About/About';
import Footer from './pages/Footer/Footer';
import Header from './pages/Header/Header';
import Login from './pages/Login/LoginPage';
import NewLogin from './pages/Login/newLoginPage';

import $bus from './tools/$bus';

import './styles/BaseStyles.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#81B234',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
    },
  },
});

const queryClient = new QueryClient();

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div id='main'>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="details/:id" element={<Details />} />
            {/* <Route path="login" element={<Login />} /> */}
            <Route path="login" element={<NewLogin />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </QueryClientProvider>
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
