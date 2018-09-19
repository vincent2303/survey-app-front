import React, { Component } from 'react'
import CSVReader from 'react-csv-reader'
import { Typography } from '@material-ui/core';


class CsvAdder extends Component {

    handleUploadError = function(){
        console.log("ERROR")
    }

    handleFile = (data)=>{
        this.props.uploadUsers(data)
    }
    
    render(){
        return(
            <div>
                <Typography variant="body2">CSV adder</Typography>
                <CSVReader
                    cssClass="csv-input"
                    label="Select CSV with users "
                    onFileLoaded={this.handleFile}
                    onError={this.handleUploadError}
                    inputId="ObiWan"
                />
            </div>
        )
    }
}

export default CsvAdder