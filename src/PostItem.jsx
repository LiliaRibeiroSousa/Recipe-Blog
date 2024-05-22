


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
 
  }).isRequired,
};

export default PostItem;

