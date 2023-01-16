import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {

  return (
    <header className='header'>
        <h1>{title}</h1>
        <Button text={showAdd ? 'Cancel':'Add'}
        onClick={onAdd}
        color={showAdd ? 'red':'green'}
        />
    </header>
  )
}

Header.defaultProps = {
    title: 'Default Title',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,  
}

export default Header