import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Paper, Typography, Grid, GridList, GridListTile } from '@material-ui/core';
import ThematiqueDisplayer from './ThematiqueDisplayer';

const thematiqueDataList = [
  {
    title: "thematique1",
    questionList:[
      {question: "question1", average:0.6},
      {question: "question2", average:0.2},
      {question: "question3", average:0.8},
      {question: "question4", average:-0.2},
      {question: "question5", average:0.5}
    ]
  },
  {
    title: "thematique2",
    questionList:[
      {question: "question1", average:0.6},
      {question: "question2", average:-0.1},
      {question: "question3", average:0.8},
      {question: "question4", average:-0.2},
      {question: "question5", average:0.8}
    ]
  },
  {
    title: "thematique3",
    questionList:[
      {question: "question1", average:0},
      {question: "question2", average:0.2},
      {question: "question3", average:0.3},
      {question: "question4", average:0.7},
      {question: "question5", average:0.5}
    ]
  },
  {
    title: "thematique4",
    questionList:[
      {question: "question1", average:0.3},
      {question: "question2", average:0.2},
      {question: "question3", average:0.5},
      {question: "question4", average:-0.2},
      {question: "question5", average:0.9}
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
                <GridList cellHeight={'auto'} cols={3} >
                  {thematiqueDataList.map(thematiqueData => (
                    <GridListTile key={thematiqueData.title} >
                      <ThematiqueDisplayer thematique={thematiqueData} />
                    </GridListTile>
                  ))}
                </GridList>
            </Grid>
        </div>
    )}
  }

export default Survey;