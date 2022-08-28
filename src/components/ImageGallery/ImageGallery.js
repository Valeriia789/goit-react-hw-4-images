import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// import fetchImages from '../../services'
import ImageErrorView from '../ImageErrorView/ImageErrorView'
import Loader from '../Loader/Loader'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import { ImageGalleryList } from './ImageGallery.styled'

const ImageGallery = ({ images, isLoading, error }) => {
  // if (isLoading) {
  //   return <Loader />
  // }

  // if (error) {
  //   return (
  //     <ImageErrorView
  //       message={
  //         'Something went wrong, reload the page and try another request'
  //       }
  //     />
  //   )
  // }

  return (
    <ImageGalleryList>
      {isLoading && <Loader />}
      {images &&
        images.map(image => <ImageGalleryItem key={image.id} {...image} />)}
        {error && <ImageErrorView message={error.message} />}
    </ImageGalleryList>
  )
}

// ImageGallery.propTypes = {
//   isLoading: PropTypes.bool.isRequired,
//   error: PropTypes.bool.isRequired,
//   images: PropTypes.array.isRequired
// }

export default ImageGallery


// const Status = {
  //   IDLE: 'idle',
  //   PENDING: 'pending',
  //   RESOLVED: 'resolved',
  //   REGECTED: 'regected'
  // }
  
  // const ImageGallery = () => {
  //   const [query, setQuery] = useState('')
  //   const [images, setImages] = useState([])
  //   const [error, setError] = useState(null)
  //   const [status, setStatus] = useState(Status.IDLE)
  
    // useEffect(() => {
    //   fetchImages({searchQuery: query}).then(responseImages => setImages(responseImages))
    // }, [query])
  
  //   if (status === Status.IDLE) {
  //     return <p>Find your first image right now</p>
  //   }
  
  //   if (status === status.PENDING) {
  //     return <Loader />
  //   }
  
  //   if (status === status.RESOLVED) {
  //     return (
  //       <ImageGalleryList>
  //         {images &&
  //           images.map(image => <ImageGalleryItem key={image.id} {...image} />)}
  //       </ImageGalleryList>
  //     )
  //   }
  
  //   if (status === status.REGECTED) {
  //     return <ImageErrorView message={error.message} />
  //   }
  // }