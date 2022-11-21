import Link from 'next/link';
import styles from '../styles/Home.module.css';

function Footer() {
  return (
    <div style={{marginLeft: "44%", marginRight: "auto"}}>
      <Link className={styles.linkStyle} href='/'>
      <h3 style={{fontSize: "40px", paddingTop: "40px", paddingBottom:"40px"}}>Medium</h3>
      </Link>
    </div>
  );
}

export default Footer;