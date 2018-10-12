import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const styles = () => ({
    input: {
        color: 'white',
        fontSize: '2em',
        fontWeight: 100,
        '&:before': {
            borderBottom: '1px solid white',
          },
        '&:after': {
          borderBottom: '1px solid blue',
        }
    },
});

const CustomInput = (props) => {
    const { classes } = props;
    return (
        <div>
            {
                props.placeHolder==='Password' ? 
                <Input onChange={props.keyPress} className={classes.input} placeholder={props.placeHolder} type='password' autoComplete='off' /> : <Input onChange={props.keyPress} className={classes.input} placeholder={props.placeHolder} autoComplete='off'/>
            }
        </div>
  )
}

export default withStyles(styles)(CustomInput)