import { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Comments from "./Comments";


export default function ViewBlog() {
    const token = localStorage.getItem('token'); 
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    // const [userId, setUserId] = useState(null);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await fetch(`https://salty-temple-86081-1a18659ec846.herokuapp.com/users/`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Token ${token}`
    //                 },
    //             });
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const data = await response.json();
    //             console.log('User data:', data);
    //             setUserId(data.id);
    //         } catch (error) {
    //             console.error('Error fetching user:', error);
    //         }
    //     }
    //     fetchUserData();
    // }, [token])


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

    const handleDeleteBlog = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
        if (!confirmDelete) {
            return;
        }
        try {
            const response = await fetch(`https://salty-temple-86081-1a18659ec846.herokuapp.com/blogs/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Blog deleted successfully');
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    }

    const handleEditBlog = async (id) => {
        try {
            const newContent = prompt('Enter the new content for the blog:');
            if (!newContent) {
                return;
            }
            const response = await fetch(`https://salty-temple-86081-1a18659ec846.herokuapp.com/blogs/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({ content: newContent })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Blog edited successfully');
            const updatedBlog = { ...blog, content: newContent };
            setBlog(updatedBlog);
        }catch (error) {
            console.error('Error editing blog:', error);
        }
    }


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
                <div className="editAndDelete">
                    <p className="edit" onClick={() => handleEditBlog(blog.id)}>Edit</p>
                    <p className="delete" onClick={() => handleDeleteBlog(blog.id)}>Delete</p>
                </div>
            </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="commentSection">
        <Routes>
          <Route index element={<Comments />} />
        </Routes>
      </div>
    </div>
  );
}