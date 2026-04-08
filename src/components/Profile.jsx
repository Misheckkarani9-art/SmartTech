import React, { useState, useEffect } from "react";
import "../css/Profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    profilePic: null,
  });
  const [editing, setEditing] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("profileUser"));
    if (savedUser) {
      setUser(savedUser);
      setLoggedIn(true);
    }
  }, []);

  // Save user to localStorage and update navbar
  const saveUser = () => {
    localStorage.setItem("profileUser", JSON.stringify(user));
    setEditing(false);
    setLoggedIn(true);

    // Update navbar profile image
    localStorage.setItem("navbarProfileImg", user.profilePic || "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleProfilePic = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser({ ...user, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const logout = () => {
    localStorage.removeItem("profileUser");
    localStorage.removeItem("navbarProfileImg");
    setUser({
      name: "",
      email: "",
      phone: "",
      profilePic: null,
    });
    setLoggedIn(false);
    setEditing(false);
  };

  if (!loggedIn) {
    return (
      <div className="profile-container">
        <h2>Create Your Profile</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={user.phone}
          onChange={handleChange}
        />
        <input type="file" accept="image/*" onChange={handleProfilePic} />
        <button className="btn" onClick={saveUser}>Save Profile</button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <div className="profile-pic">
          {user.profilePic ? (
            <img src={user.profilePic} alt="Profile" />
          ) : (
            <div className="placeholder">Add Picture</div>
          )}
        </div>

        {editing ? (
          <>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
            <input type="file" accept="image/*" onChange={handleProfilePic} />
            <button className="btn" onClick={saveUser}>Save</button>
            <button className="btn cancel" onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <button className="btn" onClick={() => setEditing(true)}>Edit Profile</button>
            <button className="btn logout" onClick={logout}>Log Out</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;