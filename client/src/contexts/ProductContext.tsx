import { Component, createContext } from "react";

export interface Product {
  title: string;
  description: string;
  price: number;
  image: string;
  size: string;
  path: string;
  categories: string[];
  stock: number;
  quantity: number;
}

interface State {
  products: Product[];
}

interface ContextValue extends State {
  getProductsFromDb: () => void;
  makeRequest: (url: string, method: string, body?: any) => void,   
  editProduct: (editedProduct: Product, newStock: any) => void                                              
}

export const ProductContext = createContext<ContextValue>({
  products: [],
  makeRequest: () => {},
  getProductsFromDb: () => {},
  editProduct: () => {}
});

class ProductProvider extends Component<{}, State> {
  state: State = {
    products: [],
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

  getProductsFromDb = async () => {
    let products = await this.makeRequest("/api/product", "GET");
    this.setState({ products: products });
  };

  editProduct = async (editedProduct: Product, newStock: any) => {

    const newBody = { ...editedProduct, stock: newStock }

    await this.makeRequest(`/api/product/${editedProduct.title}`, "PUT", newBody);
    this.getProductsFromDb();
  };

  componentDidMount() {
    this.getProductsFromDb();
  }

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          makeRequest: this.makeRequest,
          getProductsFromDb: this.getProductsFromDb,
          editProduct: this.editProduct
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export default ProductProvider;
