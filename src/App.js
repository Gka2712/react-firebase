import SignUp from './signup';
import './App.css';
import {AuthProvider} from './authcontext'
function App() {
  return (
      <AuthProvider>
        <div style={{margin:'2em'}}>
          <SignUp />
        </div>
      </AuthProvider>
  );
}

export default App;
