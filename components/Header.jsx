import Link from 'next/link';
import style from '../styles/Header.module.css';

function Header() {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <Link href ="/">
          <img className={style.headerImage} src="https://links.papareact.com/yvf"/>
        </Link>
      </div>
      <div className={style.container}>
        <div className={style.tab1}>
            <p>Our Story</p>
            <p>Membership</p>
            <p> Write </p>
        </div>
        <div className={style.tab2}>
          <p>Sign In</p>
          <p className={style.gettingStartedTag}>Get Started</p>
        </div>
      </div>

    </header>
  );
}

export default Header;
