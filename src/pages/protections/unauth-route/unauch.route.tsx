import { Navigate } from "react-router"
import { getCookie } from "services/utils"
import { FCWithChildren } from "types/component";

const UnauthRoute: FCWithChildren = ({children}) => {
  if(!!getCookie('token') || !!getCookie('refreshToken')) {
    return <Navigate to='/' replace />
  }

  return (
    <>
      {children}
    </>
  )
}


export default UnauthRoute;