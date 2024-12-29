import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export function Holland6ResultListItem({ item, latestAttemptId }) {
    const navigate = useNavigate();

    const { _id: id, updatedAt, highestCombination, highest } = item;
    const isLatest = id === latestAttemptId;

    return (
        <Card
            key={id}
            className={`flex flex-col py-5 px-5 w-full hover:bg-muted/70 relative ${
                isLatest && 'bg-violet-950 bg-opacity-60 hover:bg-violet-800 '
            }`}
            onClick={() => navigate('/holland6/result', { state: { highest: highest } })}
        >
            <CardTitle className="flex text-base space-x-2 items-center">
                <p>{highestCombination}</p>
                {isLatest && (
                    <span className="flex px-2 py-1 rounded-full text-xs font-medium bg-violet-800 text-white animate-pulse">
                        Latest
                    </span>
                )}
            </CardTitle>
            <CardDescription>{new Date(updatedAt).toLocaleString()}</CardDescription>
        </Card>
    );
}

Holland6ResultListItem.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        highestCombination: PropTypes.string.isRequired,
        highest: PropTypes.string.isRequired,
    }).isRequired,
    latestAttemptId: PropTypes.string.isRequired,
};
