// PostItem.js


import PropTypes from 'prop-types';

const PostItem = ({ blog }) => {

    
  return (
    <div className="post-item">
        
      <img src={blog.picture} alt={blog.title} />
      <div className="post-content">
        <h2>{blog.title}</h2>
        <p>{blog.description}</p>
        <p>{blog.category}</p>
        <p>Rating: {blog.rating}</p>
        {/* Additional information or actions */}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    // Add more properties as needed
  }).isRequired,
};

export default PostItem;

/**In this component:

We receive a post object as a prop, which represents an individual recipe post.
We use destructuring to access properties of the post object such as title, image, and description.
We render the recipe title, image, and description within the component.
You can add additional information or actions specific to each post as needed.
Ensure that you import the PropTypes library at the top of the file and define the prop types for the post prop.

To use the PostItem component in your application, import it into the parent component where you want to
 render individual recipe posts. Then, pass a post object as a prop to the PostItem component for each post you want to render. */