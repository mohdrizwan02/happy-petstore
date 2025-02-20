import React, { useEffect } from "react";

import Profile from "../components/Profile.jsx";

const ProfilePage = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <>
      <Profile />
    </>
  );
};

export default ProfilePage;
