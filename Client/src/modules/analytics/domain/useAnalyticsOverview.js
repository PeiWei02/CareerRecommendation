import { useQuery } from '@tanstack/react-query';
import { getAnalyticsOverview } from '../data/source/getAnalyticsOverview.js';

export function useAnalyticsOverview() {
    return useQuery({
        queryKey: ['analyticsOverview'],
        queryFn: () => getAnalyticsOverview(),
        retry: 3,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    });
}
