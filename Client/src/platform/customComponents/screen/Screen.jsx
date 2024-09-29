import PropTypes from 'prop-types';

export const Screen = ({children}) => {
    return (
        <div className='flex w-full h-full p-5 justify-center items-center flex-col'>
            {children}
        </div>
    )
}

Screen.propTypes = { 
    children: PropTypes.node.isRequired
};
