import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PaymentSuccessPage from './PaymentSuccessPage'; // Import PaymentSuccessPage
import './Cart.css';

function Cart({ cartItems, setCartItems, onToggleCart }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false); // Add payment confirmation state

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    onToggleCart(); // Close any active FileDetailsPage
  };

  const addToCart = (file) => {
    if (!cartItems.find(item => item.id === file.id)) {
      setCartItems([...cartItems, { id: file.id, name: file.name, price: file.price, filePath: file.filePath }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handlePayment = () => {
    setIsPaymentConfirmed(true);
  };

  const handleContinueShopping = () => {
    setIsPaymentConfirmed(false);
    setIsCartOpen(false);
  };

  return (
    <>
      <button className="cart-button" onClick={toggleCart}>
        Cart ({cartItems.length})
      </button>

      {isCartOpen && (
        <div className="cart-modal">
          <div className="cart-content">
            <span className="close-cart" onClick={toggleCart}>&times;</span>
            {isPaymentConfirmed ? (
              <PaymentSuccessPage files={cartItems} onContinueShopping={handleContinueShopping} clearCart={clearCart} />
            ) : (
              <>
                <h2>Your Cart</h2>
                {cartItems.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <ul className="cart-items">
                    {cartItems.map(item => (
                      <li key={item.id} className="cart-item">
                        <span className="item-name">{item.name}</span>
                        <span className="item-price">${item.price.toFixed(2)}</span>
                        <button className="remove-button" onClick={() => removeFromCart(item.id)}>&times;</button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="cart-actions">
                  <div className="total">
                    <span>Total:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <button
                    className="pay-button"
                    onClick={handlePayment}
                    disabled={cartItems.length === 0} // Disable button if cart is empty
                  >
                    Pay with Monero
                  </button>
                  <button className="clear-button" onClick={clearCart}>Clear Cart</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      filePath: PropTypes.string.isRequired, // Add filePath prop type
    })
  ).isRequired,
  setCartItems: PropTypes.func.isRequired,
  onToggleCart: PropTypes.func.isRequired,
};

export default Cart;