import '@testing-library/jest-dom';

import filterCountries from '../FilterCountries';

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
