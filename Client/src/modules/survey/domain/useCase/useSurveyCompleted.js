import { AuthContext } from '@/modules/authentication/domain/useCase/useAuth.jsx';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { getSurveyCompleted } from '../../data/source/getSurveyCompleted';

export function useSurveyCompleted() {
    const { user } = useContext(AuthContext);
    const { _id: userId } = user;

    return useQuery({
        queryKey: ['surveyCompleted', userId],
        queryFn: () => getSurveyCompleted(userId),
    });
}
