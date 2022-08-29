import styles from "./Card.module.scss";

type CardProps = {
  category?: string;
  image: string;
  title: string;
  subtitle: string;
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

export const Card: React.FC<CardProps> = ({
  image,
  title,
  subtitle,
  content,
  onClick,
  category,
}) => {
  return (
    <div className={styles.card_block} onClick={onClick}>
      <div>
        <img src={image} className={styles.card_image} alt={title} />
      </div>
      <div className={styles.category}>{category}</div>
      <div className={styles.card_title}>{title}</div>
      <div className={styles.card_subtitle}>{subtitle}</div>
      <div className={styles.card_content}>{content}</div>
    </div>
  );
};
