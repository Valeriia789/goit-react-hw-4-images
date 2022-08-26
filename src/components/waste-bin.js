// import React from 'react'
// import axios from 'axios'

// throw new Error() - викликати помилку
// debugger

// const API_KEY = '19320063-cda7f2d635216fb573107b42d'


// export const getImages = async (searchQuery, page) => {
//   try {
//     const response = await axios.get(
//       `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&page=${page}&per_page=3`
//     )
//     return response.data.hits
//   } catch (error) {
//     return Promise.reject(
//       new Error(`No images were found for the request ${searchQuery}`)
//     )
//   }
//


// FROM App:
// import axios from 'axios'
// async componentDidMount () {
//   try {
//     this.setState({ isLoading: true })
//     const images = await API.getImages()
//     this.setState({ images, isLoading: false })
//   } catch (error) {
//     this.setState({ error: true, isLoading: false })
//     console.log(error)
//   }
// }

// async getImages () {
//   const { searchQuery, page } = this.state
//   const response = await axios.get(
//     `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&page=${page}&per_page=12`
//   )
//   return await response.data.hits
// }

// async componentDidUpdate (_, prevState) {
//   const images = await this.getImages()

//   const prevPage = prevState.page
//   const nextPage = this.state.page

//   const prevQuery = prevState.searchQuery
//   const nextQuery = this.state.searchQuery

//   if (prevQuery !== nextQuery) {
//     ;(async () => {
//       try {
//         this.setState({
//           images: images,
//           isLoading: true
//         })
//       } catch (error) {
//         return Promise.reject(new Error(`Send us a normal request`))
//       }
//     })()
//   }

//   if (prevPage !== nextPage) {
//     ;(async () => {
//       try {
//         this.setState({
//           images: [...prevState.images, ...images],
//           isLoading: true
//         })
//       } catch (error) {
//         return Promise.reject(new Error())
//       }
//     })()
//   }
// }




// componentDidUpdate (_, prevState) {
//   const { searchQuery, page } = this.state

//   const prevPage = prevState.page
//   const nextPage = this.state.page
//   const prevQuery = prevState.searchQuery
//   const nextQuery = this.state.searchQuery

//   fetch(
//     `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&page=${page}&per_page=12`
//   )
//     .then(response => response.json())
//     .then(
//       result => {
//         if (prevQuery !== nextQuery) {
//           this.setState({
//             page: 1,
//             images: [...result.hits],
//             isLoading: false
//           })
//         }
//         if (prevPage !== nextPage) {
//           this.setState(prevState => ({
//             isLoading: false,
//             images: [...prevState.images, ...result.hits]
//           }))
//         }
//       },
//       // Примітка: важливо обробляти помилки саме тут,
//       // а не в блоці catch (), щоб не перехоплювати
//       // виключення з помилок в самих компонентах.
//       error => {
//         this.setState({
//           isLoading: true,
//           error
//         })
//       }
//     )
// }


// const getImages = ({ searchQuery, page }) => {
//   const fetchImages = fetch(
//     `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&page=${page}&per_page=12`
//   )
//     .then(response => {
//       if (response.ok) {
//         return response.json()
//       }
//       return Promise.reject(
//         new Error(`No images were found for the request ${searchQuery}`)
//       )
//     })
//     .then(result => {
//       const images = result.hits
//       return images
//     })
//     .catch(error => {
//       {
//         return Promise.reject(
//           new Error(`No images were found for the request ${searchQuery}`)
//         )
//       }
//     })
//   return fetchImages
// }

// componentDidUpdate (_, prevState) {
//   const { searchQuery, page } = this.state
//   const prevPage = prevState.page
//   const nextPage = this.state.page
//   const prevQuery = prevState.searchQuery
//   const nextQuery = this.state.searchQuery

//   fetchImages({ searchQuery, page })
//     .then(({ data }) => {
//       if (prevQuery !== nextQuery) {
//         this.setState({
//           page: 1,
//           images: [...data.hits],
//           isLoading: false
//         })
//       }
//       if (prevPage !== nextPage) {
//         this.setState(prevState => ({
//           images: [...prevState.images, ...data.hits],
//           isLoading: false
//         }))
//       }
//     })
//     .catch(error => {
//       return Promise.reject(
//         new Error(`No images were found for the request ${searchQuery}`)
//       )
//     })
// }