import React, { PureComponent, Component } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import fetchImages from '../services'

import Searchbar from './Searchbar/Searchbar'
import ImageGallery from './ImageGallery/ImageGallery'
import LoadMoreBtn from './Button/Button'

import { AppContainer } from './App.styled'

export default class App extends Component {
  state = {
    images: [],
    page: 1,
    searchQuery: '',
    isLoading: false,
    error: false
  }

  componentDidUpdate (_, prevState) {
    const { searchQuery, page } = this.state
    const prevPage = prevState.page
    const nextPage = this.state.page
    const prevQuery = prevState.searchQuery
    const nextQuery = this.state.searchQuery

    fetchImages({ searchQuery, page })
      .then(({ data }) => {
        if (prevQuery !== nextQuery) {
          this.setState({
            page: 1,
            images: [...data.hits],
            isLoading: false
          })
        }
        if (prevPage !== nextPage) {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            isLoading: false
          }))
        }
      })
      .catch(error => {
        return Promise.reject(
          new Error(`No images were found for the request ${searchQuery}`)
        )
      })
  }

  handleSearchbarSubmit = searchQuery => {
    this.setState({ searchQuery })
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      isLoading: true,
      page: prevState.page + 1
    }))
  }

  handleResetGallery = () => {
    this.setState({
      page: 1,
      images: []
    })
  }

  render () {
    const { images, isLoading, error } = this.state

    return (
      <AppContainer>
        <Searchbar
          onSearchbarSubmit={this.handleSearchbarSubmit}
          onResetGallery={this.handleResetGallery}
        />

        <ImageGallery images={images} isLoading={isLoading} error={error} />

        {images.length !== 0 && (
          <LoadMoreBtn
            isLoading={isLoading}
            handleLoadMore={this.handleLoadMore}
          />
        )}

        <ToastContainer autoClose={5000} />
      </AppContainer>
    )
  }
}