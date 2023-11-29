import AuthGuard from 'src/app/auth/AuthGuard'
import NotFound from 'src/app/views/sessions/NotFound'
import chartsRoute from 'src/app/views/charts/ChartsRoute'
import materialRoutes from 'src/app/views/material-kit/MaterialRoutes'
import dashboardRoutes from 'src/app/views/dashboard/DashboardRoutes'
import sessionRoutes from 'src/app/views/sessions/SessionRoutes'
import MatxLayout from '../components/MatxLayout/MatxLayout'
import { Navigate } from 'react-router-dom'
import mapRoutes from 'src/app/views/Maps/MapRoutes'
import carsRoutes from 'src/app/views/Cars/CarsRoute'
import driversRoutes from 'src/app/views/Drivers/DriversRoute'
import deliveriesRoutes from 'src/app/views/Deliveries/DeliveriesRoute'
import invoicesRoutes from 'src/app/views/Invoices/InvoicesRoute'
import NewDeliveryAnalitycsRoute from 'src/app/views/NewDeliveryAnalitycs/NewDeliveryAnalitycsRoute'
import OrderDeliveredAnalyticsRoute from 'src/app/views/OrderDeliveredAnalytics/OrderDeliveredAnalitycsRoute'
import DeliveryReturnedAnalyticsRoute from 'src/app/views/DeliveryReturnedAnalytics/DeliveryReturnedAnalyticsRoute'



export const AllPages = () => {
    const all_routes = [
        {
            element: (
                <AuthGuard>
                    <MatxLayout />
                </AuthGuard>
            ),
            children: [...dashboardRoutes,...invoicesRoutes, ...chartsRoute, ...materialRoutes, ...mapRoutes,...carsRoutes, ...driversRoutes, ...deliveriesRoutes, ...NewDeliveryAnalitycsRoute, ...OrderDeliveredAnalyticsRoute, ...DeliveryReturnedAnalyticsRoute],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="dashboard/default" />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]

    return all_routes
}
