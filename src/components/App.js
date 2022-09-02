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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const onChangeSearchQuery = searchQuery => {
    setSearchQuery(searchQuery)
    setPage(1)
    setImages([])
    setError(null)
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
          console.log('new page')
          setImages(prevImages => [...prevImages, ...responseImages])
        } else {
          console.log('new searchQuery')
          setImages([...responseImages])
        }
      })
      .catch(error => {
        setError(error)
      })
      .finally(() => setIsLoading(false))
  }, [page, searchQuery])

  // useEffect(() => {
  //   setIsLoading(true)

  //   fetchImages({ page })
  //     .then(responseImages => {
  //       console.log({ responseImages })
  //       setImages(prevImages => [...prevImages, ...responseImages])
  //     })
  //     .catch(error => {
  //       setError(error.message)
  //     })
  //     .finally(() => setIsLoading(false))
  // }, [page])

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
