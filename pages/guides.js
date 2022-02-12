import { useContext, useEffect, useState } from 'react';
import AuthContext from '../stores/authContext';
import styles from '../styles/Guides.module.css';

export default function Guides() {
  const { user, authReady } = useContext(AuthContext);
  // console.log(user);
  const [guides, setGuides] = useState(null);
  const [error, setError] = useState(null);

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
        .then((res) => {
          // console.log(res);
          if (!res.ok) {
            throw Error('You must be logged in to view this content');
          }
          return res.json();
        })
        .then((data) => {
          // console.log(data)
          setGuides(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setGuides(null);
        });
    }
  }, [user, authReady]);

  return (
    <div className={styles.guides}>
      {!authReady && <div>Loading...</div>}

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}

      {guides &&
        guides.map((guide) => (
          <div key={guide.title} className={styles.card}>
            <h3>{guide.title}</h3>
            <h4>Written by {guide.author}</h4>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia
              quisquam minima accusamus, commodi provident sequi?
            </p>
          </div>
        ))}
    </div>
  );
}
