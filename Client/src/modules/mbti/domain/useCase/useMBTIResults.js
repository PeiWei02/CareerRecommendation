import { AuthContext } from '@/modules/authentication/domain/useCase/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { getMBTIResults } from '../../data/source/getMBTIResults';

export function useMBTIResults() {
    const { user } = useContext(AuthContext);
    const { _id: userId } = user;

    return useQuery({
        queryKey: ['getMBTIResults'],
        queryFn: () => getMBTIResults(userId),
    });
}
