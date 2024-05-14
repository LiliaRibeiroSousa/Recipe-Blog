
import { Link } from 'react-router-dom'; // If you're using React Router for navigation

const Navbar = () => {
    return (
        <div className="header">
        <nav className='navbar'>
            <div className="logo">
            <Link to="/">Our Food Blog</Link> {/* Assuming you have a homepage */}
            </div>
            <ul>
            <li><Link to="/new">New Post</Link></li>
            <li><Link to="/blogs">Feed</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            
            </ul>
        </nav>
        </div>
    );
};

export default Navbar;