import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import Modal from "../UI/Modal";
import { currencyFormatter } from "../utils/formatting";
import Button from "../UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const { cartState, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  const cartTotal = cartState.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  const handleCloseCart = () => {
    hideCart();
  };

  const handleOpenCheckout = () => {
    showCheckout();
  };

  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartState.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => addItem(item)}
            onDecrease={() => removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartState.length > 0 && (
          <Button onClick={handleOpenCheckout}>Go to checkout</Button>
        )}
      </p>
    </Modal>
  );
}
