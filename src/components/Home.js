import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCountries } from '../redux/Home/homeSlice';
import filterCountries from './FilterCountries';
import Navbar from './HomeNavbar';

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
      <p>Loading...</p>
    );
  }

  return (
    <div className="home">
      <Navbar setSearch={setSearch} />
      <div>
        <p>LIST OF COUNTRIES</p>
      </div>
      <ul>
        {filteredCountries.map((country) => (
          <Link key={country.name.common} to={`/Details/${country.name.common}`}>
            <li key={country.name.common}>
              <span className="material-symbols-outlined">
                arrow_circle_right
              </span>
              <div>
                <img src={country.flags.png} alt={country.flags.alt} />
              </div>
              <div>
                <p>
                  {country.name.common}
                </p>
                <p>
                  LAT:
                  {' '}
                  {country.latlng[0]}
                </p>
                <p>
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
