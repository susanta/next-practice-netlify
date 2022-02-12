import { useContext, useEffect } from 'react';
import AuthContext from '../stores/authContext';
import styles from '../styles/Guides.module.css';

export default function Guides() {
  const { user, authReady } = useContext(AuthContext);

  console.log(user);

  useEffect(() => {
    if (authReady) {
      fetch(
        '/.netlify/functions/guides',
        user && {
          headers: {
            Authorization: 'Bearer ' + user.token.access_token,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  }, [user, authReady]);

  return (
    <div className={styles.guides}>
      <h2>All Guides</h2>
    </div>
  );
}
