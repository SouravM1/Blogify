import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-6 sm:py-8 lg:py-12 xl:py-16 bg-white'>
        <Container>
            <div className="mb-6 sm:mb-8 lg:mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                ✍️ Create New Post
              </h1>
              <p className="text-gray-600 text-base sm:text-lg">
                Share your thoughts with the world
              </p>
            </div>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost