import axios from 'axios'
import { useMutation, queryCache,  } from 'react-query'

export default function useSavePost() {
  return useMutation(
    (newPost) => axios
      .patch(`/api/posts/${newPost.id}`, newPost)
      .then((res) => res.data),
    {
      onMutate: (newPost) => {
        // update the data
        // the occurs when just tries 
        // success or fail doesn't matter
        console.log('on mutate');
        queryCache.setQueryData(['posts', newPost.id], newPost)
      },
      onSettled: () => {
        console.log('on settled');
      },      
      onSuccess: (newPost) => {
        console.log('on success');
        queryCache.setQueryData(['posts', newPost.id], newPost)
        
        if (queryCache.getQueryData('posts')) {
          queryCache.setQueryData('posts', old => {
            return old.map(d => {
              if (d.id === newPost.id) {
                return newPost
              }
              return d
            })
          })
        } else {
          queryCache.setQueryData('posts', [newPost])

          // IF invalidateQueries FIRES, ALL REQUEST ABOUT POSTS ARE RE-TRIGGERED
          queryCache.invalidateQueries('posts')
        }
      },
      onError: () => {
        console.log('on error');
      }, 
    }
  )
}
