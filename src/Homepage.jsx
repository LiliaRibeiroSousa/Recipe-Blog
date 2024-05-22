import React from 'react';
import { Link } from 'react-router-dom';

import './App.css'

const Homepage = () => {
    return (
        <div className="homepage">
            <h1>Welcome to Tasty Tales!</h1>
            <p>Explore and rate delicious recipes.</p>
            <p><Link to="/signup">Sign up</Link> to begin.</p>
            <p>Already have an account? <Link to="/login">Log in</Link>.</p>
            {/* Add your blog content here */}
        </div>
    );
}

export default Homepage;