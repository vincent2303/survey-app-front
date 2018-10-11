import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// We can inject some CSS into the DOM.
const styles = {
  root: {
    borderRadius: 3,
    border: '1px white solid',
    color: 'white',
    height: 48,
    padding: '0 30px',
    width: '15vw'
  },
};

function ClassNames(props) {
  const { classes, className, ...other } = props;

  return (
    <Button className={classNames(classes.root, className)} {...other} onClick={props.onClick} >
      login
    </Button>
  );
}

ClassNames.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(ClassNames);