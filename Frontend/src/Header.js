import React from 'react';
const Header = () => {
  return (
    <header className="header">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b2dbb1b5f83bf50b00f22bca48668129ee31dc38adf54e60a68839cc1710d37?apiKey=f7a84a3244c847b980b62828a7d406c5&"
        alt="Event logo"
        className="logo"
      />
      <nav className="nav-links">
        <a href="#" className="nav-item">Home</a>
        <a href="#" className="nav-item">About</a>
        <a href="#" className="nav-item">Collaborate</a>
        <a href="#" className="nav-item">Events</a>
      </nav>
      <a href="#" className="account-btn">My Account</a>
    </header>
  );
};

export default Header;
