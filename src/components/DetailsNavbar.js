import BackButton from './BackButton';
import styles from './DetailsNavbar.module.css';

const DetailsNavbar = () => (
  <nav className={styles.navbar}>
    <div className={styles.divbutton}>
      <BackButton />
    </div>
    <div>
      <h1 className={styles.h1title}>DETAILS</h1>
    </div>
  </nav>
);

export default DetailsNavbar;
