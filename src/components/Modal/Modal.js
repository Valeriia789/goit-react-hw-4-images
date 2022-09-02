import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { Overlay, ModalContainer } from './Modal.styled'

const modalRoot = document.querySelector('#modal-root')

const Modal = ({ children, onCloseModal }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal()
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onCloseModal])

  const handleBackdropClick = e => {
    // e.currentTarget - на чому спрацював обробник подій
    // e.target - те, на чому ми клікнули

    if (e.currentTarget === e.target) {
      onCloseModal()
    }
  }

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalContainer>{children}</ModalContainer>
    </Overlay>,
    modalRoot
  )
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onCloseModal: PropTypes.func.isRequired
}

export default Modal
