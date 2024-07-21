import { Button } from '@components/elements/Button/Button';
import { TextField } from '@components/elements/TextField/TextField';
import { useForm } from 'react-hook-form';
import {
  filterInputAlphabet,
  filterInputCity,
  filterInputEmail,
  filterInputOnlyNumbers,
  validateAlphabetAndSpecialSymbols,
  validateEmail
} from '@/utils/helpers/validate';
import { useUser } from '@/utils/context/User';

import styles from './index.module.scss';

export type UserDataFormType = {
  buttonText: string;
  onSubmit: (data: Profile) => void;
};

export const UserDataForm = ({ buttonText, onSubmit }: UserDataFormType) => {
  const { userData } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstname: userData?.firstname ?? '',
      middlename: userData?.middlename ?? '',
      lastname: userData?.lastname ?? '',
      phone: userData.phone,
      email: userData?.email ?? '',
      city: userData?.city ?? ''
    }
  });

  return (
    <div className={styles.container}>
      <form id='userDataFormID' className={styles.content} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id='firstname'
          register={register('firstname', {
            required: 'Это поле обязательное',
            minLength: { value: 1, message: 'Минимум один символ' },
            maxLength: { value: 60, message: 'Максимум один символ' },
            validate: validateAlphabetAndSpecialSymbols
          })}
          placeholder='Иван'
          error={errors.firstname?.message}
          label='Имя'
          isDisabled={false}
          isRequired={true}
          onKeyDown={filterInputAlphabet}
          onPaste={filterInputAlphabet}
        />
        <TextField
          id='middlename'
          register={register('middlename', {
            required: 'Это поле обязательное',
            maxLength: { value: 60, message: 'Максимум 60 символов' },
            validate: validateAlphabetAndSpecialSymbols
          })}
          placeholder='Иванов'
          error={errors.middlename?.message}
          label='Фамилия'
          isDisabled={false}
          isRequired={true}
          onKeyDown={filterInputAlphabet}
          onPaste={filterInputAlphabet}
        />
        <TextField
          id='lastname'
          register={register('lastname', {
            required: 'Это поле обязательное',
            maxLength: { value: 60, message: 'Максимум 60 символов' },
            validate: (value) =>
              value.split('').length > 0 ? validateAlphabetAndSpecialSymbols(value) : true
          })}
          placeholder='Иванович'
          error={errors.lastname?.message}
          label='Отчество'
          isDisabled={false}
          isRequired={true}
          onKeyDown={filterInputAlphabet}
          onPaste={filterInputAlphabet}
        />
        <TextField
          id='phone'
          register={register('phone')}
          placeholder='89999999999'
          error={errors.phone?.message}
          label='Номер телефона'
          isDisabled={true}
          isRequired={true}
          onKeyDown={filterInputOnlyNumbers}
          onPaste={filterInputOnlyNumbers}
        />
        <TextField
          id='email'
          register={register('email', {
            required: 'Это поле обязательное',
            validate: validateEmail
          })}
          placeholder='ivanov@email.mail'
          error={errors.email?.message}
          label='E-mail'
          isDisabled={false}
          isRequired={true}
          onKeyDown={filterInputEmail}
          onPaste={filterInputEmail}
        />
        <TextField
          id='city'
          register={register('city', {
            required: 'Это поле обязательное',
            maxLength: { value: 60, message: 'Максимум 60 символов' },
            validate: validateAlphabetAndSpecialSymbols
          })}
          placeholder='Москва'
          error={errors.city?.message}
          label='Город'
          isDisabled={false}
          isRequired={true}
          onKeyDown={filterInputCity}
        />
      </form>
      <Button form='userDataFormID' type='submit'>
        {buttonText}
      </Button>
    </div>
  );
};
