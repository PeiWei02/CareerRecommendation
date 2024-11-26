import PropTypes from 'prop-types';

export const Screen = ({ children }) => {
    return <div className="flex w-full h-full p-5 flex-col">{children}</div>;
};

Screen.propTypes = {
    children: PropTypes.node.isRequired,
};
