import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Account extends Component {

  render() {
    return (
      <div>
        Account
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
