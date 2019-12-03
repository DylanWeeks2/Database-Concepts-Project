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
    { path: '/parent/profile', component: ParentProfile, authRequired: false },
    { path: '/parent', component: ParentDashboard, authRequired: false },
    { path: '/driver/profile', component: DriverProfile, authRequired: false },
    { path: '/driver', component: DriverDashboard, authRequired: false },
    { path: '/child', component: ChildProfile, authRequired: false }
];
export default ROUTES;