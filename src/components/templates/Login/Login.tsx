import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Header from '../../modules/Header/Header';
import {ReactComponent as CrossIcon} from '@/assets/svg/Cross.svg';
import { Button } from '@components/elements/Button/Button';
import { TextField } from '../../elements/TextField/TextField';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { useRef, useState } from 'react';
import useTimer from '../../../hooks/useTimer/useTimer';
import { filterInputOnlyNumbers } from '../../../utils/validate';
import styles from './index.module.scss';

export default function Login() {
  const { countdown, startTimer, end } = useTimer();
  const formPhone = useForm({
    mode: "onChange",
    defaultValues: { phone: "" },
  });
  const formCode = useForm({
    mode: "onChange",
    defaultValues: { code: "" },
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

  const inputPhone = formPhone.register("phone", {
    required: "Это поле обязательное",
    pattern: /^[0-9]+$/i
  });
  const customRegisterPhone: UseFormRegisterReturn = {
    name: 'phone',
    onBlur: (event) => inputPhone.onBlur(event),
    ref: inputPhone.ref,
    onChange: async (event) => {inputPhone.onChange(event)}
  }

  const inputCode = formCode.register("code", {
    required: "Это поле обязательное",
    maxLength: 6,
    pattern: /^[0-9]+$/i
  });
  const customRegisterCode: UseFormRegisterReturn = {
    name: 'code',
    onBlur: (event) => inputCode.onBlur(event),
    ref: inputCode.ref,
    onChange: async (event) => {inputCode.onChange(event)}
  }
  return (
    <>
      <Header to='/cinema/today' Icon={CrossIcon}/>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <p>Введите номер телефона для входа в личный кабинет</p>
          <form ref={refPhone} onSubmit={formPhone.handleSubmit(() => (displayCodeField) ? () => {} : (() => {
            setDisplayCodeField(true);
            startTimer(60);
          })())}>
            <TextField
              id="phone"
              register={customRegisterPhone}
              placeholder="89999999999"
              error={formPhone.formState.errors.phone?.message}
              label="Номер телефона"
              isDisabled={false}
              isRequired={true}
              onKeyDown={filterInputOnlyNumbers}
            />
          </form>
          <form ref={refCode} onSubmit={formCode.handleSubmit(() => {})}>
            {displayCodeField && 
              <TextField
              id="code"
              register={customRegisterCode}
              placeholder="123456"
              error={formCode.formState.errors.code?.message}
              label="Код подтверждения"
              isDisabled={false}
              isRequired={true}
              onKeyDown={filterInputOnlyNumbers}
              />
            }
          </form>
          <Button onClick={handleFormSubmit} type='submit'>Продолжить</Button>
          {displayCodeField && !end && <p className={`${styles.content__timer}`}>Отправить код повторно через {countdown} сек</p>}
          {displayCodeField && end && 
            <div className={styles.button}>
              <button className={`${styles.button__description}`} onClick={() => startTimer(60)}>Отправить ещё раз</button>
            </div>
          }
        </div>
      </div>
    </>
  )
}