// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Paste App. All rights reserved by Salim Sk.
        </p>
        <div className="mt-2">
          <a
            href="https://github.com/your-github-devsalimsk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white mx-2"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/salimthedeveloper/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white mx-2"
          >
            LinkedIn
          </a>
          {/* Add more links if needed */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
