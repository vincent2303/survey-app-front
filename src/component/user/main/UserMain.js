import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Drawer, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { toggleDrawer } from '../../../redux/user/actions/userMainActions'

const styles = {

}
class UserMain extends Component {

    constructor(props){
        super(props);

        this.onToggleDrawer = this.onToggleDrawer.bind(this);
    }

    onToggleDrawer = (open) => () => {
        this.props.onToggleDrawer(open);
    }

  render() {
    return (
      <div>
        <Button onClick={this.onToggleDrawer(true)}> Click</Button>
        <Drawer open = {this.props.toggleDrawer} onClose = {this.onToggleDrawer(false)}>
        <div>
            Plop plop, plop.
          </div>
        </Drawer>
      </div>
    )
  }
}
const mapStateToProps = (state, props) => {
    return {
        toggleDrawer: state.userMain.toggleDrawer
    }
};

const mapActionsToProps = {
    onToggleDrawer: toggleDrawer
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(UserMain))
