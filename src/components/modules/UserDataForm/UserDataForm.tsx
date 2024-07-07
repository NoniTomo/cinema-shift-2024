import { Button } from '@components/elements/Button/Button'
import { TextField } from '../../elements/TextField/TextField'
import { useForm } from 'react-hook-form'
import {
  filterInputAlphabet,
  filterInputCity,
  filterInputEmail,
  filterInputOnlyNumbers,
  validateAlphabetAndSpecialSymbols,
  validateEmail,
} from '../../../utils/validate'
import styles from './index.module.scss'

export type UserDataFormType = {
  buttonText: string
  onSubmit: () => void
}

export default function UserDataForm({
  buttonText,
  onSubmit,
}: UserDataFormType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      patronymic: '',
      phone: '89991776356',
      email: '',
      city: '',
    },
  })

  return (
    <form className={styles.content} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id="firstName"
        register={register('firstName', {
          required: 'Это поле обязательное',
          minLength: { value: 1, message: 'Минимум один символ' },
          maxLength: { value: 60, message: 'Максимум один символ' },
          validate: validateAlphabetAndSpecialSymbols,
        })}
        placeholder="Иван"
        error={errors.firstName?.message}
        label="Имя"
        isDisabled={false}
        isRequired={true}
        onKeyDown={filterInputAlphabet}
      />
      <TextField
        id="lastName"
        register={register('lastName', {
          required: 'Это поле обязательное',
          maxLength: { value: 60, message: 'Максимум 60 символов' },
          validate: validateAlphabetAndSpecialSymbols,
        })}
        placeholder="Иванов"
        error={errors.lastName?.message}
        label="Фамилия"
        isDisabled={false}
        isRequired={true}
        onKeyDown={filterInputAlphabet}
      />
      <TextField
        id="patronymic"
        register={register('patronymic', {
          maxLength: { value: 60, message: 'Максимум 60 символов' },
          validate: (value) =>
            value.split('').length > 0
              ? validateAlphabetAndSpecialSymbols(value)
              : true,
        })}
        placeholder="Иванович"
        error={errors.patronymic?.message}
        label="Отчество"
        isDisabled={false}
        isRequired={false}
        onKeyDown={filterInputAlphabet}
      />
      <TextField
        id="phone"
        register={register('phone')}
        placeholder="89999999999"
        error={errors.phone?.message}
        label="Номер телефона"
        isDisabled={true}
        isRequired={true}
        onKeyDown={filterInputOnlyNumbers}
      />
      <TextField
        id="email"
        register={register('email', {
          required: 'Это поле обязательное',
          validate: validateEmail,
        })}
        placeholder="ivanov@email.mail"
        error={errors.email?.message}
        label="E-mail"
        isDisabled={false}
        isRequired={true}
        onKeyDown={filterInputEmail}
      />
      <TextField
        id="city"
        register={register('city', {
          required: 'Это поле обязательное',
          maxLength: { value: 60, message: 'Максимум 60 символов' },
          validate: validateAlphabetAndSpecialSymbols,
        })}
        placeholder="Москва"
        error={errors.city?.message}
        label="Город"
        isDisabled={false}
        isRequired={true}
        onKeyDown={filterInputCity}
      />
      <Button type="submit">{buttonText}</Button>
    </form>
  )
}
