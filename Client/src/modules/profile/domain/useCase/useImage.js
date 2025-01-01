import { useQuery } from '@tanstack/react-query';
import { getImage } from '../../data/source/getImage';

export function useImage(imageId) {
    return useQuery({
        queryKey: ['image', imageId],
        queryFn: () => getImage(imageId),
    });
}
