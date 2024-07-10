import styles from './index.module.scss';

type Props = {
  title: string;
  subtitle: string;
};

const InfoCard = ({ title, subtitle }: Props) => (
  <div className={`${styles.wrapper}`}>
    <p className={`${styles.title}`}>{title}</p>
    <p className={`${styles.subtitle}`}>{subtitle}</p>
  </div>
);

export { InfoCard };
