import { AuthContext } from '@/modules/authentication/domain/useCase/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { getProfile } from '../data/source/getProfile';

export function useUserDetails() {
    const { user } = useContext(AuthContext);
    const { _id: userId } = user;

    return useQuery({
        queryKey: ['profile', userId],
        queryFn: () => getProfile(userId),
        enabled: !!userId,
    });
}
