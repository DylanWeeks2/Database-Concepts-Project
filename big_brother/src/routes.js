import { register } from "./serviceWorker";

// export default ROUTES;
import { Register } from './app/authentication/Register';
import { ParentDashboard } from './app/dashboard/Parent';
import { DriverDashboard } from './app/dashboard/Driver';
import { DriverProfile } from './app/profiles/DriverProfile';
import { ParentProfile } from './app/profiles/ParentProfile';

export const ROUTES = [
    { path: '/register', component: Register, authRequired: false, adminRequired: false },
    { path: '/parent/profile', component: ParentProfile, authRequired: false, adminRequired: false },
    { path: '/parent', component: ParentDashboard, authRequired: false, adminRequired: false },
    { path: '/driver/profile', component: DriverProfile, authRequired: false, adminRequired: false },
    { path: '/driver', component: DriverDashboard, authRequired: false, adminRequired: false }
];
export default ROUTES;