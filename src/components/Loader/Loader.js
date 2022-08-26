import { BallTriangle } from 'react-loader-spinner'
import { LoaderContainer } from './Loader.styled'

const Loader = () => {
  return (
    <LoaderContainer>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color='#3f51b5'
        ariaLabel='ball-triangle-loading'
        wrapperClass={{}}
        wrapperStyle=''
        visible={true}
      />
    </LoaderContainer>
  )
}

export default Loader
