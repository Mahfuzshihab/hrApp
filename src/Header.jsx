import { Link } from 'react-router-dom';
import './styles/Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo-sec">
                <h1 className="logo">HR App</h1>
            </div>

            <nav className="nav">
                <ul>
                    <li><Link to="/">Employees</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/add">Add Employee</Link></li>
                    <li><a href="http://localhost:3000/employees" target="_blank" rel="noopener noreferrer">Backend Info</a></li>

                </ul>
            </nav>
        </header>
    );
};

export default Header;