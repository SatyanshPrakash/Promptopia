"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';


import Profile from '@components/Profile';

const MyProfile = () => {
    const { data:session } = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    var userId = searchParams.get('id');

    useEffect(() => {
        const fetchPost = async() => {
          if(session?.user?.id === userId || userId === null){
            const response = await fetch(`/api/users/${session?.user?.id}/posts`);
            const data = await response.json();
            setPosts(data);
          }else{
            const response = await fetch(`/api/users/${userId}/posts`);
            const data = await response.json();
            setPosts(data);
          }
        }
        console.log(userId);
        fetchPost();
    }, []) 

    const handleEdit = async(post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async(post) => {
      const hasConfirmed = confirm("Are you sure you want to delete this Prompt?");
      if(hasConfirmed) {
        try{
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: 'DELETE',
          })

          const filteredPosts = posts.filter((p) => {
            p._id !== post._id;
          })

          setPosts(filteredPosts);
        }catch(error){
          console.log(error);
        }
      }
    }
  return (
    <>
    {userId === null ? (
       <Profile 
       name="My"
       desc="Welcome to your personalized profile page"
       data={posts}
       handleEdit={handleEdit}
       handleDelete={handleDelete}
   />
    ) : (<>
    {posts[0]?.creator?._id === session?.user?.id ? (
       <Profile 
       name="My"
       desc="Welcome to your personalized profile page"
       data={posts}
       handleEdit={handleEdit}
       handleDelete={handleDelete}
   />
    ) : (<>
        <Profile 
      name={posts[0]?.creator?.username}
      desc={`Welcome to ${posts[0]?.creator?.username}'s profile page`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
  />
    </>)}
    </>
    )}
   
    </>
  )
}

export default MyProfile;