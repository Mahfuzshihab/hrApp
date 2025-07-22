import React from 'react';
import './styles/Footer.css';

const Footer = () => {
    return (
        <footer className="app-footer">
            <p>© {new Date().getFullYear()} HR App | Copyright by Mahfuz</p>
        </footer>
    );
};

export default Footer;