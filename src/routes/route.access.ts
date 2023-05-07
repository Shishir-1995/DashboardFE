
import { UserRole } from 'modules/user/enum/user-role';
import { routes } from './routes';

export type routesAccessType = {
    role: UserRole;
    access: { routes: string[] };
};

export const routesAccess: routesAccessType[] = [
    {
        role: UserRole.Manger,
        access: {
            routes: [routes.admin.root]
        }
    },
    {
        role: UserRole.Student,
        access: {
            routes: [routes.student.root]
        }
    },
    {
        role: UserRole.IA,
        access: {
            routes: [routes.ia.root, routes.ia.pp, routes.ia.leave]
        }
    }
];
