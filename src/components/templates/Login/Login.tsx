import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';

import Header from '@components/modules/Header/Header';
import { ReactComponent as CrossIcon } from '@/assets/svg/Cross.svg';
import { Button } from '@components/elements/Button/Button';
import { TextField } from '@components/elements/TextField/TextField';
import useTimer from '@/hooks/useTimer/useTimer';
import { filterInputOnlyNumbers } from '@/utils/validate';
import { UserContext } from '@/context/UserContext';
import type { CreateOtpDto } from '@/types/dto';
import { Loading } from '@/components/modules/Loading/Loading';

import styles from './index.module.scss';

export default function Login() {
  const { countdown, start, isEnding } = useTimer();
  const { handleGetOtpsCode, handleSignIn, loading, isUserLogged } = useContext(UserContext);
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');

  useEffect(() => {
    isUserLogged && navigate(-2);
  }, [isUserLogged, navigate]);

  const formPhone = useForm({
    mode: 'onChange',
    defaultValues: { phone: '' }
  });
  const formCode = useForm({
    mode: 'onChange',
    defaultValues: { code: '' }
  });

  const [displayCodeField, setDisplayCodeField] = useState(false);
  const refPhone = useRef<HTMLFormElement>(null);
  const refCode = useRef<HTMLFormElement>(null);

  const handleFormSubmit = () => {
    if (displayCodeField) {
      refCode.current?.requestSubmit();
    } else {
      refPhone.current?.requestSubmit();
    }
  };

  const onSubmitPhone = async (data: CreateOtpDto) => {
    setPhone(data.phone);
    setDisplayCodeField(true);
    const delay = await handleGetOtpsCode(data);
    delay && start(delay / 1000);
  };

  const signIn = async (data: { code: string }) => {
    const signInData = {
      code: data.code,
      phone: phone
    };
    await handleSignIn(signInData);
  };

  const inputPhone = formPhone.register('phone', {
    required: 'Это поле обязательное',
    pattern: /^[0-9]+$/i
  });
  const customRegisterPhone: UseFormRegisterReturn = {
    name: 'phone',
    onBlur: (event) => inputPhone.onBlur(event),
    ref: inputPhone.ref,
    onChange: async (event) => {
      inputPhone.onChange(event);
    }
  };

  const inputCode = formCode.register('code', {
    required: 'Это поле обязательное',
    maxLength: 6,
    pattern: /^[0-9]+$/i
  });
  const customRegisterCode: UseFormRegisterReturn = {
    name: 'code',
    onBlur: (event) => inputCode.onBlur(event),
    ref: inputCode.ref,
    onChange: async (event) => {
      inputCode.onChange(event);
    }
  };

  return (
    <>
      <Header to='/cinema/today' Icon={CrossIcon} />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <p>Введите номер телефона для входа в личный кабинет</p>
              <form
                className={styles.form}
                ref={refPhone}
                onSubmit={formPhone.handleSubmit(onSubmitPhone)}
              >
                <TextField
                  id='phone'
                  register={customRegisterPhone}
                  placeholder='89999999999'
                  error={formPhone.formState.errors.phone?.message}
                  label='Номер телефона'
                  isDisabled={false}
                  isRequired={true}
                  onKeyDown={filterInputOnlyNumbers}
                  onPaste={filterInputOnlyNumbers}
                />
              </form>
              <form className={styles.form} ref={refCode} onSubmit={formCode.handleSubmit(signIn)}>
                {displayCodeField && (
                  <TextField
                    id='code'
                    register={customRegisterCode}
                    placeholder='123456'
                    error={formCode.formState.errors.code?.message}
                    label='Код подтверждения'
                    isDisabled={false}
                    isRequired={true}
                    onKeyDown={filterInputOnlyNumbers}
                    onPaste={filterInputOnlyNumbers}
                  />
                )}
              </form>
              <Button onClick={handleFormSubmit} type='submit'>
                Продолжить
              </Button>
              {displayCodeField && !isEnding && (
                <p className={`${styles.content__timer}`}>
                  Отправить код повторно через {countdown} сек
                </p>
              )}
              {displayCodeField && isEnding && (
                <div className={styles.button}>
                  <p
                    className={`${styles.button__description}`}
                    onClick={() => onSubmitPhone({ phone })}
                  >
                    Отправить ещё раз
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
