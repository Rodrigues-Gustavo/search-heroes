import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src="public/assets/logo/Group@3x.png" alt="Marvel Logo" className={styles.logo} />
      </div>
      <h1 className={styles.title}>EXPLORE O UNIVERSO</h1>
      <p className={styles.subtitle}>
        Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve
      </p>
    </header>
  );
};

export default Header;