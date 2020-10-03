import React from 'react';
import './ProductItem.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {addToFavorite} from "../../redux/favorites/FavoritesActions";
import {removeFromFavorite} from "../../redux/favorites/FavoritesActions";
import {addToCart} from "../../redux/cart/CartActions";
import { ReactComponent as Heart } from '../../assets/icons/heart.svg';
import { ReactComponent as HeartEmpty } from '../../assets/icons/heart-outlined.svg';

function ProductItem(props) {
    const {id, name, price, currency, image, favoriteProducts} = props;

    const existsInFavorites = favoriteProducts.find((favoriteProducts) => favoriteProducts.id === id);

    return (
        <div className="product-item col-12 col-md-4 mb-3 d-flex flex-column align-items-center">
            <Link to={`/product/${id}`} className="text-dark d-flex flex-column align-items-center">
                <img src={image} alt="productPhoto" className="mb-2"/>
                <p className="mb-1 text-center">{name}</p>
                <p className="text-center">{price + currency}</p>
            </Link>
            <button className="btn btn-outline-dark mb-2"
                    onClick={() => props.addToCart(
                        {
                            product: {id, name, price, currency, image}
                        }
                    )}
            >
                Adauga in cos
            </button>
            {!existsInFavorites ?
                <HeartEmpty  className="inima" onClick={() => props.addToFavorite({
                    product: {
                        id,
                        name,
                        price,
                        currency,
                        image
                    }
                })}/>
               :  <Heart  className="inima" onClick={() => props.removeFromFavorite({id: id})}/>
           }
        </div>
    );
}

function mapStateToProps(state) {
    return {
        favoriteProducts: state.favorite.products
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (payload) => dispatch(addToCart(payload)),
        addToFavorite: (payload) => dispatch(addToFavorite(payload)),
        removeFromFavorite: (payload) => dispatch(removeFromFavorite(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);