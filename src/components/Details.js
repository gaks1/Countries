import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCountry } from '../redux/Details/detailsSlice';
import styles from './Details.module.css';
import DetailsNavbar from './DetailsNavbar';

const Details = () => {
  const { countryName } = useParams();
  const { countrydetails, isLoading } = useSelector((state) => state.details);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountry(countryName));
  }, [dispatch, countryName]);

  if (isLoading) {
    return (
      <p className={styles.loading}>Loading...</p>
    );
  }
  return (
    <div className="Details">
      <DetailsNavbar />
      {countrydetails.map(
        (country) => (
          <div key={country.cca3}>
            <div className={styles.divheader}>
              <div key={country.cca3} className={styles.divtitle}>
                <div className={styles.divtitleimg}>
                  <img src={country.flags.png} alt={country.flags.alt} />
                </div>
                <div className={styles.divtitletext}>
                  <h1>{country.name.common}</h1>
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
              </div>
            </div>
            <div className={styles.divseparator}>
              <p className={styles.septext}>COUNTRY DETAILS</p>
            </div>
            <ul className={styles.ul}>
              <li className={styles.liDetails} key={country.cca3}>
                <p className={styles.pdetails}>
                  <span className={styles.pstrong}>Common name</span>
                  <span className={styles.pproperty}>{country.name.common}</span>
                </p>
                <p className={styles.pdetails}>
                  <span className={styles.pstrong}>Official name</span>
                  <span className={styles.pproperty}>{country.name.official}</span>
                </p>
                <p className={styles.pdetails}>
                  <span className={styles.pstrong}>Capital</span>
                  <span className={styles.pproperty}>
                    {Array.isArray(country.capital)
                      ? country.capital.join(',  ')
                      : country.capital}
                  </span>
                </p>
                <p className={styles.pdetails}>
                  <span className={styles.pstrong}>Country region</span>
                  <span className={styles.pproperty}>{country.region}</span>
                </p>
                <p className={styles.pdetails}>
                  <span className={styles.pstrong}>Country-subregion</span>
                  <span className={styles.pproperty}>{country.subregion}</span>
                </p>
                <p className={styles.pdetails}>
                  <span className={styles.pstrong}>Country-population</span>
                  <span className={styles.pproperty}>{country.population}</span>
                </p>
                <p className={styles.pdetails}>
                  <span className={styles.pstrong}>Country-area</span>
                  <span className={styles.pproperty}>{country.area}</span>
                </p>
                <p className={styles.pdetails}>
                  <span className={styles.pstrong}>Continent</span>
                  <span className={styles.pproperty}>{country.continents}</span>
                </p>
                <p className={styles.pdetails}>
                  <span className={styles.pstrong}>Timezones</span>
                  <span className={styles.pproperty}>{country.timezones.join(',  ')}</span>
                </p>
                <p className={styles.pdetails}>
                  <span className={styles.pstrong}>Start of the week</span>
                  <span className={styles.pproperty}>{country.startOfWeek}</span>
                </p>
                <p className={styles.pdetails}>
                  <span className={styles.pstrong}>Street view</span>
                  <a href={country.maps.googleMaps} className={styles.pproperty}>google maps</a>
                </p>
                <p className={styles.pdetails}>
                  <span className={styles.pstrong}>Language:</span>
                  {
                    country.languages && (
                      <ul className={styles.languageContainer}>
                        {Object.entries(country.languages).map(([code, name]) => (
                          <li key={code} className={styles.languageItem}>{name}</li>
                        ))}
                      </ul>
                    )
                  }
                </p>

                <p className={styles.pdetails}>
                  <span className={styles.pstrong}>Currency:</span>
                  {
                    country.currencies && (
                      <ul className={styles.languageContainer}>
                        {Object.entries(country.currencies).map(([code, currency]) => (
                          <li key={code} className={styles.languageItem}>
                            {currency.name}
                            {' '}
                            (
                            {currency.symbol}
                            )
                          </li>
                        ))}
                      </ul>
                    )
                  }
                </p>

              </li>
            </ul>
          </div>
        ),
      )}

    </div>
  );
};

export default Details;
