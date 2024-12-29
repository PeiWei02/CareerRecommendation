import { useQuery } from '@tanstack/react-query';
import { getHolland6Results } from '../../data/source/getHolland6Results';

export function useHolland6Results(userId) {
    return useQuery({
        queryKey: ['getholland6Results'],
        queryFn: () => getHolland6Results(userId),
    });
}
