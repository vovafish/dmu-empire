import style from './ProfilePage.module.scss';
import { useUser } from '../auth/useUser';

const ProfilePage = () => {
  const user = useUser();
  return (
    <div className="mainContainer">
      <main className={style.main}>
        <div>
          <p>First name: {user.first_name}</p>
          <p>Last name: {user.last_name}</p>
          <p>Status: {user.isVerified ? 'Verified' : 'Not Verified'}</p>
          <p>Type: {user.isAdmin ? 'Administrator' : 'Customer'}</p>
          <p>
            Phone number:{' '}
            {user.phone_number ? user.phone_number : 'Not provided'}
          </p>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
