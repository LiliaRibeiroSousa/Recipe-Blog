import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function ViewBlog() {
    const token = localStorage.getItem('token'); 
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await fetch(`https://salty-temple-86081-1a18659ec846.herokuapp.com/blogs/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Blog data:', data);
                setBlog(data);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        }
        fetchBlogData();
    }, [token, id])


  return (
    <div className="blog">
      <div className="blogCard">
        {blog ? (
            <>
                <h1 className="blogTitle">{blog.title}</h1>
                <p className="author">By: {blog.author_username}</p>
                <p className="datePosted">Posted on: {new Date(blog.timestamp).toLocaleString()}</p>
                <div className="recipeRating">
                    <img src={blog.rating >= 1 ? '../icons/icons8-star-50(1).png' : '../icons/icons8-star-50.png'} alt="hi" className="star" />
                    <img src={blog.rating >= 2 ? '../icons/icons8-star-50(1).png' : '../icons/icons8-star-50.png'} alt="hi" className="star" />
                    <img src={blog.rating >= 3 ? '../icons/icons8-star-50(1).png' : '../icons/icons8-star-50.png'} alt="hi" className="star" />
                    <img src={blog.rating >= 4 ? '../icons/icons8-star-50(1).png' : '../icons/icons8-star-50.png'} alt="hi" className="star" />
                    <img src={blog.rating == 5 ? '../icons/icons8-star-50(1).png' : '../icons/icons8-star-50.png'} alt="hi" className="star" />
                </div>
                <div className="recipeImage">
                    <img src={`https://res.cloudinary.com/dlctj1zzp/${blog.picture}`} alt={blog.title} className="foodPic" />
                </div>
                <p className="recipeLink">
                    View this recipe at:
                    <a href={blog.link}>{blog.link}</a>
                </p>
                <div className="blogContentContainer">
                    <p className="blogContent">{blog.content}</p>
                </div>
            </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="commentHeader">
        <h2>Comments</h2>
      </div>
    </div>
  );
}