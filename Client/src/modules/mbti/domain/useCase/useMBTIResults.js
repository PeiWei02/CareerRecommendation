import { useQuery } from '@tanstack/react-query';
import { getMBTIResults } from '../../data/source/getMBTIResults';

export function useMBTIResults(userId) {
    return useQuery({
        queryKey: ['getMBTIResults'],
        queryFn: () => getMBTIResults(userId),
    });
}
