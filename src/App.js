import SignUp from './signup';
import login from './login';
import Home from './home';
import Eventadd from './eventadd';
import './App.css';
import {AuthProvider} from './authcontext'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{margin:'2em'}}>
          <Routes>
            <Route path="/signup" Component={SignUp}></Route>
            <Route path="/login" Component={login}></Route>
            <Route path="/eventadd" Component={Eventadd}></Route>
            <Route path="/" Component={Home}></Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
