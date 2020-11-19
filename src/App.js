
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import { Route, Switch ,BrowserRouter as Router} from 'react-router-dom'
import { useState } from 'react';

function App() {

  const [user, setUser] = useState(null);
  return (
    <div className="app">
      {!user ?(
        <h1>Login</h1>
      ) :(
        <div className="app__body">
        <Router>
        <Sidebar />
          <Switch>
            <Route path ="/rooms/:roomId">      
            <Chat />
            </Route>
            <Route path ="/">
            <Chat />
            </Route>  
          </Switch>
        </Router>
      </div>
      )}
    </div>
  );
}

export default App;
