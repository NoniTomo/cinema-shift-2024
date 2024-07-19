import { useForm } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';

import { TextField, Button } from '@components/elements';
import { filterInputOnlyNumbers } from '@/utils/helpers/validate';

import styles from './index.module.scss';

export type PaymentCardFormType = {
  onSubmit: (data: PaymentCard) => void;
};

export const PaymentCardForm = ({ onSubmit }: PaymentCardFormType) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      pan: '',
      expireDate: '',
      cvv: ''
    }
  });

  const registerWithMask = useHookFormMask(register);

  return (
    <form className={styles.content} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.card}>
        <TextField
          id='pan'
          register={registerWithMask('pan', ['9999 9999'], {
            required: true
          })}
          placeholder='0000 0000'
          error={errors.pan?.message}
          label='Номер'
          isDisabled={false}
          isRequired={true}
          onKeyDown={filterInputOnlyNumbers}
        />
        <div className={styles['card__second-level']}>
          <TextField
            id='expireDate'
            register={registerWithMask('expireDate', ['99/99'], {
              required: true
            })}
            placeholder='00/00'
            error={errors.expireDate?.message}
            label='Срок'
            isDisabled={false}
            isRequired={true}
            onKeyDown={filterInputOnlyNumbers}
          />
          <TextField
            id='cvv'
            register={registerWithMask('cvv', ['9999'], {
              required: true
            })}
            placeholder='0000'
            error={errors.cvv?.message}
            label='CVV'
            isDisabled={false}
            isRequired={true}
            onKeyDown={filterInputOnlyNumbers}
          />
        </div>
      </div>
      <Button type='submit'>Оплатить</Button>
    </form>
  );
};
