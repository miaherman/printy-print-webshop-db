import { Component, createContext } from "react";

export interface User {
  role: string;
  username: string;
  password: string;
}

export interface Customer extends User{
  firstName: string;
  lastName: string;
  address: string;
  zipCode: string;
  city: string;
  email: string;
  phoneNr: string;
}

interface State {}

interface ContextValue extends State {
  makeRequest: (url: string, method: string, body?: any) => void;
  loginUser: (username: string, password: string) => void;
  registerUser: (role: string, username: string, password: string) => void;
  logOutUser: () => void;
  checkIfUserIsLoggedIn: () => void;
}

export const UserContext = createContext<ContextValue>({
  makeRequest: () => {},
  loginUser: () => {},
  registerUser: () => {},
  logOutUser: () => {},
  checkIfUserIsLoggedIn: () => {},
});

class UserProvider extends Component<{}, State> {
  state: State = {
    Users: [],
  };

  makeRequest = async (url: string, method: string, body?: any) => {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    });

    const result = await response.json();
    return result;
  };

  loginUser = async (username: string, password: string) => {
    const body = { username: username, password: password };
    const user = await this.makeRequest("/api/user/login", "POST", body);
    console.log(user);

    if (user !== "Wrong username or password") {
      this.setState({ loggedIn: true, user });
      alert('du e så inloggad så')
    } else {
      alert('fel lösen');
    }
  };

  registerUser = async (role: string, username: string, password: string) => {
    const body = { role: role, username: username, password: password };
    const register = await this.makeRequest("/api/user/register", "POST", body);

    alert('Ny användare registrerat');
    return register;
  };

  logOutUser = async () => {
    const logout = await this.makeRequest("/api/user/logout", "DELETE");
    this.checkIfUserIsLoggedIn();
    alert(logout);
    return logout;
  };

  async checkIfUserIsLoggedIn() {
    const result = await fetch("/api/user/authenticate", { method: "POST" });
    const user = await result.json();
    this.setState({
      loggedIn: result.ok,
      user,
    });
  }

  componentDidMount() {
    this.checkIfUserIsLoggedIn();
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          makeRequest: this.makeRequest,
          loginUser: this.loginUser,
          registerUser: this.registerUser,
          logOutUser: this.logOutUser,
          checkIfUserIsLoggedIn: this.checkIfUserIsLoggedIn,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
