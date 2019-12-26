import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1)
    }
}));


const MBAButton = ({ label, color, variant, onClick }) => {
    const classes = useStyles();
    return (<Button variant={variant} color={color} className={classes.button} onClick={onClick}>
        {label}
    </Button>);
};

MBAButton.propTypes = {
    label: PropTypes.string,
    color: PropTypes.string,
    variant: PropTypes.string,
    onClick: PropTypes.func
};
MBAButton.defaultProps = {
    label: '',
    color: '',
    variant: '',
    onClick: () => { }
};

export default MBAButton;