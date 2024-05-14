// PostForm.js

/*import  { useState } from 'react';
import PropTypes from 'prop-types';

const PostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [recipeLink, setRecipeLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields here
    // Call onSubmit function with form data
    onSubmit({ title, description, image, recipeLink });
    // Clear form fields
    setTitle('');
    setDescription('');
    setImage('');
    setRecipeLink('');
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <label>
        Recipe Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Image URL:
        <input type="url" value={image} onChange={(e) => setImage(e.target.value)} required />
      </label>
      <label>
        Recipe Link:
        <input type="url" value={recipeLink} onChange={(e) => setRecipeLink(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

PostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PostForm;
*/


/**In this component:

We use the useState hook to manage the form state (title, description, image, recipeLink).
The form fields are controlled components, meaning their values are controlled by state and updated through onChange handlers.
When the form is submitted, the onSubmit function is called with the form data as an argument. */

import { useState } from 'react';
import PropTypes from 'prop-types';

const PostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [recipeLink, setRecipeLink] = useState('');
  const [category, setCategory] = useState('Breakfast');
  const [rating, setRating] = useState(1);

  const handleChange = (e) => {
    setCategory(e.target.value);
    setRating(e.target.value === '1'? 1 : e.target.value === '2'? 2 : e.target.value === '3'? 3 : e.target.value === '4'? 4 : 5);
  }
  const handleImageChange = (e) => {
    setImage(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!title ||!description ||!image ||!recipeLink ||!category ||!rating) {
      alert('Please fill out all required fields.');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('picture', image);
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
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      // Handle success
      const data = await response.json();
      console.log(data); // Log the response data
      onSubmit(formData); // Pass the form data to the parent component
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the form.');
    }

    // Clear form fields after submission
    setTitle('');
    setDescription('');
    setImage('');
    setRecipeLink('');
    setCategory('Breakfast');
    setRating(5/5);
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      {/* Form fields */}
      <label>
        Recipe Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Image URL:
        <input type="url" value={image} onChange={handleImageChange} required />
      </label>
      <label>
        Recipe Link:
        <input type="url" value={recipeLink} onChange={(e) => setRecipeLink(e.target.value)} required />
      </label>
      <label>
        Category:
        <select value={category} onChange={handleChange}>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="dessert">Dessert</option>
          <option value="appetizers">Appetizers</option>
          <option value="gluten-free">Gluten-Free</option>
          <option value="vegan">Vegan</option>
        </select>
      </label>
      <label>
        Rating:
        <select value={rating} onChange={handleChange}>
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
