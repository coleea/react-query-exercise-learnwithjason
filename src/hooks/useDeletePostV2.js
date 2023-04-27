import React from 'react'
import axios from 'axios'
import { queryCache, useMutation, useQuery } from 'react-query'

export default function useDeletePost(postId) {
  return useMutation(
    () => axios.delete(`/api/posts/${postId}`).then((res) => res.data),
    {
      // initialData: () => queryCache.getQueryData('posts')?.find(d => d.id == postId),
      // initialStale: true,
      onSuccess : () => {
        console.log('DELETE SUCCESS');
        queryCache.invalidateQueries('posts')
        //ffffff
      } ,
    }
  )

  // const [state, setState] = React.useReducer((_, action) => action, {
  //   isIdle: true,
  // })

  // const mutate = React.useCallback(async (postId) => {
  //   setState({ isLoading: true })
  //   try {
  //     await axios.delete(`/api/posts/${postId}`).then((res) => res.data)
  //     setState({ isSuccess: true })
  //   } catch (error) {
  //     setState({ isError: true, error })
  //   }
  // }, [])

  // return [mutate, state]
}
