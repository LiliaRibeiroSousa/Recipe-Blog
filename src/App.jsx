
import './App.css'
import  { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import PostList from './PostList';
import PostForm from './PostForm';
import SignUp from './SignUp'; 
import Login from './Login';
import useLocalStorage from './useLocalStorage';
import ViewBlog from './ViewBlog';


const App = () => {
  // Use the useLocalStorage hook to manage the authentication token
  const [token, setToken] = useLocalStorage('authToken', '');

  // Determine if the user is authenticated based on the presence of a token
  const isAuthenticated =!!token;

  // Sample posts data
  const [posts, setPosts] = useState([]);
  // Handle form submission
  const handleFormSubmit = (formData) => {
    console.log('Form submitted with data:', formData);
    // TODO: Send the form data to a server

    // Example of adding a new post
    const newId = posts.length + 1;
    const newPost = { id: newId,...formData };
    setPosts([...posts, newPost]);
    alert('Recipe posted successfully!');
  };

  return (
    <Router>
     
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} />
        
        {/* Other components */}
        <Routes>
          <Route path="/blogs" element={ <PostList posts={posts} />} /> 
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={ <Login setToken={setToken} />}/> 
          <Route path="/new" element={ <PostForm onSubmit={handleFormSubmit} />} />
          <Route path="/blogs/:id" element={<ViewBlog />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
     
      
    </Router>
  );
}

export default App;




