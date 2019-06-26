import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ProjectConsumer } from "../context";

export default class Product extends Component {
  render() {
    const { id, title, img, price, inCart } = this.props.product;
    return (
      <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
        <div className="card">
          <div
            className="img-container p-5"
            onClick={() => console.log("You clicked me.")}
          >
            <Link to="/details">
              <img src={img} alt="Product" className="card-img-top" />
            </Link>
            <button
              className="card-btn"
              disabled={inCart ? true : false}
              onClick={() => {
                console.log("Added to the cart.");
              }}
            >
              {inCart ? (
                <p className="text-capitalize mb-0" disabled>
                  {" "}
                  in incart
                </p>
              ) : (
                <i className="fas fa-cart-plus" />
              )}
            </button>
          </div>
        </div>
      </ProductWrapper>
    );
  }
}

const ProductWrapper = styled.div``;
