import React, { useEffect } from 'react'

const UserBlogs = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <div>UserBlogs</div>
  )
}

export default UserBlogs