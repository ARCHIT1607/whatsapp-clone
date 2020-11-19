
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import { Route, Switch ,BrowserRouter as Router} from 'react-router-dom'
import { useContext } from 'react';
import Login from './Login';
import { userContext } from './UserContext';

function App() {

  const currentUser = useContext(userContext);
  return (
    <div className="app">
      {!currentUser ?(
        <Login/>
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
