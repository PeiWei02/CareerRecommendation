import { AuthContext } from '@/modules/authentication/domain/useCase/useAuth.jsx';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { getComprehensiveReport } from '../../data/source/getComprehensiveReport';

export function useComprehensiveReport() {
    const { user } = useContext(AuthContext);
    const { _id: userId } = user;

    return useQuery({
        queryKey: ['comprehensiveReport', userId],
        queryFn: () => getComprehensiveReport(userId),
    });
}
