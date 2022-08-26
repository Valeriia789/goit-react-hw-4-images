import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '19320063-cda7f2d635216fb573107b42d'

const fetchImages = ({ searchQuery, page }) => {
  return axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&page=${page}&per_page=12`
  )
}

fetchImages.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired
}

export default fetchImages
