import { useContext } from 'react'
import NotificationContext from 'src/app/contexts/NotificationContext'

const useNotification = () => useContext(NotificationContext)

export default useNotification
