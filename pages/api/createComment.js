const sanityClient = require('@sanity/client');

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}

const client = sanityClient(config);

export default async function createComment(req, res) {
  const {_id, name, email, comment } = JSON.parse(req.body);
  console.log(_id)

  try {
    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: _id,
      },
      name,
      email,
      comment
    });
  } catch (err) {
    return res.status(500).json({message: 'Could not submit comment to server', err});
  }
  console.log("Message submitted!")
  res.status(200).json({message: 'Message Saved!'})
}
