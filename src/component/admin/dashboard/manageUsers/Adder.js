import React, { Component } from 'react'
import CsvAdder from './CsvAdder';
import SingleAdder from './SingleAdder';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { connect } from 'react-redux';
import { postSingleUser, uploadUserList, postUser } from '../../../../redux/admin/actions/manageUserAction'
const styles = {
    card: {
      minWidth: 275,
      margin: 50,
    },
  };

class Adder extends Component {

    uploadUserList = (data)=>{
        this.props.uploadUserList(data)
    }


    postUsers = ()=>{
        this.props.postUser(this.props.userList)
    }

    postSingleUser = (user)=>{
        this.props.postSingleUser(user)
    }
    
    render(){
        const { classes } = this.props;
        return(
            <div>
                <Card className={classes.card}>
                    <CardContent>
                    <Typography variant="title">Add User</Typography>
                    <div>
                        <CsvAdder uploadUsers={this.uploadUserList}/>
                        {this.props.userList && <button onClick={this.postUsers} >add users</button>}
                        {this.props.csvServerRespons && <p>{this.props.csvServerRespons}</p>}
                    </div>
                    <div>
                        <SingleAdder postSingleUser={this.postSingleUser} />
                        {this.props.singleServerRespons && <p>{this.props.singleServerRespons}</p>}
                    </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

Adder.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
const mapStateToProps = state=>{
    return state.manageUser
}

const mapActionsToProps = {
    postSingleUser: postSingleUser, 
    uploadUserList: uploadUserList, 
    postUser: postUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Adder));