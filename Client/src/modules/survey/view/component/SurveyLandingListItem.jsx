import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import Lottie from 'lottie-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const SurveyLandingListItem = (props) => {
    const { title, description, animation, link } = props;

    return (
        <Link
            to={link}
            className="block transform transition duration-300 ease-in-out hover:scale-105"
        >
            <Card className="py-2 hover:bg-gray-800 transition duration-300 ease-in-out shadow-md hover:shadow-lg">
                <div className="h-full w-full grid grid-cols-12 gap-5 items-center">
                    <div className="col-span-8 px-6">
                        <CardTitle className="text-xl">{title}</CardTitle>
                        <CardDescription className="text-sm">{description}</CardDescription>
                    </div>
                    <div className="col-span-4 flex justify-center items-center">
                        <div className="h-36 w-36">
                            <Lottie
                                animationData={animation}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
};

SurveyLandingListItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    animation: PropTypes.object.isRequired,
    link: PropTypes.string.isRequired,
};
