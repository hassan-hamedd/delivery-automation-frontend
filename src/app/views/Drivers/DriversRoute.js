import React, { lazy } from 'react'
import Loadable from 'src/app/components/Loadable/Loadable'

const Drivers = Loadable(lazy(() => import('./Drivers')))

const driversRoutes = [
    {
        path: '/drivers',
        element: <Drivers />,
    },
]

export default driversRoutes
