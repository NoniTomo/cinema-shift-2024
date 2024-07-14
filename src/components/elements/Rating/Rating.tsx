import { ReactComponent as Rating1 } from '@/assets/svg/rating/RatingNumber1.svg';
import { ReactComponent as Rating2 } from '@/assets/svg/rating/RatingNumber2.svg';
import { ReactComponent as Rating3 } from '@/assets/svg/rating/RatingNumber3.svg';
import { ReactComponent as Rating4 } from '@/assets/svg/rating/RatingNumber4.svg';
import { ReactComponent as Rating5 } from '@/assets/svg/rating/RatingNumber5.svg';
import { ReactComponent as RatingUndefined } from '@/assets/svg/rating/RatingUndefined.svg';

import styles from './index.module.scss';

type Props = {
  ratingSource: {
    name: string;
    estimate: string;
  }[];
};

export const Rating = ({ ratingSource }: Props) => {
  const getAverageRating = (sources: number[]): JSX.Element => {
    const average = Math.ceil(
      sources.reduce((accumulate, item) => accumulate + item, 0) / (sources.length * 2)
    );
    switch (average) {
      case 1:
        return <Rating1 />;
      case 2:
        return <Rating2 />;
      case 3:
        return <Rating3 />;
      case 4:
        return <Rating4 />;
      case 5:
        return <Rating5 />;
      default:
        return <RatingUndefined />;
    }
  };

  const averageRatingElement = getAverageRating(ratingSource.map((item) => +item.estimate));

  return (
    <div className={`${styles.rating}`}>
      <div className={`${styles.rating__stars}`}>{averageRatingElement}</div>
      {ratingSource.map((item) => (
        <p key={item.name} className={`${styles.rating__info}`}>
          {item.name} - {item.estimate}
        </p>
      ))}
    </div>
  );
};
