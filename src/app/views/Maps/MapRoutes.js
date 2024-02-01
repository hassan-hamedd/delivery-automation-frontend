import React, { lazy } from 'react'
import Loadable from 'src/app/components/Loadable/Loadable'
import DeliveryComponent from './DeliveryMapComponent.jsx'

const Maps2 = Loadable(lazy(() => import('./map.tsx')))
const Maps = Loadable(lazy(() => import('./RenderMap.js')))

const mapRoutes = [
    {
        path: '/map',
        element: <Maps />,
    },
    {
        path: '/',
        element: <DeliveryComponent />,
    },
]

export default mapRoutes
