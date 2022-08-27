import React, {Component, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import fetchImages from '../services'

import Searchbar from './Searchbar/Searchbar'
import Loader from './Loader/Loader'
import ImageGallery from './ImageGallery/ImageGallery'
import ImageErrorView from './ImageErrorView/ImageErrorView'
import LoadMoreBtn from './Button/Button'

import { AppContainer } from './App.styled'


const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REGECTED: 'regected'
}

const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [images, setImages] = useState([])
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(Status.IDLE)

  // useEffect(() => {
  //   //http запрос
  // }, [page, query])

  const onChangeSearchQuery = searchQuery => {
    setSearchQuery(searchQuery)
  }

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1)
  }

  useEffect(() => {
    document.title = `Сторінку змінено ${page} разів`
  }, [page])

  useEffect(() => {
    if (!searchQuery) {
      return
    }
    setStatus(Status.PENDING)

    fetchImages({ searchQuery, page })
      .then(({ data }) => {
        console.log(...data.hits)
        if (setSearchQuery(prevState => prevState !== searchQuery)) {
          setImages(prevState => [...prevState, ...data.hits])
        }
        if (setPage(prevState => prevState !== page)) {
          setImages([...data.hits])
        }
      })

      .then(images => {
        setImages(images)
        setStatus(Status.RESOLVED)
      })
      .catch(error => {
        setError(error)
        setStatus(Status.REGECTED)
      })
  }, [page, searchQuery])


  if (status === Status.IDLE) {
    return <Searchbar onSubmit={onChangeSearchQuery}/>
  }

  if (status === status.PENDING) {
    return <Loader />
  }

  if (status === status.RESOLVED) {
    return <ImageGallery images={images} />
  }

  if (status === status.REGECTED) {
    return <ImageErrorView message={error.message} />
  }
}

export default App


// export default class App extends Component {
//   state = {
//     images: [],
//     page: 1,
//     searchQuery: '',
//     isLoading: false,
//     error: false
//   }

//   componentDidUpdate (_, prevState) {
//     const { searchQuery, page } = this.state
//     const prevPage = prevState.page
//     const nextPage = this.state.page
//     const prevQuery = prevState.searchQuery
//     const nextQuery = this.state.searchQuery

//     fetchImages({ searchQuery, page })
//       .then(({ data }) => {
//         if (prevQuery !== nextQuery) {
//           this.setState({
//             page: 1,
//             images: [...data.hits],
//             isLoading: false
//           })
//         }
//         if (prevPage !== nextPage) {
//           this.setState(prevState => ({
//             images: [...prevState.images, ...data.hits],
//             isLoading: false
//           }))
//         }
//       })
//       .catch(error => {
//         return Promise.reject(
//           new Error(`No images were found for the request ${searchQuery}`)
//         )
//       })
//   }

//   handleSearchbarSubmit = searchQuery => {
//     this.setState({ searchQuery })
//   }

//   handleLoadMore = () => {
//     this.setState(prevState => ({
//       isLoading: true,
//       page: prevState.page + 1
//     }))
//   }

//   handleResetGallery = () => {
//     this.setState({
//       page: 1,
//       images: []
//     })
//   }

//   render () {
//     const { images, isLoading, error } = this.state

//     return (
//       <AppContainer>
//         <Appp />
//         <Searchbar onSearchbarSubmit={this.handleSearchbarSubmit} />

//         <ImageGallery images={images} isLoading={isLoading} error={error} />

//         {images.length !== 0 && (
//           <LoadMoreBtn
//             isLoading={isLoading}
//             handleLoadMore={this.handleLoadMore}
//           />
//         )}

//         <ToastContainer autoClose={5000} />
//       </AppContainer>
//     )
//   }
// }
