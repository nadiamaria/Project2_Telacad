import React from "react";
import Layout from "./../../components/Layout/Layout";
import { connect } from "react-redux";
import { removeFromFavorite } from "../../redux/actions/favorites";
import { addToCart } from "../../redux/actions/cart";
import { Link } from "react-router-dom";
import { ReactComponent as Close } from "../../assets/icons/close.svg";

function Favorite(props) {
  return (
    <Layout>
      <div
        className="cart-page container-fluid container-min-max-width
                d-flex flex-column justify-content-center align-items-center"
      >
        {props.products.length ? (
          <div className="w-100">
            <div className="d-flex justify-content-between text-center h4 text-bold">
              <p className="w-25">Produs</p>
              <p className="w-25">Pret</p>
              <p className="w-25">Cantitate</p>
              <p className="w-25">Total</p>
            </div>
            {props.products.map((product) => {
              return (
                <div
                  className="d-flex justify-content-between align-items-center text-center"
                  key={product.id}
                >
                  <div className="w-25 d-flex flex-column justify-content-center align-items-center">
                      <img src={product.image} alt="Produs" />
                    <p>{product.name}</p>
                  </div>
                  <p className="w-25">
                    {product.price} {product.currency}
                  </p>
                  <p className="w-25">
                    <button
                      className="btn btn-dark mb-4 font-weight-bold"
                      onClick={() => {
                        props.addToCart({
                          product: {
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            currency: product.currency,
                            image: product.image,
                          },
                        });
                      }}
                    >
                      Adauga in cos!
                    </button>
                  </p>
                  <div className="w-25 d-flex justify-content-center">
                    <div
                      onClick={() =>
                        props.removeFromFavorite({ id: product.id })
                      }
                    >
                      <Close />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center">
            <p className="h3">Nu ai produse în favorite!</p>
            <Link to="/">
              <button className="btn btn-outline-dark">Inapoi la home</button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    products: state.favorite.products,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: (payload) => dispatch(addToCart(payload)),
    removeFromFavorite: (payload) => dispatch(removeFromFavorite(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
