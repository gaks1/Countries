import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCountry } from '../redux/Details/detailsSlice';
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
      <p>Loading...</p>
    );
  }
  return (
    <div className="Details">
      <h1>dvdv</h1>
      <DetailsNavbar />
      {countrydetails.map(
        (country) => (
          <div key={country.cca3}>
            <div>
              <div key={country.cca3}>
                <div>
                  <img src={country.flags.png} alt={country.flags.alt} />
                </div>
                <div>
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
            <div>
              <p>COUNTRY DETAILS</p>
            </div>
            <ul>
              <li key={country.cca3}>
                <p>
                  <span>Common name</span>
                  <span>{country.name.common}</span>
                </p>
                <p>
                  <span>Official name</span>
                  <span>{country.name.official}</span>
                </p>
                <p>
                  <span>Capital</span>
                  <span>
                    {Array.isArray(country.capital)
                      ? country.capital.join(',  ')
                      : country.capital}
                  </span>
                </p>
                <p>
                  <span>Country region</span>
                  <span>{country.region}</span>
                </p>
                <p>
                  <span>Country-subregion</span>
                  <span>{country.subregion}</span>
                </p>
                <p>
                  <span>Country-population</span>
                  <span>{country.population}</span>
                </p>
                <p>
                  <span>Country-area</span>
                  <span>{country.area}</span>
                </p>
                <p>
                  <span>Continent</span>
                  <span>{country.continents}</span>
                </p>
                <p>
                  <span>{country.timezones.join(',  ')}</span>
                </p>
                <p>
                  <span>Start of the week</span>
                  <span>{country.startOfWeek}</span>
                </p>
                <p>
                  <span>Street view</span>
                  <a href={country.maps.googleMaps}>google maps</a>
                </p>
                <p>
                  <span>Language:</span>
                  {
                                        country.languages && (
                                        <ul>
                                          {Object.entries(country.languages).map(([code, name]) => (
                                            <li key={code}>{name}</li>
                                          ))}
                                        </ul>
                                        )
                                    }
                </p>

                <p>
                  <span>Currency:</span>
                  {
                                        country.currencies && (
                                        <ul>
                                          {Object.entries(country.currencies)
                                            .map(([code, currency]) => (
                                              <li key={code}>
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
