import { useContext, useActionState } from "react";
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
  const { cartState, clearCart } = useContext(CartContext);
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp(SendOrderURL, postRequestConfig);

  const cartTotal = cartState.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  function handleCloseCheckout() {
    hideCheckout();
  }

  ///below function is for manually handle the submit form.
  // It should be used on the onSubmit event handler on the form
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

  ///below function is for using form actions to submit the form.
  // It should be used on the actions prop on the form
  async function checkoutAction(prevFormData, formData) {
    const customFormData = Object.fromEntries(formData.entries());
    const orderData = {
      order: {
        items: cartState,
        customer: customFormData,
      },
    };
    await sendRequest(JSON.stringify(orderData));
  }

  const [formState, formAction, pending] = useActionState(checkoutAction, null);

  function handleFinish() {
    hideCheckout();
    clearCart();
    clearData();
  }

  let actions = (
    <>
      <Button textOnly type="button" onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  // if (isSending) {
  //   actions = <span>Sending order data...</span>;
  // }

  if (pending) {
    actions = <span>Sending order data...</span>;
  }
  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you within minutes.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === "checkout"} onClose={handleCloseCheckout}>
      <form
        // onSubmit={handleSubmit}
        action={formAction}
      >
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to send order data!" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
