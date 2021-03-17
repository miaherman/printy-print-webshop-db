import { Component, createContext } from "react";
import { Product } from "../products";

interface CartItem extends Product {
  quantity: number;
}
interface State {
  cart: CartItem[];
}

interface ContextValue extends State {
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
}

export const CartContext = createContext<ContextValue>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

class CartProvider extends Component<{}, State> {
  state: State = {
    cart: [],
  };

  addProductToCart = (product: Product) => {
    const updatedCart = [...this.state.cart];

    const updatedItemIndex = updatedCart.findIndex(
      (item) => item.id === product.id
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

    this.setState({ cart: updatedCart });
    console.log(updatedCart);
  };

  removeProductFromCart = (product: Product) => {
    const updatedCart = [...this.state.cart];

    const updatedItemIndex = updatedCart.findIndex(
      (item) => item.id === product.id
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

    this.setState({ cart: updatedCart });
    console.log(updatedCart);
    console.log(updatedItemIndex);
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          cart: this.state.cart,
          addToCart: this.addProductToCart,
          removeFromCart: this.removeProductFromCart,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartProvider;
