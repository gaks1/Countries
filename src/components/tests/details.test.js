import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import {
  Routes, Route, MemoryRouter,
} from 'react-router-dom';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Details from '../Details';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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
