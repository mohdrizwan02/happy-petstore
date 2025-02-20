import React, { useEffect } from 'react'
import EditProfile from '../components/EditProfile'

const EditProfilePage = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <>
    <EditProfile/>
    </>
  )
}

export default EditProfilePage