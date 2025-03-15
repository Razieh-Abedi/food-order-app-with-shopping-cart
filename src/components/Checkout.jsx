import { useContext } from "react";
import Modal from "../UI/Modal";
import UserProgressContext from "../store/UserProgressContext";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Input from "../UI/Input";
import Button from "../UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const SendOrderURL = "http://localhost:3000/orders";
const postRequestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { progress, hideCheckout } = useContext(UserProgressContext);
  const { cartState } = useContext(CartContext);
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
  } = useHttp(SendOrderURL, postRequestConfig);

  const cartTotal = cartState.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  function handleCloseCheckout() {
    hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const checkoutFormData = new FormData(event.target);
    const customFormData = Object.fromEntries(checkoutFormData.entries());
    const orderData = {
      order: {
        items: cartState,
        customer: customFormData,
      },
    };
    sendRequest(JSON.stringify(orderData));
  }

  let actions = (
    <>
      <Button textOnly type="button" onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (error) {
    return <Error title="Failed to send order data!" message={error} />;
  }

  return (
    <Modal open={progress === "checkout"} onClose={handleCloseCheckout}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
