import React, { Component } from 'react'
import CsvAdder from './CsvAdder';
import SingleAdder from './SingleAdder';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = {
    card: {
      minWidth: 275,
      margin: 50,
    },
  };

class Adder extends Component {

    state = {
        userList: null,
        csvServerRespons: null,
        singleServerRespons: null
    }

    userConstructeur = (line)=>{
        return {firstName: line[0], lastName: line[1], email: line[2]}
    }

    uploadUserList = (data)=>{
        data.splice(0, 1);
        console.log(data);
        let userList = []
        data.forEach(line => {
            if (line[0]&&line[1]&&line[2]) {
                userList.push(this.userConstructeur(line))
            }
        });
        this.setState({userList: userList})
        console.log(userList)
    }


    postUsers = ()=>{
        axios.post("http://localhost:4200/admin/csvPost", {userList: this.state.userList}, {headers:{Authorization: "bearer "+ this.props.token}}).then(res=>{
            this.setState({csvServerRespons: res.data})
        })
        this.setState({userList: null})
    }

    postSingleUser = (user)=>{
        console.log(user)
        axios.post("http://localhost:4200/admin/singlePost", {user: user},{headers:{Authorization: "bearer "+ this.props.token}}).then((res)=>{
            this.setState({singleServerRespons: res.data})
        })
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
                        {this.state.userList && <button onClick={this.postUsers} >add users</button>}
                        {this.state.csvServerRespons && <p>{this.state.csvServerRespons}</p>}
                    </div>
                    <div>
                        <SingleAdder postSingleUser={this.postSingleUser} />
                        {this.state.singleServerRespons && <p>{this.state.singleServerRespons}</p>}
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
  
  export default withStyles(styles)(Adder);