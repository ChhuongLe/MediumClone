import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import Header from '../components/Header';
import { sanityClient, urlFor } from '../sanity';

export default function Home(props) {
  let posts = props.posts;

  let postMap = posts.map((post)=> {
    console.log(post);
    return (
      <Link className={styles.linkStyle} key={post._id} href={`/post/${post.slug.current}`}>
        <div className={styles.group}>
          <img className={styles.mainImage} src={urlFor(post.mainImage).url()} alt='' />
          <div className={styles.descriptionContainer}>
            <p className={styles.descriptor}>{post.title}</p>
            <p className={styles.descriptor}>{post.description} by {post.author.name}</p>
          </div>
          <img className={styles.authorImage} src={urlFor(post.author.image).url()} alt=""/>
        </div>
      </Link>)
  });

  return (
    <div className="">
      <Head>
        <title>Medium Blog Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.banner}>
        <div className={styles.textContainer}>
          <h2 className={styles.bannerHeader}>Stay curious.</h2>
          <p className={styles.bannerText}>Discover stories, thinking, and expertise from writers on any topic.</p>
          <div className={styles.button}>Start Reading</div>
        </div>
        <img className={styles.logoImage}src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" alt=""/>
      </div>
      <div className={styles.postsContainer}>{postMap}</div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query =
  `*[_type == "post"] {
      _id,
      title,
      description,
      slug,
      mainImage,
      author -> {
      name,
      image
    }
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    }
  }
}
