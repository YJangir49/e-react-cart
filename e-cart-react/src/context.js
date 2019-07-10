import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };

  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    const tempSubTotal = this.state.cartSubTotal + price;
    const tempTax = tempSubTotal / 10;
    const tempTotal = tempSubTotal + tempTax;
    this.setState(
      () => {
        return {
          products: tempProducts,
          cart: [...this.state.cart, product],
          cartSubTotal: tempSubTotal,
          cartTax: tempTax,
          cartTotal: tempTotal
        };
      },
      () => {
        console.log(this.state);
      }
    );
  };

  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = id => {
    let tempCart = [...this.state.cart];
    const index = tempCart.indexOf(this.getItem(id));
    const product = tempCart[index];
    console.log(product);
    product.count++;
    product.total = product.price * product.count;
    console.log(product);
    const tempSubTotal = this.state.cartSubTotal + product.price;
    const tempTax = tempSubTotal / 10;
    const tempTotal = tempSubTotal + tempTax;

    this.setState(() => {
      return {
        cart: tempCart,
        cartSubTotal: tempSubTotal,
        cartTax: tempTax,
        cartTotal: tempTotal
      };
    });
  };

  decrement = id => {
    let tempCart = [...this.state.cart];
    const index = tempCart.indexOf(this.getItem(id));
    const product = tempCart[index];
    if (product.count > 1) {
      product.count--;
      product.total = product.price * product.count;
      console.log(product);

      const tempSubTotal = this.state.cartSubTotal - product.price;
      const tempTax = tempSubTotal / 10;
      const tempTotal = tempSubTotal + tempTax;

      this.setState(() => {
        return {
          cart: tempCart,
          cartSubTotal: tempSubTotal,
          cartTax: tempTax,
          cartTotal: tempTotal
        };
      });
    } else {
      this.removeItem(id);
    }
  };

  removeItem = id => {
    let tempCart = [...this.state.cart];
    const index = tempCart.indexOf(this.getItem(id));
    tempCart.splice(index, 1);
    this.setState(() => {
      return { cart: tempCart };
    });
  };

  clearCart = () => {
    this.setState(() => {
      return { cart: [] };
    });
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
