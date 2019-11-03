import { register } from "./serviceWorker";

// export default ROUTES;
import { Register } from './app/authentication/Register';
import { ParentDashboard } from './app/dashboard/Parent';
export const ROUTES = [
    { path: '/register', component: Register, authRequired: false, adminRequired: false},
    { path: '/parent', component: ParentDashboard, authRequired: false, adminRequired: false}
];
export default ROUTES;