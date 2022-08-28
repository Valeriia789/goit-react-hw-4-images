import React, { Component, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import fetchImages from '../services'

import Searchbar from './Searchbar/Searchbar'
import Loader from './Loader/Loader'
import ImageGallery from './ImageGallery/ImageGallery'
import ImageErrorView from './ImageErrorView/ImageErrorView'
import LoadMoreBtn from './Button/Button'

import { AppContainer } from './App.styled'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [images, setImages] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const onChangeSearchQuery = searchQuery => {
    setSearchQuery({ searchQuery })
    setPage(1)
    setImages([])
    setError(null)
  }

  // const handleSearchbarSubmit = searchQuery => {
  //   this.setState({ searchQuery })
  // }

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1)
  }

  useEffect(() => {
    if (!searchQuery) {
      return
    }
    fetchImages({ query: searchQuery })
      .then(responseImages => {
        console.log({ responseImages })
        setImages([...responseImages])
      })
      .catch(error => {
        setError(error.message)
      })
      .finally(() => setIsLoading(false))
  }, [searchQuery])

  useEffect(() => {
    fetchImages({ page })
      .then(responseImages => {
        console.log({ responseImages })
        setImages(prevImages => [...prevImages, ...responseImages])
      })
      .catch(error => {
        setError(error.message)
      })
      .finally(() => setIsLoading(false))
  }, [page])

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

// useEffect(() => {
//   document.title = `Сторінку змінено ${page} разів`
// }, [page])
