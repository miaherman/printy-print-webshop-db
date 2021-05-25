import { Component, createContext } from "react";
import { withRouter, RouteComponentProps } from "react-router";

export interface User {
  role: string;
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

interface State {
  customer: Customer,
  loggedIn: boolean
}

interface ContextValue extends State {
  makeRequest: (url: string, method: string, body?: any) => void;
  loginUser: (email: string, password: string) => void;
  createCustomer: (customer: Customer) => void;
  registerUser: (customer: Customer) => void;
  logOutUser: () => void;
  checkIfUserIsLoggedIn: () => void;
}

export const UserContext = createContext<ContextValue>({
  makeRequest: () => {},
  loginUser: () => {},
  registerUser: () => {},
  createCustomer: () => {},
  logOutUser: () => {},
  checkIfUserIsLoggedIn: () => {},
  customer: {
    password: "",
    role: "",
    address: "",
    city: "",
    firstName: "",
    lastName: "",
    phoneNr: "",
    zipCode: "",
    email: "",
  },
  loggedIn: false
});

class UserProvider extends Component<RouteComponentProps, State> {
  state: State = {
    customer: {
      password: "",
      role: "",
      address: "",
      city: "",
      firstName: "",
      lastName: "",
      phoneNr: "",
      zipCode: "",
      email: "",
    },
    loggedIn: false
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

  loginUser = async (email: string, password: string) => {
    const body = { email: email, password: password };
    const customer = await this.makeRequest("/api/user/login", "POST", body);
    console.log(customer);

    if (customer !== "Wrong email or password") {
      this.setState({ loggedIn: true, customer });
      // alert('du e så inloggad så')
      this.props.history.push("/");
    } else {
      alert('fel lösen');
    }
  };

  createCustomer = (customer: Customer) => {
    this.setState({ customer });
  };

  registerUser = async (customer: Customer) => {
    this.createCustomer(customer)
    const register = await this.makeRequest("/api/user/register", "POST", customer);

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
    const customer = await result.json();
    this.setState({
      loggedIn: result.ok,
      customer,
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
          createCustomer: this.createCustomer,
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

export default withRouter(UserProvider);
