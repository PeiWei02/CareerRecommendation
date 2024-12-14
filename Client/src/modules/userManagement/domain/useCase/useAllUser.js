import { useQuery } from '@tanstack/react-query';
import { getAllUserService } from '../../data/source/getAllUserService';

export function useAllUser() {
    return useQuery({
        queryKey: ['allUser'],
        queryFn: () => getAllUserService(),
    });
}
