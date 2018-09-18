import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Paper, Typography, Grid, GridList, GridListTile } from '@material-ui/core';
import ThematiqueDisplayer from './ThematiqueDisplayer';

const backgroundColorList= [
  '#3498db',
  '#f39c12',
  '#c0392b',
  '#16a085',
  '#8e44ad'
]

const thematiqueDataList = [
  {
    title: "thematique1",
    backgroundColor: backgroundColorList[0],
    questionList:[
      {text: "question1", average:0.6},
      {text: "question2", average:0.2},
      {text: "question3", average:0.8},
      {text: "question4", average:-0.2},
      {text: "question5", average:0.5}
    ]
  },
  {
    title: "thematique2",
    backgroundColor: backgroundColorList[1],
    questionList:[
      {text: "question1", average:0.6},
      {text: "question2", average:-0.1},
      {text: "question3", average:0.8},
      {text: "question4", average:-0.2},
      {text: "question5", average:0.8}
    ]
  },
  {
    title: "thematique3",
    backgroundColor: backgroundColorList[2],
    questionList:[
      {text: "question1", average:0},
      {text: "question2", average:0.2},
      {text: "question3", average:0.3},
      {text: "question4", average:0.7},
      {text: "question5", average:0.5}
    ]
  },
  {
    title: "thematique4",
    backgroundColor: backgroundColorList[3],
    questionList:[
      {text: "question1", average:0.3},
      {text: "question2", average:0.2},
      {text: "question3", average:0.5},
      {text: "question4", average:-0.2},
      {text: "question5", average:0.9}
    ]
  }
]

class Survey extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        startDate: moment()
      };
      this.handleDateChange = this.handleDateChange.bind(this);
    }
   
    handleDateChange(date) {
      this.setState({
        startDate: date
      });
    }
   
    render() {
      return (
        <div style={{height:'100vh', backgroundColor:'#2c3e50', padding: '5vh'}} >
            <Grid>
                <Paper style={{width:'200px', height: '50px'}} >
                    <Typography> Choose a date </Typography>
                    <DatePicker selected={this.state.startDate} onChange={this.handleDateChange}/>
                </Paper>
                <GridList spacing={80} cellHeight={'auto'} cols={3} style={{marginTop:'3vh'}}>
                  {thematiqueDataList.map(thematiqueData => (
                    <GridListTile key={thematiqueData.title} >
                      <ThematiqueDisplayer thematique={thematiqueData} backgroundColor={backgroundColorList[1]} />
                    </GridListTile>
                  ))}
                </GridList>
            </Grid>
        </div>
    )}
  }

export default Survey;