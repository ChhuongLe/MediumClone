import Link from 'next/link';
import style from '../styles/Header.module.css';

function Header() {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <Link href ="/">
          <img className={style.headerImage} src="https://links.papareact.com/yvf"/>
        </Link>
        <div className={style.tab1}>
          <h3>About </h3>
          <h3> Contact </h3>
          <h3 className={style.followTag}> Follow </h3>
        </div>
      </div>
      <div className={style.tab2}>
        <h3>Sign In</h3>
        <h3 className={style.gettingStartedTag}>Get Started</h3>
      </div>
    </header>
  );
}

export default Header;
