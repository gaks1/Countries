import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ setSearch }) => {
  const [input, showInput] = useState(false);

  const handleChange = () => {
    showInput(!input);
  };

  return (
    <nav>
      <div>
        <NavLink to="/">Countries</NavLink>
      </div>
      <div>
        <div>
          <button type="button" onClick={handleChange}>
            <span className="material-symbols-outlined">
              {input ? 'close' : 'search'}
            </span>
          </button>
          {input && (
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  setSearch: PropTypes.func.isRequired,
};

export default Navbar;
