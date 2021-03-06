import { Component, createContext } from "react";
import { Product } from "./ProductContext";
import { Customer } from "./UserContext";
export interface Payment {
  paymentType: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Card {
  cardNumber: string;
  cardDate: string;
  cardCvc: string;
}
interface State {
  cart: CartItem[];
  customer: Customer;
  orderPrice: number;
  payment: Payment;
  invoice: string;
  cardDetails: Card;
}

interface ContextValue extends State {
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  removeAllFromCart: (product: Product) => void;
  emptyCart: () => void;
  createCustomer: (customer: Customer) => void;
  getOrderPrice: (cart: CartItem[]) => void;
  getPayment: (payment: Payment) => void;
  getCardDetails: (card: Card) => void;
  getInvoiceDetails: (invoice: string) => void;
}

export const CartContext = createContext<ContextValue>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  removeAllFromCart: () => {},
  emptyCart: () => {},
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
  createCustomer: () => {},
  orderPrice: 0,
  getOrderPrice: () => {},
  getPayment: () => {},
  payment: {
    paymentType: "Swish",
  },
  getCardDetails: () => {},
  cardDetails: {
    cardCvc: "",
    cardNumber: "",
    cardDate: "",
  },
  getInvoiceDetails: () => {},
  invoice: "",
});

class CartProvider extends Component<{}, State> {
  state: State = {
    cart: [],
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
    orderPrice: 0,
    payment: {
      paymentType: "Swish",
    },
    cardDetails: {
      cardNumber: "",
      cardDate: "",
      cardCvc: "",
    },
    invoice: "",
  };

  getInvoiceDetails = (invoice: string) => {
    this.setState({ invoice: invoice });
  };

  getCardDetails = (card: Card) => {
    this.setState({ cardDetails: card });
  };

  getOrderPrice = (cart: CartItem[]) => {
    let price = cart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    this.setState({ orderPrice: price });
  };

  getPayment = (payment: Payment) => {
    this.setState({ payment });
  };

  createCustomer = (customer: Customer) => {
    this.setState({ customer });
  };

  emptyCart = () => {

    localStorage.removeItem('data')

    this.setState({
      cart: [],
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
      orderPrice: 0,
      payment: {
        paymentType: "Swish",
      },
      cardDetails: {
        cardNumber: "",
        cardDate: "",
        cardCvc: "",
      },
      invoice: "",
    });
  };

  addProductToCart = (product: Product) => {
    const updatedCart = [...this.state.cart];

    const updatedItemIndex = updatedCart.findIndex(
      (item) => item.title === product.title
    );

    if (updatedItemIndex < 0) {
      updatedCart.push({ ...product, quantity: 1 });
    } else {
      const updatedItem = {
        ...updatedCart[updatedItemIndex],
      };
      updatedItem.quantity++;
      updatedCart[updatedItemIndex] = updatedItem;
    }

    localStorage.setItem('data', JSON.stringify(updatedCart))

    this.getOrderPrice(JSON.parse(localStorage.getItem('data') || '[]'));
    this.setState({ cart: JSON.parse(localStorage.getItem('data') || '[]') });
  };

  removeProductFromCart = (product: Product) => {
    const updatedCart = [...this.state.cart];

    const updatedItemIndex = updatedCart.findIndex(
      (item) => item.title === product.title
    );

    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };
    updatedItem.quantity--;
    if (updatedItem.quantity <= 0) {
      updatedCart.splice(updatedItemIndex, 1);
    } else {
      updatedCart[updatedItemIndex] = updatedItem;
    }

    localStorage.setItem('data', JSON.stringify(updatedCart))

    this.getOrderPrice(JSON.parse(localStorage.getItem('data') || '[]'));
    this.setState({ cart: JSON.parse(localStorage.getItem('data') || '[]') });
    console.log(updatedCart);
    console.log(updatedItemIndex);
  };

  removeAllFromCart = (product: Product) => {
    const updatedCart = [...this.state.cart];

    const updatedItemIndex = updatedCart.findIndex(
      (item) => item.title === product.title
    );

    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };

    updatedItem.quantity = 0;
    updatedCart.splice(updatedItemIndex, 1);

    localStorage.setItem('data', JSON.stringify(updatedCart))

    this.getOrderPrice(JSON.parse(localStorage.getItem('data') || '[]'));
    this.setState({ cart: JSON.parse(localStorage.getItem('data') || '[]') });
    console.log(updatedCart);
    console.log(updatedItemIndex);
  };

  componentDidMount() {
    this.setState({ cart: JSON.parse(localStorage.getItem('data') || '[]') });
  }

  render() {
    return (
      <CartContext.Provider
        value={{
          ...this.state,
          emptyCart: this.emptyCart,
          addToCart: this.addProductToCart,
          removeFromCart: this.removeProductFromCart,
          removeAllFromCart: this.removeAllFromCart,
          createCustomer: this.createCustomer,
          getOrderPrice: this.getOrderPrice,
          getPayment: this.getPayment,
          getCardDetails: this.getCardDetails,
          getInvoiceDetails: this.getInvoiceDetails,
        }}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartProvider;
