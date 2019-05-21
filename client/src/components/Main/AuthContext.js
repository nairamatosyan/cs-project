import React from 'react';
import { getAccessToken } from '../../config/localStorage'
const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  constructor() {
    super()
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.state = {
      isAuth: !!getAccessToken()
    }
  }
  login() {
    this.setState({ isAuth: true });
  }
  logout() {
    this.setState({ isAuth: false })
  }
  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          login: this.login,
          logout: this.logout
        }}
      > 
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}
const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }