import Header from '../components/Header.jsx';
import styles from '../styles/Story.module.css';
import Image from 'next/image';
import WordSphere from '../public/Wordsphere.gif';
import Footer from '../components/Footer.jsx';

function Story () {
  return (
    <div>
      <Header />
      <div className={styles.bannerContainer}>
        <h1 style={{fontWeight:"lighter", fontSize:"75px"}}>Every idea needs a&nbsp; </h1>
        <span style={{fontWeight:"bold", fontSize:"75px"}}> Medium.</span>
      </div>
      <div className={styles.content}>
        <p className={styles.contentContext}>
        The best ideas can change who we are. Medium is where those ideas take shape, take off, and spark powerful conversations. We’re an open platform where over 100 million readers come to find insightful and dynamic thinking. Here, expert and undiscovered voices alike dive into the heart of any topic and bring new ideas to the surface. Our purpose is to spread these ideas and deepen understanding of the world.
        <br/>
        <br/>
        We’re creating a new model for digital publishing. One that supports nuance, complexity, and vital storytelling without giving in to the incentives of advertising. It’s an environment that’s open to everyone but promotes substance and authenticity. And it’s where deeper connections forged between readers and writers can lead to discovery and growth. Together with millions of collaborators, we’re building a trusted and vibrant ecosystem fueled by important ideas and the people who think about them.
        </p>
        <Image className={styles.contentImg} src={WordSphere} alt=""/>
      </div>
      <Footer />
    </div>
  );
}

export default Story;