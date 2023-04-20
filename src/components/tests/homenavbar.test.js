import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router, Routes, Route, MemoryRouter,
} from 'react-router-dom';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import HomeNavbar from '../HomeNavbar';
import DetailsNavbar from '../DetailsNavbar';
import Home from '../Home';
import Details from '../Details';
import filterCountries from '../FilterCountries';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('HomeNavbar', () => {
  const setSearchMock = jest.fn();

  test('renders without crashing', () => {
    const { getByText } = render(
      <Router>
        <HomeNavbar setSearch={setSearchMock} />
      </Router>,
    );
    expect(getByText('Countries')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const tree = renderer
      .create(
        <Router>
          <HomeNavbar setSearch={setSearchMock} />
        </Router>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('DetailsNavbar',
  () => {
    test('renders without crashing', () => {
      const { getByText } = render(
        <Router>
          <DetailsNavbar />
        </Router>,
      );
      expect(getByText('DETAILS')).toBeInTheDocument();
    });

    test('matches snapshot', () => {
      const tree = renderer
        .create(
          <Router>
            <DetailsNavbar />
          </Router>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

describe('Home', () => {
  const initialState = {
    home: {
      countries: [
        {
          name: {
            common: 'Afghanistan',
          },
          flags: {
            png: 'https://restcountries.com/data/afg.svg',
            alt: 'flag',
          },
          latlng: [20, 20],
        },
        {
          name: {
            common: 'Albania',
          },
          flags: {
            png: 'https://restcountries.com/data/alb.svg',
            alt: 'flag',
          },
          latlng: [20, 20],
        },
      ],
      fetched: false,
      isLoading: false,
    },
  };

  const store = mockStore(initialState);

  test('renders without crashing', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>,
    );
    expect(getByText('Albania')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <Home />
          </Router>
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Details', () => {
  const initialState = {
    details: {
      countrydetails: [
        {
          cca3: 'AFG',
          name: {
            common: 'Afghanistan',
            official: 'Islamic Republic of Afghanistan',
          },
          flags: {
            png: 'https://restcountries.com/data/afg.svg',
            alt: 'flag',
          },
          latlng: [20, 20],
          capital: ['Kabul'],
          region: 'Asia',
          subregion: 'Southern Asia',
          population: 32225560,
          area: 652230,
          timezones: ['UTC+04:30'],
          startOfWeek: 'Saturday',
          maps: {
            googleMaps: 'https://www.google.com/maps/place/Afghanistan',
          },
          languages: { ps: 'Pashto', uz: 'Uzbek', tk: 'Turkmen' },
          currencies: {
            AFN: {
              name: 'Afghan afghani',
              symbol: '؋',
            },
          },
        },
      ],
      isLoading: false,
    },
  };

  const store = mockStore(initialState);
  const countryName = 'Afghanistan';

  test('renders without crashing', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/${countryName}`]}>
          <Routes>
            <Route path="/:countryName" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
    expect(getByText('Saturday')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/${countryName}`]}>
          <Routes>
            <Route path="/:countryName" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('FilterCountries', () => {
  const countries = [
    {
      name: {
        common: 'Afghanistan',
      },
      flags: {
        png: 'https://restcountries.com/data/afg.svg',
        alt: 'flag',
      },
      latlng: [20, 20],
    },
    {
      name: {
        common: 'Albania',
      },
      flags: {
        png: 'https://restcountries.com/data/alb.svg',
        alt: 'flag',
      },
      latlng: [20, 20],
    },
  ];

  test('returns the correct number of countries', () => {
    const filteredCountries = filterCountries({ countries, search: 'Afghanistan' });
    expect(filteredCountries.length).toBe(1);
  });

  test('returns the correct countries', () => {
    const filteredCountries = filterCountries({ countries, search: 'Afghanistan' });
    expect(filteredCountries[0].name.common).toBe('Afghanistan');
  });
});
