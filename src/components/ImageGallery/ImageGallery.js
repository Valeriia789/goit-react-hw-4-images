import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// import fetchImages from '../../services'
import ImageErrorView from '../ImageErrorView/ImageErrorView'
import Loader from '../Loader/Loader'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import { ImageGalleryList } from './ImageGallery.styled'

import axios from 'axios'

const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '19320063-cda7f2d635216fb573107b42d'

const fetchImages = ({ searchQuery = '', page = 1 } = {}) => {
  return axios
    .get(
      `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&page=${page}&per_page=12`
    )
    .then(response => response.data.hits)
}

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REGECTED: 'regected'
}

const ImageGallery = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [images, setImages] = useState([])
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(Status.IDLE)

  useEffect(() => {
    fetchImages({searchQuery: 'car'}).then(responseImages => setImages(responseImages))
  }, [])

  if (status === Status.IDLE) {
    return <p>Find your first image right now</p>
  }

  if (status === status.PENDING) {
    return <Loader />
  }

  if (status === status.RESOLVED) {
    return (
      <ImageGalleryList>
        {images &&
          images.map(image => <ImageGalleryItem key={image.id} {...image} />)}
      </ImageGalleryList>
    )
  }

  if (status === status.REGECTED) {
    return <ImageErrorView message={error.message} />
    //   <ImageErrorView
    //   message={
    //     'Something went wrong, reload the page and try another request'
    //   }
    // />
  }
}

ImageGallery.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  images: PropTypes.array.isRequired
}

// const ImageGallery = ({ images, isLoading, error }) => {

//   if (isLoading) {
//     return <Loader />
//   }

//   if (error) {
//     return (
//       <ImageErrorView
//         message={
//           'Something went wrong, reload the page and try another request'
//         }
//       />
//     )
//   }

//   return (
//     <ImageGalleryList>
//       {images &&
//         images.map(image => <ImageGalleryItem key={image.id} {...image} />)}
//     </ImageGalleryList>
//   )
// }

// ImageGallery.propTypes = {
//   isLoading: PropTypes.bool.isRequired,
//   error: PropTypes.bool.isRequired,
//   images: PropTypes.array.isRequired
// }

export default ImageGallery
