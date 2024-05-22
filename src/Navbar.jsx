
import { Link, NavLink } from 'react-router-dom'; 

const Navbar = () => {

    const handleLogOut = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://salty-temple-86081-1a18659ec846.herokuapp.com/logout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Logout successful');
        }catch (error) {
            console.error('Error logging out:', error);
        }

        localStorage.removeItem('token');
    }

    return (
        <div className="header">
        <nav className='navbar'>
            <div className="logo">
            <Link to="/">Tasty Tales</Link> 
            </div>
            <ul>
            <li><NavLink to="/new">New Post</NavLink></li>
            <li><NavLink to="/blogs">Feed</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/signup">Sign Up</NavLink></li>
            <li onClick={() => handleLogOut()}><Link to="/">Log Out</Link></li>
            
            </ul>
        </nav>
        </div>
    );
};

export default Navbar;