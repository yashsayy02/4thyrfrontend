import './App.css';
import Homepage from './pages/Homepage';
import { Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DoctorPage from './pages/doctorPage';

function App() {
  return (
    <div className="App">
      <Route path='/' component={LoginPage} exact />
      <Route path='/register' component={RegisterPage} exact />
      <Route path='/home' component={Homepage} exact />
      <Route path='/doctor' component={DoctorPage} exact />
    </div>
  );
}

export default App;
