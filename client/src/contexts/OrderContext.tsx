import { Component, createContext } from "react";


export interface Order {
  shipping: string;
  price: number;
  Orders: [];
}

interface State {
  orders: Order[];
}

interface ContextValue extends State {
  getOrdersFromDb: () => void;
  makeRequest: (url: string, method: string, body?: any) => void,                                              
}

export const OrderContext = createContext<ContextValue>({
  orders: [],
  makeRequest: () => {},
  getOrdersFromDb: () => {},
});

class ProductProvider extends Component<{}, State> {
  state: State = {
    orders: [],
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
        }}
      >
        {this.props.children}
      </OrderContext.Provider>
    );
  }
}

export default ProductProvider;
