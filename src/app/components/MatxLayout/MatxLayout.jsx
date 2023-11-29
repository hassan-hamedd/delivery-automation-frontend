import React from 'react'
import { MatxLayouts } from './index'
import { MatxSuspense } from 'src/app/components'
import useSettings from 'src/app/hooks/useSettings'

const MatxLayout = (props) => {
    const { settings } = useSettings()
    const Layout = MatxLayouts[settings.activeLayout]

    return (
        <MatxSuspense>
            <Layout {...props} />
        </MatxSuspense>
    )
}

export default MatxLayout
