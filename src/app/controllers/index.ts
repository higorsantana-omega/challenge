import profileRoutes from './profile'
import type Route from './Route'
import userRoutes from './user'

const routes: Route[] = [...userRoutes, ...profileRoutes]

export default routes
