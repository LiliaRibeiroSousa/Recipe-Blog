

//import PostItem from './PostItem';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const fetchBlogs = async () => {
  const token = localStorage.getItem('token'); // Retrieve the token from local storage
 
  console.log('Token:', token);
  
  try {
    const response = await fetch('https://salty-temple-86081-1a18659ec846.herokuapp.com/blogs/', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${token}`,
      },
    });
    

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

const PostList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogs();
        console.log('Fetched data : ', data)
        setBlogs(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };


    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
      {blogs.map(blog => (
        <div className="post-wrapper" key={blog.id}>
          <h2 className="title">{blog.title}</h2>
          <img className="image" src={`https://res.cloudinary.com/dlctj1zzp/${blog.picture}`} alt={blog.title} />
          <p className="content">{blog.content.split(" ").slice(0, 10).join(" ") + "..."}</p>
          
          <p className="category">Category: {blog.category}</p>
          <div className="author-info">
            {/* <span>Author: {blog.author}</span> */}
            <span>User: {blog.author_username}</span>
          </div>
          <p className="timestamp">Posted on: {new Date(blog.timestamp).toLocaleString()}</p>
          <div className="recipeRating">
                    <img src={blog.rating >= 1 ? '../icons/icons8-star-50(1).png' : '../icons/icons8-star-50.png'} alt="hi" className="star" />
                    <img src={blog.rating >= 2 ? '../icons/icons8-star-50(1).png' : '../icons/icons8-star-50.png'} alt="hi" className="star" />
                    <img src={blog.rating >= 3 ? '../icons/icons8-star-50(1).png' : '../icons/icons8-star-50.png'} alt="hi" className="star" />
                    <img src={blog.rating >= 4 ? '../icons/icons8-star-50(1).png' : '../icons/icons8-star-50.png'} alt="hi" className="star" />
                    <img src={blog.rating == 5 ? '../icons/icons8-star-50(1).png' : '../icons/icons8-star-50.png'} alt="hi" className="star" />
          </div>
          <Link to={`/blogs/${blog.id}`} className="read-more-link">Read More</Link>
        </div>
      ))}
    </div>
  );
}

export default PostList;


