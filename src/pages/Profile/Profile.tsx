import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { ReactComponent as ArrowLeftIcon } from '@/assets/svg/Arrow_Left.svg';
import { Loading, UserDataForm, Footer, Header } from '@/components/modules';
import { Button } from '@/components/elements/Button/Button';
import useMobileDetect from '@/utils/hooks/useMobileDetect/useMobileDetect';

import styles from './index.module.scss';
import { useUser } from '@/utils/context/User';
import { useQuery } from '@/utils/hooks/useQuery/useQuery';
import { patchProfile } from '@/utils/api/requests';
import { showError } from '@/utils/helpers';

export const Profile = () => {
  const navigate = useNavigate();
  const { isUserLogged, handleLogOut, setUserData } = useUser();
  const { isMobile } = useMobileDetect();

  const patchProfileQuery = useQuery((params) => patchProfile({ params, config: {} }), {
    select: (response) => {
      return response.data.user;
    },
    onSuccess: (profile) => {
      setUserData(profile);
    },
    onError: (data) => {
      showError(data.message);
    },
    enabled: false,
  });

  useEffect(() => {
    if (!isUserLogged) navigate('../cinema/users/signin');
  }, [isUserLogged]);

  const onSubmit = async (data: Profile) => {
    patchProfileQuery.refetch({ profile: data });
  };

  return (
    <>
      <Header to={`/cinema/today`} Icon={ArrowLeftIcon} text='Профиль' />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {patchProfileQuery.isLoading ? (
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
