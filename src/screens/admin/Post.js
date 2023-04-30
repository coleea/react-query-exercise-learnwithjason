import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import usePost from '../../hooks/usePost'
import useSavePost from '../../hooks/useSavePost'
import useDeletePost from '../../hooks/useDeletePost'
import useDeletePostV2 from '../../hooks/useDeletePostV2'

import PostForm from '../../components/PostForm'
import { Loader } from '../../components/styled'

export default function Post() {

  const { postId } = useParams()
  const navigate = useNavigate()

  const postQuery = usePost(postId)
  const [savePost, savePostInfo] = useSavePost()
  const [deletePost, deletePostInfo] = useDeletePost()
  const [deleteQueryFunc, something] =   useDeletePostV2(postId)

  console.log('deleteQuery', );
  console.log(deleteQueryFunc );
  
  console.log('something');
  console.log(something);

  const onSubmit = async (values) => {
    await savePost(values)
  }

  const onDelete = async () => {
    await deleteQueryFunc(postId)
    // await deletePost(postId)
    navigate('/admin')
  }

  console.log("postQuery.status");
  console.log(postQuery.status);

  if(postQuery.isLoading === "error"){ 
    return <>
      <h1>ERROR</h1>
    </>
  }

  return (
    <>
      {postQuery.isLoading ? (
        <span>
          <Loader /> Loading...
        </span>
      ) : (
        <div>
          <h3>{postQuery.data.title}</h3>
          <p>
            <Link to={`/blog/${postQuery.data.id}`}>View Post</Link>
          </p>
          <PostForm
            initialValues={postQuery.data}
            onSubmit={onSubmit}
            submitText={
              savePostInfo.isLoading
                ? 'Saving...'
                : savePostInfo.isError
                ? 'Error!'
                : savePostInfo.isSuccess
                ? 'Saved!'
                : 'Save Post'
            }
          />
          <p>
            <button onClick={onDelete}>
              {
                `STATUS : ${something.status}`
              }
              {/* {deletePostInfo.isLoading
                ? 'Deleting...'
                : deletePostInfo.isError
                ? 'Error!'
                : deletePostInfo.isSuccess
                ? 'Deleted!'
                : 'Delete Post'
                } */}
            </button>
          </p>
        </div>
      )}
    </>
  )
}
