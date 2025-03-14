import { useContext } from "react";

import logoImg from "../assets/logo.jpg";
import Button from "../UI/Button";
import { CartContext } from "../store/CartContext";

export default function Header() {
  const { cartState } = useContext(CartContext);

  const totalCartItems = cartState.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="restaurant logo" />
        <h1>Razi Food Shop</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({totalCartItems})</Button>

      </nav>
    </header>
  );
}
