import { Component, createContext } from "react";
import { Product } from "./ProductContext";
import { Customer } from "./UserContext";

export interface Order {
  _id: string;
  delivery: Delivery;
  price: number;
  products: Product[];
  customer: Customer;
}
export interface Delivery {
  shippingMethod: string;
  time: number;
  price: number;
}

export type NewOrder = Omit<Order, "_id">;

interface State {
  products: Product[];
  orders: Order[];
  order: Order;
  deliveries: Delivery[];
  delivery: Delivery;
}

interface ContextValue extends State {
  getOrdersFromDb: () => void;
  getDeliveryFromDb: () => void;
  getDelivery: (delivery: Delivery) => void;
  makeRequest: (url: string, method: string, body?: any) => void;
  createOrder: (order: NewOrder) => void;
}

export const OrderContext = createContext<ContextValue>({
  products: [],
  orders: [],
  order: {
    _id: "",
    delivery: {
      shippingMethod: "",
      time: 0,
      price: 0,
    },
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
      password: "",
    },
  },
  deliveries: [],
  delivery: {
    shippingMethod: "Express",
    time: 24,
    price: 100,
  },
  makeRequest: () => {},
  getOrdersFromDb: () => {},
  createOrder: () => {},
  getDeliveryFromDb: () => {},
  getDelivery: () => {},
});

class OrderProvider extends Component<{}, State> {
  state: State = {
    products: [],
    orders: [],
    order: {
      _id: "",
      delivery: {
        shippingMethod: "",
        time: 0,
        price: 0,
      },
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
        password: "",
      },
    },
    delivery: {
      shippingMethod: "Express",
      time: 24,
      price: 100,
    },
    deliveries: [],
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

  getDeliveryFromDb = async () => {
    let deliveries = await this.makeRequest("/api/delivery", "GET");
    this.setState({ deliveries: deliveries });
    console.log(this.state.deliveries);
  };

  getDelivery = (delivery: Delivery) => {
    this.setState({ delivery });
  };

  createOrder = async (order: NewOrder) => {
    console.log(order);
    const doc = await this.makeRequest("/api/order", "POST", order);

    this.setState({ order: doc });
    // alert('New order registered');
    return doc;
  };

  componentDidMount() {
    this.getOrdersFromDb();
    this.getDeliveryFromDb();
  }

  render() {
    return (
      <OrderContext.Provider
        value={{
          ...this.state,
          makeRequest: this.makeRequest,
          getOrdersFromDb: this.getOrdersFromDb,
          createOrder: this.createOrder,
          getDeliveryFromDb: this.getDeliveryFromDb,
          getDelivery: this.getDelivery,
        }}>
        {this.props.children}
      </OrderContext.Provider>
    );
  }
}

export default OrderProvider;
