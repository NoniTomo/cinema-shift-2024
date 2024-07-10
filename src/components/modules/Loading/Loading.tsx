import styles from './index.module.scss';

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>Loading...</div>
    </div>
  );
}
