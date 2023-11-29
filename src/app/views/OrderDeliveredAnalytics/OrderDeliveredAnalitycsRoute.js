import React, { lazy } from 'react'
import Loadable from 'src/app/components/Loadable/Loadable'

const OrderDeliveredAnalytics = Loadable(
    lazy(() => import('./OrderDeliveredAnalytics'))
)

const OrderDeliveredAnalyticsRoute = [
    {
        path: '/order-delivred-analytics',
        element: <OrderDeliveredAnalytics />,
    },
]

export default OrderDeliveredAnalyticsRoute
