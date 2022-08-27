import { useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import {
  SearchbarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput
} from './Searchbar.styled'

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleQueryChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase())
  }

  const handleSubmit = e => {
    e.preventDefault()
    // if (searchQuery.trim() === '') {
    //   toast.info('Введіть пошуковий запит')
    //   return
    // }

    onSubmit(searchQuery)
    setSearchQuery('')
  }

  return (
    <SearchbarContainer>
      <header>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type='submit'>
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            name='searchQuery'
            value={searchQuery}
            onChange={handleQueryChange}
            type='text'
            autoComplete='off'
            autoFocus
            placeholder='Search images and photos'
          />
        </SearchForm>
      </header>
    </SearchbarContainer>
  )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default Searchbar
