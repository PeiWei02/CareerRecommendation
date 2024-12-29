import { useQuery } from '@tanstack/react-query';
import { getComprehensiveReport } from '../../data/source/getComprehensiveReport';

export function useComprehensiveReport(userId) {
    return useQuery({
        queryKey: ['comprehensiveReport', userId],
        queryFn: () => getComprehensiveReport(userId),
    });
}
