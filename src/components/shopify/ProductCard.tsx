import styles from "./ProductCard.module.css";
import type { Product } from "../../lib/shopify/types";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const image = product.featuredImage || product.images[0];
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;

  return (
    <article className={styles.productCard}>
      <a href={`/products/${product.handle}`} className={styles.imageWrapper}>
        {image && (
          <img
            src={image.url}
            alt={image.altText || product.title}
            width={image.width || 800}
            height={image.height || 800}
            className={styles.image}
            loading="lazy"
          />
        )}
      </a>
      <div className={styles.info}>
        <a href={`/products/${product.handle}`}>
          <h3 className={styles.title}>{product.title}</h3>
        </a>
        {product.vendor && <p className={styles.vendor}>{product.vendor}</p>}
        <div className={styles.footer}>
          <div className={styles.price}>
            <span>
              {price.amount} {price.currencyCode}
            </span>
            {compareAt && (
              <span className={styles.compareAt}>
                {compareAt.amount} {compareAt.currencyCode}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
