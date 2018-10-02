import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Paper, Typography, Grid, GridList, GridListTile } from '@material-ui/core';
import axios from 'axios';
import ThematiqueDisplayer from './ThematiqueDisplayer';
import CommentsDisplayer from './CommentsDisplayer';

class Survey extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        startDate: moment(),
        loaded: false,
        comments: [],
        thematiqueList: [],
        loaded2: false,
      };
      this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount(){
      this.handleDateChange(moment());
    }
   
    handleDateChange(date) {
      this.setState({
        startDate: date
      },
      () => {
        let day = this.state.startDate._d.getDate();
        let month = this.state.startDate._d.getMonth() + 1;
        const year = this.state.startDate._d.getFullYear();
        let fullDate = "";
        if(month.toString().length === 1){
          month = "0" + month;
        } if(day.toString().length === 1){
          day = "0" + day;
        }
        fullDate = year + "-" + month + "-" + day;
        axios.get(`http://localhost:4200/admin/getCommentaireJour/${fullDate}`,
        {headers:{Authorization: "bearer "+ localStorage.getItem('token')}})
        .then( res => {
            this.setState({comments: res.data});
            this.setState({loaded: true});
        });
        axios.get(`http://localhost:4200/admin/specificStatistics/${year}/${month}/${day}`,
        {headers:{Authorization: "bearer "+ localStorage.getItem('token')}})
        .then( res => {
          this.setState({thematiqueList: res.data.thematiqueList});
          this.setState({loaded2: true});
        });
      }) 
    }
   
    render() {
      return (
            <Grid container direction='column' justify='flex-start' alignItems='center' style={{backgroundColor:'#2c3e50'}} >
              <Grid item >
                <Paper style={{width:'20vw',  textAlign:'center', padding:'2vh', marginTop: '10vh'}} >
                    <Typography style={{ fontFamily: 'Roboto', fontSize: '2.5em', color: '#2c3e50', fontWeight: 100, textAlign:'center'}} > Pick a date </Typography>
                    <DatePicker selected={this.state.startDate} onChange={this.handleDateChange}/>
                </Paper>
              </Grid>
              <Grid item style={{width:'97%'}} >
                {!this.state.loaded && <h1>Chargement</h1>}  
                {this.state.loaded &&  
                <GridList spacing={20} cellHeight={'auto'} cols={3} style={{marginTop:'10vh'}} >
                  {this.state.thematiqueList.map(thematiqueData => (
                    <GridListTile key={thematiqueData.name}>
                      <ThematiqueDisplayer thematique={thematiqueData}/>
                    </GridListTile>
                  ))}
                </GridList>}
                {!this.state.loaded && <h1>Chargement</h1>}  
                {this.state.loaded &&  <CommentsDisplayer comments={this.state.comments} />}
              </Grid>
            </Grid>
    )}
  }

export default Survey;