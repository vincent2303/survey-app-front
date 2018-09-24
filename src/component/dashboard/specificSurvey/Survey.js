import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Paper, Typography, Grid, GridList, GridListTile } from '@material-ui/core';
import axios from 'axios';
import ThematiqueDisplayer from './ThematiqueDisplayer';
import CommentsDisplayer from './CommentsDisplayer';
import backgroundColorList from '../colorSet'

const thematiqueDataList = [
  {
    title: "Cafeteria",
    backgroundColor: backgroundColorList[0],
    questionList:[
      {text: "Bruit", average:0.6},
      {text: "Aimabilité", average:0.2},
      {text: "Prix", average:0.8},
      {text: "Qualité", average:-0.2},
      {text: "ambiance", average:0.5}
    ]
  },
  {
    title: "Bureau",
    backgroundColor: backgroundColorList[1],
    questionList:[
      {text: "Temperature", average:0.6},
      {text: "Confort", average:-0.1},
      {text: "Ambiance", average:0.8},
      {text: "Materiel", average:0.8}
    ]
  },
  {
    title: "Lounge",
    backgroundColor: backgroundColorList[2],
    questionList:[
      {text: "Confort", average:0.2},
      {text: "Bruit", average:0.3},
      {text: "Temperature", average:0.7},
    ]
  }
]

const comments=[
  {
    thematique: 'Cafeteria',
    author:{
      firstName:'Jean',
      lastName:'Suarez',
      email:'Jean.Suarez@orange.fr'
    },
    text: 'Homines enim eruditos et sobrios ut infaustos et inutiles vitant, eo quoque accedente quod et nomenclatores adsueti haec et talia venditare, mercede accepta lucris quosdam et prandiis inserunt subditicios ignobiles et obscuros.'
  },
  {
    thematique: 'Lounge',
    author:{
      firstName:'Paul',
      lastName:'Belmondeau',
      email:'Jean.Suarez@orange.fr'
    },
    text: 'Homines enim eruditos et sobrios ut infaustos et inutiles vitant, eo quoque accedente quod et nomenclatores adsueti haec et talia venditare, mercede accepta lucris quosdam et prandiis inserunt subditicios ignobiles et obscuros.'
  },
  {
    thematique: 'Lounge',
    author:{
      firstName:'Jacques',
      lastName:'Roger',
      email:'Jean.Suarez@orange.fr'
    },
    text: 'Homines enim eruditos et sobrios ut infaustos et inutiles vitant, eo quoque accedente quod et nomenclatores adsueti haec et talia venditare, mercede accepta lucris quosdam et prandiis inserunt subditicios ignobiles et obscuros.'
  },
  {
    thematique: 'Bureau',
    author:{
      firstName:'Martine',
      lastName:'Laurence',
      email:'Jean.Suarez@orange.fr'
    },
    text: 'Homines enim eruditos et sobrios ut infaustos et inutiles vitant, eo quoque accedente quod et nomenclatores adsueti haec et talia venditare, mercede accepta lucris quosdam et prandiis inserunt subditicios ignobiles et obscuros.'
  },
  {
    thematique: 'Cafeteria',
    author:{
      firstName:'Clement',
      lastName:'Heizenberg',
      email:'Jean.Suarez@orange.fr'
    },
    text: 'Homines enim eruditos et sobrios ut infaustos et inutiles vitant, eo quoque accedente quod et nomenclatores adsueti haec et talia venditare, mercede accepta lucris quosdam et prandiis inserunt subditicios ignobiles et obscuros.'
  },
  {
    thematique: 'Bureau',
    author:{
      firstName:'Stephanie',
      lastName:'Guillotin',
      email:'Jean.Suarez@orange.fr'
    },
    text: 'Homines enim eruditos et sobrios ut infaustos et inutiles vitant, eo quoque accedente quod et nomenclatores adsueti haec et talia venditare, mercede accepta lucris quosdam et prandiis inserunt subditicios ignobiles et obscuros.'
  }
]

class Survey extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        startDate: moment(),
        loaded: false,
        comments: [],
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
        const day = this.state.startDate._d.getDate();
        const month = this.state.startDate._d.getMonth() + 1;
        const year = this.state.startDate._d.getFullYear();
        let fullDate = "";
        if(month.toString().length>1){
          fullDate = year + "-" + month + "-" + day;
        } else {
          fullDate = year + "-0" + month + "-" + day;
        }
        console.log(fullDate);
        axios.get(`http://localhost:4200/admin/getCommentaireJour/${fullDate}`,
        {headers:{Authorization: "bearer "+ localStorage.getItem('token')}})
        .then( res => {
          console.log(res.data);
            this.setState({comments: res.data});
            this.setState({loaded: true});
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
                <GridList spacing={20} cellHeight={'auto'} cols={3} style={{marginTop:'10vh'}} >
                  {thematiqueDataList.map(thematiqueData => (
                    <GridListTile key={thematiqueData.title}>
                      <ThematiqueDisplayer thematique={thematiqueData}/>
                    </GridListTile>
                  ))}
                </GridList>
                {!this.state.loaded && <h1>Chargement</h1>}  
                {this.state.loaded &&  <CommentsDisplayer comments={this.state.comments} />}
              </Grid>
            </Grid>
    )}
  }

export default Survey;