import { checkAdminRole } from '@/modules/admin/data/source/checkAdminRoleService';
import { useLoggedUserId } from './useLoggedUserId';

export const useCheckRole = async () => {
    const userId = useLoggedUserId();

    const isAdmin = await checkAdminRole(userId);
    return isAdmin;
};
