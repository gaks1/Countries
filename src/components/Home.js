import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCountries } from '../redux/Home/homeSlice';
import filterCountries from './FilterCountries';
import styles from './Home.module.css';
import Navbar from './HomeNavbar';
import img from '../img/Global-Map-Transparent-700x416.png';

const Home = () => {
  const {
    fetched, isLoading, countries,
  } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const filteredCountries = filterCountries({ countries, search });

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchCountries());
    }
  }, [dispatch, fetched]);

  if (isLoading) {
    return (
      <p className={styles.loading}>Loading...</p>
    );
  }

  return (
    <div className="home">
      <Navbar setSearch={setSearch} />
      <div className={styles.divheader}>
        <div className={styles.divtitle}>
          <div className={styles.imageContainer}>
            <img src={img} alt="" />
          </div>
          <div className={styles.textContainer}>
            <h1>
              COUNTRIES AROUND
              <br />
              THE WORLD
            </h1>
          </div>
        </div>

      </div>
      <div className={styles.separator}>
        <p className={styles.septext}>LIST OF COUNTRIES</p>
      </div>
      <ul className={styles.ulCountries}>
        {filteredCountries.map((country) => (
          <Link key={country.name.common} className={styles.link} to={`/Details/${country.name.common}`}>
            <li key={country.name.common} className={styles.liCountry}>
              <span className={`material-symbols-outlined ${styles.arrowCircleRight}`}>
                arrow_circle_right
              </span>
              <div className={styles.countryImage}>
                <img src={country.flags.png} alt={country.flags.alt} />
              </div>
              <div className={styles.countryDetails}>
                <p className={styles.liname}>
                  {country.name.common}
                </p>
                <p className={styles.licood}>
                  LAT:
                  {' '}
                  {country.latlng[0]}
                </p>
                <p className={styles.licood}>
                  LONG:
                  {' '}
                  {country.latlng[1]}
                </p>
              </div>
            </li>

          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Home;
