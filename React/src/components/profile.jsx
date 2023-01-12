import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <Link
        to="/logout"
        className="btn btn-primary"
        style={{ marginBottom: 20 }}
      >
        Logout
      </Link>
    </div>
  );
};

export default Profile;
