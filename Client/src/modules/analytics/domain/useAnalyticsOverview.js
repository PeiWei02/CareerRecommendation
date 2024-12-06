import { useQuery } from '@tanstack/react-query';
import { getAnalyticsOverview } from '../data/source/getAnalyticsOverview.js';

export function useAnalyticsOverview() {
    return useQuery({
        queryKey: ['analyticsOverview'],
        queryFn: () => getAnalyticsOverview(),
    });
}
