import Image from "next/image";
import { Content } from "@/types/content";
import styles from "./ContentItem.module.scss";

interface ContentItemProps {
  item: Content;
}

export default function ContentItem({ item }: ContentItemProps) {
  return (
    <a href={item.link} className={styles.contentItem}>
      <div className={styles.imageContainer}>
        <Image
          width={80}
          height={80}
          src={item.imageUrl}
          alt={item.title}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{item.title}</h3>
      </div>
    </a>
  );
}
