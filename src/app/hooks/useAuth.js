import { useContext } from 'react'
import AuthContext from 'src/app/contexts/JWTAuthContext'

const useAuth = () => useContext(AuthContext)

export default useAuth
