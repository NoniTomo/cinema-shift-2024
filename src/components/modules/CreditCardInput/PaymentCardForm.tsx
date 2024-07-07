import { useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'

import { TextField } from '../../elements/TextField/TextField'
import { filterInputOnlyNumbers } from '../../../utils/validate'
import { Button } from '../../elements/Button/Button'

import styles from './index.module.scss'

export type PaymentCardFormType = {
  onSubmit: () => void
}

export default function PaymentCardForm({ onSubmit }: PaymentCardFormType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      cardNumber: '',
      cardDate: '',
      cardCVV: '',
    },
  })

  const registerWithMask = useHookFormMask(register)

  return (
    <form className={styles.content} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.card}>
        <TextField
          id="cardNumber"
          register={registerWithMask('cardNumber', ['9999 9999'], {
            required: true,
          })}
          placeholder="0000 0000"
          error={errors.cardNumber?.message}
          label="Номер"
          isDisabled={false}
          isRequired={true}
          onKeyDown={filterInputOnlyNumbers}
        />
        <div className={styles['card__second-level']}>
          <TextField
            id="cardDate"
            register={registerWithMask('cardDate', ['99/99'], {
              required: true,
            })}
            placeholder="00/00"
            error={errors.cardDate?.message}
            label="Срок"
            isDisabled={false}
            isRequired={true}
            onKeyDown={filterInputOnlyNumbers}
          />
          <TextField
            id="cardCVV"
            register={registerWithMask('cardCVV', ['9999'], {
              required: true,
            })}
            placeholder="0000"
            error={errors.cardCVV?.message}
            label="CVV"
            isDisabled={false}
            isRequired={true}
            onKeyDown={filterInputOnlyNumbers}
          />
        </div>
      </div>
      <Button type="submit">Оплатить</Button>
    </form>
  )
}
