import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose , className = "" }) {
  const dialogRef = useRef();

  useEffect(() => {
    const modalState = dialogRef.current;
    if (open) {
      modalState.showModal();
    }
    return () => modalState.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialogRef} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
