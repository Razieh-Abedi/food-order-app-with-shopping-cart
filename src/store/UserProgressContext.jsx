import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: "", ///cart or checkout
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
  }

  function showCheckout() {
    setUserProgress("checkout");
  }

  function hideCheckout() {
    setUserProgress("");
  }

  const userProgressValues = {
    progress: userProgress,
    hideCart,
    showCart,
    hideCheckout,
    showCheckout,
  }

  return (
    <UserProgressContext.Provider value={userProgressValues}>{children}</UserProgressContext.Provider>
  );
}

export default UserProgressContext;
