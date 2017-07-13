import React from 'react';
import ReactDOM from 'react-dom';
// ADDED BY DAVID
import axios from 'axios';
import FriendList from './components/FriendList.jsx';
import Login from './components/Login.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  HashRouter // MAY NOT NEED HASHROUTER BUT LEAVING IT IN FOR NOW JUST IN CASE REACT ROUTING IS NEEDED
} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVideo: '',
      authenticated: false,
      user: {},
      friends: []
    };
    this.authenticate = this.authenticate.bind(this);
  }

  componentDidMount() {
    this.authenticate();
  }

  authenticate() {
    axios.get('/api/authenticate')
      .then(response => {
        this.setState({
          authenticated: response.data.authenticated,
          user: response.data.user
        });
      });
  }

  render () {
    const { authenticated, user } = this.state;

    let login;
    let friendsList = <FriendList authenticated={authenticated} user={user}/>;

    if (!authenticated) {
      login = <a href='/login'>Login with Facebook</a>;
      friendsList = null;
    }

    return (
      <div>
        <h1>VR Stories</h1>
        {login}
        {friendsList}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
