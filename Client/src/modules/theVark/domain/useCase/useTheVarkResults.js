import { useQuery } from '@tanstack/react-query';
import { getTheVarkResults } from '../../data/source/getTheVarkResults';

export function useTheVarkResults(userId) {
    return useQuery({
        queryKey: ['getTheVarkResults'],
        queryFn: () => getTheVarkResults(userId),
    });
}
