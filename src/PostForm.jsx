

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const PostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState(null);
  const [recipeLink, setRecipeLink] = useState('');
  const [category, setCategory] = useState('Breakfast');
  const [rating, setRating] = useState(1);

  const navigate = useNavigate(); 

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!title || !description || !recipeLink || !category || !rating || !picture) {
      alert('Please fill out all required fields.');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('picture', picture);
    formData.append('link', recipeLink);
    formData.append('content', description);
    formData.append('rating', rating);
    formData.append('category', category);
    formData.append('title', title);

    try {
      // Make the POST request
      const response = await fetch('https://salty-temple-86081-1a18659ec846.herokuapp.com/blogs/', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}` // Include the token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      // Handle success
      const data = await response.json();
      console.log(data); // Log the response data
      onSubmit(formData); // Pass the form data to the parent component

      // Store the token in localStorage if it's not already there
      if (!localStorage.getItem('token')) {
        localStorage.setItem('token', data.token);
      }
    // Redirect to blogs page
    navigate('/blogs');
  } catch (error) {
    console.error('Error:', error);
    alert('There was an error submitting the form.');
  }

    // Clear form fields after submission
    setTitle('');
    setDescription('');
    setPicture(null);
    setRecipeLink('');
    setCategory('Breakfast');
    setRating(1);
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <h2>New Post</h2>
      {/* Form fields */}
      <label>
        Recipe Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Review:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Image:
        <input type="file" id="imageInput" onChange={handleFileChange} required />
      </label>
      <label>
        Recipe Link:
        <input type="url" value={recipeLink} onChange={(e) => setRecipeLink(e.target.value)} required />
      </label>
      <label>
        Category:
        <select value={category} onChange={handleCategoryChange}>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
          <option value="Appetizers">Appetizers</option>
          <option value="Gluten-Free">Gluten-Free</option>
          <option value="Vegan">Vegan</option>
        </select>
      </label>
      <label>
        Rating:
        <select value={rating} onChange={handleRatingChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <button type="submit">Post</button>
    </form>
  );
};

PostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PostForm;