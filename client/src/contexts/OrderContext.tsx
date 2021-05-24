import { Component, createContext } from "react";
import { Product } from "./ProductContext";


export interface Order{
  shipping: string;
  price: number;
  products: Product[];
}

interface State {
  products: Product[];
  orders: Order[];
}

interface ContextValue extends State {
  getOrdersFromDb: () => void;
  makeRequest: (url: string, method: string, body?: any) => void,
  createOrder: (order: Order) => void;                                             
} 

export const OrderContext = createContext<ContextValue>({
  products: [],
  orders: [],
  makeRequest: () => {},
  getOrdersFromDb: () => {},
  createOrder: () => {}
});

class OrderProvider extends Component<{}, State> {
  state: State = {
    products: [],
    orders: []
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

  createOrder = async (order: Order) => {
    const doc = await this.makeRequest("/api/order", "POST", order);

    alert('Ny order skapad');
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
