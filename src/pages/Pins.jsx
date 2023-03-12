import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import a lot of components
import { Navbar, Feed, PinDetail, CreatePin, Search } from './../components';

const Pins = ({ user }) => {
  // Share accross multiple components
  // Search term state
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          {/* In PinDetail we will provide the user and this user is coming through prop */}
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail user={user} />}
          />
          {/* We need to know who cretes a specific pin */}
          <Route path="/create-pin" element={<CreatePin user={user} />} />
          {/* If the user goes to /search we weant to render the search component */}
          {/* We're sharing all of the necesssary details */}
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
