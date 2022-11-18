import { useState } from 'react';
import { sanityClient, urlFor } from '../../sanity';
import Header from '../../components/Header';
import styles from '../../styles/Posts.module.css';
import PortableText from 'react-portable-text';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

function Post(props) {
  const { register, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      name: '',
      email: '',
      comment: ''
    }
  });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async(data) =>{
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    .then(() => {
      console.log(data);
      setSubmitted(true);
    })
    .catch((err)=> {
      console.log(err);
      setSubmitted(false);
    })
  };

  const post = props.post;
  return (
    <main className={styles.postContainer}>
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
      {submitted ? (
        <div className={styles.submitStyle}>
          <h3 style={{marginLeft: "50px", fontSize: "30px"}}>Thank you for your comment!</h3>
          <p style={{marginLeft: "50px", fontSize: "17px", marginTop: "-20px"}}>Once it has been approved, it will appear below!</p>
        </div>
      ) : (
          <form  onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
          <div style={{marginLeft: "-40px", marginBottom: "20px"}}>
            <h3 style={{color: "#ffc017 ", fontSize: "16px", marginBottom: "-20px"}}>Enjoyed the article?</h3>
            <h1>Leave a comment below!</h1>
            <hr style={{border: "1px solid rgba(90, 90, 90, 0.1)", marginTop:"-15px"}}/>
          </div>
          {/*Hidden parameter that embeds an id that is specific to the current page*/}
          <input
            {...register("_id", { required: true })}
              type="hidden" name="_id"
              value={post._id}
          />
          <label className={styles.labelStyle}>
            <span className={styles.commentSpanStyle}>Name:</span> <br />
            <input {...register("name", {required: true})}
              className={styles.inputStyle}
              placeholder="Name..."
              type="text"
            />
          </label>
          <label className={styles.labelStyle}>
            <span className={styles.commentSpanStyle}>Email:</span> <br />
            <input {...register("email", {required: true})}
              className={styles.inputStyle}
              placeholder="Email..."
              type="email"
            />
          </label>
          <label className={styles.labelStyle}>
            <span className={styles.commentSpanStyle}>Comment:</span> <br />
            <textarea {...register("comment", {required: true})}
              className={styles.inputStyle}
              placeholder="Comment..."
              type="text"
              rows={8}
            />
          </label>
          {/* Return errors when validation fails */}
          <div style={{display: "flex", flexDirection:"column"}}>
            {errors.name && (
              <span style={{color: "red"}}>- The name field is requried</span>
            )}
            {errors.comment && (
              <span style={{color: "red"}}>- The comment field is required</span>
            )}
            {errors.email && (
              <span style={{color: "red"}}>- The email field is required</span>
            )}
          </div>
          <input className={styles.buttonStyle} type="submit"/>
        </form>
        )
      }
      {/* Comment section */}
      <div className={styles.commentContainer}>
        <h3 style={{fontSize:"30px", marginBottom:"-5px"}}>Comments</h3>
        <hr style={{border:"1px solid rgba(90, 90, 90, 0.1)"}}/>
        {post.comments.map((comment)=>{ return (
          <div>
            <p style={{paddingBottom: "10px"}}><span style={{color:"#ffc007"}}>{comment.name}:</span> {comment.comment}</p>
          </div>
        )
        })}
      </div>
  </main>
  );
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
   'comments' : *[
     _type == "comment" &&
     post._ref == ^._id &&
     approved == true],
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