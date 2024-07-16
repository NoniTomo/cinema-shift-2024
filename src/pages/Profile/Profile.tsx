import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { ReactComponent as ArrowLeftIcon } from '@/assets/svg/Arrow_Left.svg';
import { Profile as ProfileType } from '@/utils/types/dto';
import { Loading, UserDataForm, Footer, Header } from '@/components/modules';
import { Button } from '@/components/elements/Button/Button';
import useMobileDetect from '@/utils/hooks/useMobileDetect/useMobileDetect';

import styles from './index.module.scss';
import { useUser } from '@/utils/context/User';

export const Profile = () => {
  const navigate = useNavigate();
  const { isUserLogged, handleUpdateProfile, loading, handleLogOut } = useUser();
  const { isMobile } = useMobileDetect();

  useEffect(() => {
    if (!isUserLogged) navigate('../cinema/users/signin');
  }, [isUserLogged]);

  const onSubmit = async (data: ProfileType) => {
    handleUpdateProfile({ phone: data.phone, profile: data });
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header to={`/cinema/today`} Icon={ArrowLeftIcon} text='Профиль' />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <UserDataForm buttonText='Обновить данные' onSubmit={onSubmit} />
              {isMobile && (
                <Button variant='outlined' onClick={() => handleLogOut()}>
                  Выйти
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
