import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import fetchImages from '../services'

import Searchbar from './Searchbar/Searchbar'
import ImageGallery from './ImageGallery/ImageGallery'
import LoadMoreBtn from './Button/Button'

import { AppContainer } from './App.styled'

const App = () => {
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const onChangeSearchQuery = searchQuery => {
    setSearchQuery(searchQuery)
    setPage(1)
    setImages([])
    setError(false)
  }

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  useEffect(() => {
    if (!searchQuery) {
      return
    }

    setIsLoading(true)

    fetchImages({ query: searchQuery, page })
      .then(responseImages => {
        if (page > 1) {
          setImages(prevImages => [...prevImages, ...responseImages])
          setError(false)
        } else {
          setImages([...responseImages])
          setError(false)
        }
      })
      .catch(error => {
        setError(true)
      })
      .finally(() => setIsLoading(false))
  }, [page, searchQuery])

  return (
    <AppContainer>
      <Searchbar onSubmit={onChangeSearchQuery} />

      {images && (
        <ImageGallery images={images} isLoading={isLoading} error={error} />
      )}

      {images.length !== 0 && (
        <LoadMoreBtn isLoading={isLoading} handleLoadMore={handleLoadMore} />
      )}

      <ToastContainer autoClose={5000} />
    </AppContainer>
  )
}

export default App
