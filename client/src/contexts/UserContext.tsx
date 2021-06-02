import { Component, createContext } from "react";
import { withRouter, RouteComponentProps } from "react-router";

export interface User {
  role: string;
  password: string;
}

export interface Customer extends User {
  firstName: string;
  lastName: string;
  address: string;
  zipCode: string;
  city: string;
  email: string;
  phoneNr: string;
}

interface State {
  customer: Customer;
  loggedIn: boolean;
}

interface ContextValue extends State {
  makeRequest: (url: string, method: string, body?: any) => void;
  loginUser: (email: string, password: string) => void;
  createCustomer: (customer: Customer) => void;
  registerUser: (customer: Customer) => void;
  logOutUser: () => void;
  checkIfUserIsLoggedIn: () => void;
  adminCheck: () => boolean | undefined;
}

export const UserContext = createContext<ContextValue>({
  makeRequest: () => {},
  loginUser: () => {},
  registerUser: () => {},
  createCustomer: () => {},
  logOutUser: () => {},
  checkIfUserIsLoggedIn: () => {},
  adminCheck: () => true,
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
  loggedIn: false,
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
    loggedIn: false,
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
    const body = { email: email.toLowerCase(), password: password };
    const customer = await this.makeRequest("/api/user/login", "POST", body);

    if (customer !== "Wrong email or password" && customer.role === "admin") {
      this.setState({ loggedIn: true, customer });
      this.props.history.push("/admin");
    } else if (customer !== "Wrong email or password" && customer.role === "customer"){
      this.setState({ loggedIn: true, customer });
      this.props.history.push("/");
    } else {
      alert(customer);
    }
  };

  createCustomer = (customer: Customer) => {
    this.setState({ customer });
  };

  registerUser = async (customer: Customer) => {
    
    const register = await this.makeRequest(
      "/api/user/register",
      "POST",
      customer
    );

    if (register !== "A user already exists with that email, please try again!") {
      alert("New user registered!");
      this.createCustomer(customer);
      this.props.history.push("/login");
    } else {
      alert(register)
    }

    return register;
  };

  logOutUser = async () => {
    const logout = await this.makeRequest("/api/user/logout", "DELETE");
    this.checkIfUserIsLoggedIn();
    this.props.history.push("/");
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

  adminCheck = () => {
    if (!this.state.customer.role || this.state.customer.role === "customer") {
      return false;
    } else if (this.state.customer.role === "admin") {
      return true;
    }
  };

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
          adminCheck: this.adminCheck,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default withRouter(UserProvider);
