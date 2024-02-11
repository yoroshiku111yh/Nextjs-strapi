import next from "next";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import styles from "../styles/components/CardProduct.module.css";

export type TPropsCardProduct = {
  name: string;
  thumb: TThumbnail;
  cost: number;
  discount?: number | null;
  isNew?: boolean;
  desc: string;
  id: number;
  slug: string;
};

type TThumbnail = {
  name: string;
  width: number;
  height: number;
  url: string;
};

export default function CardProduct(props: TPropsCardProduct) {
  const { id, thumb, name, cost, discount, isNew, slug, desc } = props;
  return (
    <div className={styles["card-product"]}>
      <div className={styles["card-product__thumb"]}>
        <div className={`${styles["card-product__thumb-mask"]} gap-2`}>
          {discount && <div className="tag-circle bg-light-red-e9">-{discount}%</div>}
          {isNew && <div className="tag-circle bg-light-green-2e">New</div>}
        </div>
        <Image
          className="object-cover"
          src={thumb.url}
          width={thumb.width}
          height={thumb.height}
          alt={thumb.name}
        />
      </div>
      <div className={styles["card-product__content"]}>
        <h4 className={`${styles["card-product__title"]} pb-1`}>{name}</h4>
        <Markdown className={`${styles["card-product__desc"]} pb-2`}>{desc}</Markdown>
        {discount && <div className={`${styles["card-product__discount"]}`}>{cost}$</div>}
        <div className={`${styles["card-product__price"]}`}>{cost*(100 - (discount || 0))/100}$</div>
      </div>
    </div>
  );
}

