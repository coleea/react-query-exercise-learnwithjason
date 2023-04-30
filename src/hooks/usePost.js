import React from 'react'
import axios from 'axios'
import { useQuery, queryCache } from 'react-query';
import z from 'zod'

const schema = z.object({
  body  : z.string(),
  id  :   z.number(),
  title  : z.string(),
  userId  : z.number(),
  // userId  : z.string(),
})

// type schemaType = z.schema<typeof schema>

export const fetchPost = (postId) =>
  axios.get(`/api/posts/${postId}`)
  .then((res) => {
    schema.parse(res.data)
    return res.data    
    // try {
    //   schema.parse(res.data)
    //   return res.data
      
    // } catch (error) {
      
    // }
    // console.log({res});
  })

export default function usePost(postId) {
  return useQuery(
    ['posts', postId],
    () => fetchPost(postId), 
    {
      // options  
      initialData: () => queryCache.getQueryData('posts')?.find(d => d.id == postId),
      initialStale: true,      
      onError : (error) => { console.log("에러발생") } ,
      // suspense : true,
    }
  )
}
