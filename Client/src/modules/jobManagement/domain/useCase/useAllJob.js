import { useQuery } from '@tanstack/react-query';
import { getAllJobService } from '../../data/source/getAllJobService.js';

export function useAllJobs() {
    return useQuery({
        queryKey: ['allJobs'],
        queryFn: () => getAllJobService(),
    });
}
