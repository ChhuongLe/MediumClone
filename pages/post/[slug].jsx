import { sanityClient, urlFor } from '../../sanity';
import Header from '../../components/Header';
import styles from '../../styles/Posts.module.css';

function Post(props) {
  const post = props.post;
  console.log(post);
  return <main>
    <Header />
    <img className={styles.mainImage} src={urlFor(post.mainImage).url()} alt=""/>

    <article className={styles.articleContainer}>
      <h1>{post.title}</h1>
      <h3 className={styles.postDescription}>{post.description}</h3>
    </article>
    <div>
      <img src={urlFor(post.author.image).url()}/>
      <p>Blog post by {post.author.name} - Published at {new Date(post._createdAt).toLocaleString()}</p>
    </div>
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