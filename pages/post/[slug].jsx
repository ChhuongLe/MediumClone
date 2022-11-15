import { sanityClient, urlFor } from '../../sanity';
import Header from '../../components/Header';
import styles from '../../styles/Posts.module.css';
import PortableText from 'react-portable-text';

function Post(props) {
  const post = props.post;
  return <main className={styles.postContainer}>
    <Header />
    <img className={styles.mainImage} src={urlFor(post.mainImage).url()} alt=""/>
    <div className={styles.postContent}>
      <article className={styles.articleContainer}>
        <h1 style={{fontSize:"50px", fontWeight:"400", marginBottom:"-5px"}}>{post.title}</h1>
        <h3 className={styles.postDescription}>{post.description}</h3>
      <div className={styles.authorContainer}>
        <img style={{width: "50px", borderRadius:"50%", marginRight:"-10px", marginBottom:"30px"}} src={urlFor(post.author.image).url()}/>
        <p className={styles.authorInfo}>
          Blog post by {"    "}
          <span className={styles.authorName}>{post.author.name}</span> - Published at {new Date(post._createdAt).toLocaleString()}
        </p>
      </div>
      <div>
        <PortableText
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          content={post.body}
        />
      </div>
      </article>
    </div>
    <hr style={{marginLeft: "200px", marginRight: "200px", border:"#ffc017 2px solid"}}/>

    <form className={styles.formContainer}>
      <h3>Enjoyed the article?</h3>
      <h4>Leave a comment below!</h4>
      <label style={{padding: "10px", display:"block"}}>
        <span style={{color: "#5A5A5A"}}>Name:</span>
        <input style={{border: "0"}} placeholder="Name..." type="text"/>
      </label>
      <label style={{padding: "10px", display:"block"}}>
        <span style={{color: "#5A5A5A"}}>Email:</span>
        <input style={{border: "0"}} placeholder="Email..." type="text"/>
      </label>
      <label style={{display:"block"}}>
        <span>Comment:</span>
        <textarea style={{border: "0", fontFamily:"Arial"}}placeholder="Comment..." type="text" rows={8}/>
      </label>
    </form>
  </main>
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug {
    current
    }
  }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map(post => ({
    params: {
      slug: post.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author->{
    name,
    image
   },
   description,
   mainImage,
   slug,
   body
  }`

  const post = await sanityClient.fetch(query, {
    slug: params.slug,
  });

  if(!post) {
    return {
      notFound: true,
    }
  }

  return {
    props:{
      post,
    },
    revalidate: 3600, // after 1 hour it will reupdate the old cache
  };
}