import { Navigate } from "react-router"
import { getCookie } from "services/utils"
import PropTypes from "prop-types";

const UnauthRoute = ({ children }) => {
  if(!!getCookie('token') || !!getCookie('refreshToken')) {
    return <Navigate to='/' replace />
  }
  
  return (
    <>
      {children}
    </>
  )
}

UnauthRoute.propTypes = {
  children: PropTypes.element.isRequired
}


export default UnauthRoute;