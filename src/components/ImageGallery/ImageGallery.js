import React from 'react'
import PropTypes from 'prop-types'

import ImageErrorView from '../ImageErrorView/ImageErrorView'
import Loader from '../Loader/Loader'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import { ImageGalleryList } from './ImageGallery.styled'

const ImageGallery = ({ images, isLoading, error }) => {
  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return (
      <ImageErrorView
        message={
          'Something went wrong, reload the page and try another request'
        }
      />
    )
  }

  return (
    <ImageGalleryList>
      {images &&
        images.map(image => <ImageGalleryItem key={image.id} {...image} />)}
    </ImageGalleryList>
  )
}

ImageGallery.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  images: PropTypes.array.isRequired
}

export default ImageGallery
