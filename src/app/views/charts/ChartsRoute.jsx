import React, { lazy } from 'react'
import Loadable from 'src/app/components/Loadable/Loadable';

const AppEchart = Loadable(lazy(() => import("./echarts/AppEchart")));

const chartsRoute = [
    {
        path: '/charts/echarts',
        element: <AppEchart />,
    },
]

export default chartsRoute
