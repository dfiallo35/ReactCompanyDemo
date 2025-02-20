import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import en from 'date-fns/locale/en-US';

import LoginForm from "./components/LoginForm"
import RegisterForm from './components/RegisterForm';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import ClientListPage from './components/ClientListPage';
import ClientMaintenancePage from './components/ClientMaintenancePage';

import './App.css';

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={en}>
            <Router>
                <Switch>
                    <Route path="/login" component={LoginForm} />
                    <Route path="/register" component={RegisterForm} />

                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/clients" component={ClientListPage}/>
                    <Route exact path="/clients/new" component={ClientMaintenancePage}/>
                    <Route path="/clients/:clientId" component={ClientMaintenancePage}/>
                    
                    <Route component={NotFoundPage} />
                </Switch>
            </Router>
        </LocalizationProvider>
    );
}

export default App;
