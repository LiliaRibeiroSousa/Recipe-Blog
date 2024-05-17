
// PostList.js



//import PostItem from './PostItem';
import { useState, useEffect } from 'react';

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
          <img className="image" src={blog.picture} alt={blog.title} />
          <p className="content">{blog.content}</p>
          
          <p className="category">Category: {blog.category}</p>
          <div className="author-info">
            {/* <span>Author: {blog.author}</span> */}
            <span>User: {blog.author_username}</span>
          </div>
          <p className="timestamp">Posted on: {new Date(blog.timestamp).toLocaleString()}</p>
          <p className="rating">Rating: {blog.rating}</p>
          <a href={blog.link} className="read-more-link">Read More</a>
        </div>
      ))}
    </div>
  );
}

export default PostList;


/**In this example, the PostList component 
 Explanation
fetchBlogs Function: This function is responsible for fetching the data from the 'blogs/' endpoint.
 It uses the fetch API to make a GET request and parses the response as JSON.
useState Hook: The useState hook is used to manage the state of the blogs data, loading status,
 and any errors that might occur during the fetch operation.
useEffect Hook: The useEffect hook is used to call the fetchBlogs function when the component mounts. 
It also handles setting the loading state to false and any errors that occur during the fetch operation.
Conditional Rendering: The component conditionally renders a loading message, an error message, or the list of blogs based on the current state.
This setup should give you a functional PostList component that fetches and displays blog posts from the specified endpoint.

 */