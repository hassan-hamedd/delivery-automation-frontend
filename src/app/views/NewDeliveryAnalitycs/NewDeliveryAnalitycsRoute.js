import React, { lazy } from 'react'
import Loadable from 'src/app/components/Loadable/Loadable'

const NewDeliveryAnalitycs = Loadable(
    lazy(() => import('./NewDeliveryAnalytics'))
)

const NewDeliveryAnalitycsRoute = [
    {
        path: '/new-delivery-analytics',
        element: <NewDeliveryAnalitycs />,
    },
]

export default NewDeliveryAnalitycsRoute
