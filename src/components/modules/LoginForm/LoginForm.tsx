import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Header from '../../modules/Header/Header';
import {ReactComponent as CrossIcon} from '@/assets/svg/Cross.svg';
import { Button } from '@components/elements/Button/Button';
import { TextField } from '../../elements/TextField/TextField';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import styles from './index.module.scss';
import { KeyboardEvent, useRef, useState } from 'react';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { phone: "", code: "" },
  });
  const [displayCodeField, setDisplayCodeField] = useState(false);
  const refPhone = useRef<HTMLFormElement>(null);
  const refCode = useRef<HTMLFormElement>(null);

  const filterInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      !(
        e.key >= '0' && e.key <= '9' || // Allow digits
        e.key === 'Backspace' ||
        e.key === 'Tab' ||
        e.key === 'Enter' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'Delete' ||
        e.key === 'Escape' ||
        e.ctrlKey || e.metaKey // Allow Ctrl/Cmd combinations
      )
    ) {
      e.preventDefault();
    }
  }

  const inputPhone = register("phone", {
    required: "Это поле обязательное",
    pattern: /^[0-9]+$/i
  });
  const customRegisterPhone: UseFormRegisterReturn = {
    name: 'phone',
    onBlur: (event) => inputPhone.onBlur(event),
    ref: inputPhone.ref,
    onChange: async (event) => {inputPhone.onChange(event)}
  }

  const inputCode = register("code", {
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
  console.log(errors)
  return (
    <>
      <Header to='/cinema/today' Icon={CrossIcon}/>
      <div className={styles.wrapper}>
        <div className={styles.afisha}>
          <p>Введите номер телефона для входа в личный кабинет</p>
            <form ref={refPhone} onSubmit={handleSubmit(() => (displayCodeField) ? () => {} : setDisplayCodeField(true) )}>
              <TextField
                id="phone"
                register={customRegisterPhone}
                placeholder="89999999999"
                error={errors.phone?.message}
                label="Номер телефона"
                isDisabled={false}
                isRequired={true}
                onKeyDown={filterInput}
              />
            </form>
            <form ref={refCode} onSubmit={handleSubmit(() => (displayCodeField) ? () => {} : () => {} )}>
              {displayCodeField && 
                <TextField
                id="code"
                register={customRegisterCode}
                placeholder="123456"
                error={errors.code?.message}
                label="Код подтверждения"
                isDisabled={false}
                isRequired={true}
                onKeyDown={filterInput}
                />
              }
            <Button onClick={(displayCodeField) ? refCode?.current?.requestSubmit() : refPhone?.current?.requestSubmit()} type='submit' for>Продолжить</Button>
            </form>
        </div>
      </div>
    </>
  )
}