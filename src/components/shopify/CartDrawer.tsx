import { useState, useEffect } from "react";
import styles from "./CartDrawer.module.css";
import type { Cart, CartLine } from "../../lib/shopify/types";
import Button from "../ui/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  cart: Cart | null | undefined;
  onUpdateQuantity: (lineId: string, quantity: number) => void;
  onRemove: (lineId: string) => void;
};

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemove,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const items = cart?.lines || [];

  return (
    <div className={`${styles.cartDrawer} ${isOpen ? styles.open : ""}`}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 className={styles.title}>Cart ({cart?.totalQuantity || 0})</h2>
          <button
            className={styles.close}
            onClick={onClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>
        <div className={styles.body}>
          {items.length === 0 ? (
            <p className={styles.empty}>Your cart is empty.</p>
          ) : (
            items.map((line: CartLine) => (
              <div key={line.id} className={styles.item}>
                {line.merchandise && (
                  <>
                    <div>
                      <p className={styles.itemTitle}>{line.merchandise.title}</p>
                      <p className={styles.itemVariant}>
                        {line.merchandise.selectedOptions
                          .map((o) => `${o.name}: ${o.value}`)
                          .join(", ")}
                      </p>
                      <p className={styles.itemPrice}>
                        {line.cost.totalAmount.amount}{" "}
                        {line.cost.totalAmount.currencyCode}
                      </p>
                    </div>
                    <div>
                      <select
                        value={line.quantity}
                        onChange={(e) =>
                          onUpdateQuantity(
                            line.id,
                            Number.parseInt(e.target.value, 10),
                          )
                        }
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                      <button onClick={() => onRemove(line.id)}>
                        Remove
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
        {cart && (
          <div className={styles.footer}>
            <Button className={styles.checkout} href={cart.checkoutUrl}>
              Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
