import { useContext } from 'react'
import SettingsContext from 'src/app/contexts/SettingsContext'

const useSettings = () => useContext(SettingsContext)

export default useSettings
