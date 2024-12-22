import { AuthContext } from '@/modules/authentication/domain/useCase/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { getTheVarkResults } from '../../data/source/getTheVarkResults';

export function useTheVarkResults() {
    const { user } = useContext(AuthContext);
    const { _id: userId } = user;

    return useQuery({
        queryKey: ['getTheVarkResults'],
        queryFn: () => getTheVarkResults(userId),
    });
}
