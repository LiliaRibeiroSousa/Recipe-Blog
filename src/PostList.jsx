import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const fetchBlogs = async () => {
  const token = localStorage.getItem('token'); 

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
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogs();
        setBlogs(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredBlogs = selectedCategory === 'All' 
    ? blogs 
    : blogs.filter(blog => blog.category.toLowerCase() === selectedCategory.toLowerCase());

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
      <div className="category-filter">
        <label htmlFor="category">Sort by Category:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="All">All</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
          <option value="Appetizers">Appetizers</option>
          <option value="Gluten-Free">Gluten-Free</option>
          <option value="Burgers">Burgers</option>
          <option value="Vegan">Vegan</option>
        </select>
      </div>
      {filteredBlogs.map(blog => (
        <div className="post-wrapper" key={blog.id}>
          <h2 className="title">{blog.title}</h2>
          <img className="image" src={`https://res.cloudinary.com/dlctj1zzp/${blog.picture}`} alt={blog.title} />
          <p className="content">{blog.content.split(" ").slice(0, 10).join(" ") + "..."}</p>
          <p className="category"><a>Category: </a> {blog.category}</p>
          <div className="author-info">
            <span><a>User: </a>{blog.author_username}</span>
          </div>
          <p className="timestamp">Posted on: {new Date(blog.timestamp).toLocaleString()}</p>
          <div className="recipeRating">
          <img src={blog.rating >= 1 ? '/icons8-star-50(1).png' : '/icons8-star-50.png'} alt="star" className="star" />

            <img src={blog.rating >= 2 ? '/icons8-star-50(1).png' : '/icons8-star-50.png'} alt="star" className="star" />
            <img src={blog.rating >= 3 ?'/icons8-star-50(1).png' : '/icons8-star-50.png'} alt="star" className="star" />
            <img src={blog.rating >= 4 ? '/icons8-star-50(1).png' : '/icons8-star-50.png'} alt="star" className="star" />
            <img src={blog.rating == 5 ? '/icons8-star-50(1).png' : '/icons8-star-50.png'} alt="star" className="star" />
          </div>
          <Link to={`/blogs/${blog.id}`} className="read-more-link">Read More</Link>
        </div>
      ))}
    </div>
  );
}

export default PostList;