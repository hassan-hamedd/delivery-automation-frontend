import '../fake-db'
import React from 'react'
import { Store } from './redux/Store'
import { Provider } from 'react-redux'
import { AllPages } from './routes/routes'
import { MatxTheme } from 'src/app/components'
import { useRoutes } from 'react-router-dom'
import { AuthProvider } from 'src/app/contexts/JWTAuthContext'
import { SettingsProvider } from 'src/app/contexts/SettingsContext'

const App = () => {
    const all_pages = useRoutes(AllPages())

    return (
        <Provider store={Store}>
            <SettingsProvider>
                <MatxTheme>
                    <AuthProvider>{all_pages}</AuthProvider>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
}

export default App
