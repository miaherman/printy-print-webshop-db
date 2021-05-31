import { Component, createContext } from "react";
import { Product } from "./ProductContext";
import { Customer } from "./UserContext";


export interface Order {
  _id: string;
  shipping: string;
  price: number;
  products: Product[];
  customer: Customer;
}

export type NewOrder = Omit<Order, '_id'>;

interface State {
  products: Product[];
  orders: Order[];
  order: Order;
}

interface ContextValue extends State {
  getOrdersFromDb: () => void;
  makeRequest: (url: string, method: string, body?: any) => void,
  createOrder: (order: NewOrder) => void;                                             
} 

export const OrderContext = createContext<ContextValue>({
  products: [],
  orders: [],
  order: {
    _id: "",
    shipping: "",
    price: 0,
    products: [],
    customer: {
      firstName: "",
      lastName: "",
      address: "",
      zipCode: "",
      city: "",
      phoneNr: "",
      email: "",
      role: "",
      password: ""
    }
  },
  makeRequest: () => {},
  getOrdersFromDb: () => {},
  createOrder: () => {}
});

class OrderProvider extends Component<{}, State> {
  state: State = {
    products: [],
    orders: [],
    order: {
      _id: "",
      shipping: "",
      price: 0,
      products: [],
      customer: {
        firstName: "",
        lastName: "",
        address: "",
        zipCode: "",
        city: "",
        phoneNr: "",
        email: "",
        role: "",
        password: ""
      }
    },
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

  getOrdersFromDb = async () => {
    let orders = await this.makeRequest("/api/order", "GET");
    this.setState({ orders: orders });
  };

  createOrder = async (order: NewOrder) => {
    console.log(order)
    const doc = (await this.makeRequest("/api/order", "POST", order));

    this.setState({ order: doc })

    alert('New order registered');
    return doc;
  };


  componentDidMount() {
    this.getOrdersFromDb();
  }

  render() {
    return (
      <OrderContext.Provider
        value={{
          ...this.state,
          makeRequest: this.makeRequest,
          getOrdersFromDb: this.getOrdersFromDb,
          createOrder: this.createOrder
        }}
      >
        {this.props.children}
      </OrderContext.Provider>
    );
  }
}

export default OrderProvider;
