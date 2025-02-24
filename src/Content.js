import React from 'react';
import './Content.css';

const Content = () => {
  return (
    <main className="content">
        <div>        
        <div className='website-banner'>
            <h1>Farmer's Market</h1>
        </div> 
        <div>
            <h2>Welcome to MyStore</h2>
            <p>Find the best products at the best prices!</p>
      </div>
      <button className='know-btn'>Know More</button>
      </div>
      <div>
        <img src="https://res.cloudinary.com/dzmhdzvfb/image/upload/v1740377517/variety-of-fresh-organic-vegetables-and-fruits-in-the-garden_ksalbl.jpg" />
      </div>
    </main>
  );
};

export default Content;
