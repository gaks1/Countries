import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Home from '../Home';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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
