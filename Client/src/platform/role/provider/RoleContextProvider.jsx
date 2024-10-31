import { useCheckRole } from '@/modules/authentication/domain/useCase/useCheckRole';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { RoleContext } from '../entity/RoleContext';

export const RoleProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const adminStatus = async () => {
            try {
                const result = await useCheckRole();
                setIsAdmin(result);
            } catch {
                setIsAdmin(false);
            }
        };
        adminStatus();
    }, []);

    return <RoleContext.Provider value={{ isAdmin, setIsAdmin }}>{children}</RoleContext.Provider>;
};

RoleProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
