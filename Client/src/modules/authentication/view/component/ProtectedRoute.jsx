import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Lottie from 'lottie-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth } from '../../domain/useCase/useAuth';
import { authenticationAsset } from '../asset';

export const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return element;
    }

    if (!isAuthenticated) {
        return (
            <div className="flex justify-center items-center h-[90vh] w-[100vw]">
                <Card className="h-[65vh] w-[65vw] ">
                    <CardHeader className="items-center my-5">
                        <CardTitle className="text-3xl">Uh Oh! You Havent log in!</CardTitle>
                        <Lottie
                            animationData={authenticationAsset.failLogin}
                            style={{ width: '50%', height: '50%' }}
                        ></Lottie>
                        <Link to="/login">
                            <Button
                                className="items-center my-6 "
                                size="lg"
                            >
                                Login
                            </Button>
                        </Link>
                    </CardHeader>
                </Card>
            </div>
        );
    }
};

ProtectedRoute.propTypes = {
    element: PropTypes.node.isRequired,
};
