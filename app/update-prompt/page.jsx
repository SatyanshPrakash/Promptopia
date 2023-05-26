"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';


const EditPrompt = () => {
    const [submitting, setSumbmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });
    const router = useRouter();
    const { data:session } = useSession();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const updatePrompt = async(e) => {
        e.preventDefault();
        setSumbmitting(true);

        if(!promptId) return alert('Prompt ID not found');
        try{
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session.user.id,
                    tag: post.tag

                })
            });

            if(response.ok){
                router.push('/')
            }
        }catch(error){

        }
    }

    useEffect(() => {
      const getPromptDetails = async() => {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();

        setPost({
          prompt: data.prompt,
          tag: data.tag
        })
      }
      if(promptId) getPromptDetails();
    }, [promptId])

  return (
    <Form 
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt;