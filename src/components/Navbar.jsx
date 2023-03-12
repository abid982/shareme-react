import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  // If there is no user then return null
  console.log('User in navbar component:');
  console.log(user);
  if (!user) return null;

  // Otherwise show navigation bar

  // Only show the navbar if the user exits
  return (
    <div className="flex items-center gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none foucus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={e => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      <div className="flex gap-3">
        <Link to={`user-profile/${user?._id}`} className="hidden md:block">
          <img src={user.image} alt="user" className="w-10 h-10 rounded-full" />
        </Link>
        {/* Lead to create pin */}
        <Link
          to={`create-pin`}
          className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
        >
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

/**
 * image
:
"https://lh3.googleusercontent.com/a/AGNmyxZE4pyyLcox72v5Wf4awDGIyJ-ojAmJlbVyi91IBw=s96-c"
userName
:
"Abid Arif"
_createdAt
:
"2023-03-12T09:38:32Z"
_id
:
"117830089723558160117"
_rev
:
"5ZTnVWRJBflyPAS4lOlmqB"
_type
:
"user"
_updatedAt
:
"2023-03-12T09:38:32Z"
 */
