import React, { lazy } from 'react'
import Loadable from 'src/app/components/Loadable/Loadable'

const Cars = Loadable(lazy(() => import('./Cars')))

const carsRoutes = [
    {
        path: '/vehicles',
        element: <Cars />,
    },
]

export default carsRoutes
