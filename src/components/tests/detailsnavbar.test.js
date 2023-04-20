import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import DetailsNavbar from '../DetailsNavbar';

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
