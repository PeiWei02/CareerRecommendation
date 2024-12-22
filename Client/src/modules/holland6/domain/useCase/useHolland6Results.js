import { AuthContext } from '@/modules/authentication/domain/useCase/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { getHolland6Results } from '../../data/source/getHolland6Results';

export function useHolland6Results() {
    const { user } = useContext(AuthContext);
    const { _id: userId } = user;

    return useQuery({
        queryKey: ['getholland6Results'],
        queryFn: () => getHolland6Results(userId),
    });
}
