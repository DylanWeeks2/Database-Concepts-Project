import { register } from "./serviceWorker";

// export default ROUTES;
import { Register } from './app/authentication/Register';
import { ParentDashboard } from './app/dashboard/Parent';
import { DriverDashboard } from './app/dashboard/Driver';
import { DriverProfile } from './app/profiles/DriverProfile';
import { ParentProfile } from './app/profiles/ParentProfile';
import { ChildProfile } from "./app/profiles/ChildProfile";

export const ROUTES = [
    { path: '/register', component: Register, authRequired: false },
    { path: '/parent/profile', component: ParentProfile, authRequired: true },
    { path: '/parent', component: ParentDashboard, authRequired: true },
    { path: '/driver/profile', component: DriverProfile, authRequired: true },
    { path: '/driver', component: DriverDashboard, authRequired: true },
    { path: '/child', component: ChildProfile, authRequired: true }
];
export default ROUTES;