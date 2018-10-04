import { GET_STATISTICS_ACTION } from "./adminTypes";
import { input1, input2, input3, input4, cycleMonth } from '../../../component/admin/dashboard/generalStats/cycle';
import axios from 'axios'

import { 
    type_softLineCircle_constructor, 
    type_softBar_constructor, 
    type_softLine_constructor, 
    type_doubleCircleLine_constructor,
    type_longSoftLine_constructor
} from '../../../component/admin/dashboard/chartConfig/chartConfig';

function weekDataConstructor(type, constructor, dataList, dataTotal, name){
    let input = type;
    input.dataArray = dataList.slice(0,7).reverse();
    let data1 = constructor(input);
    data1.total = dataTotal;
    data1.name = name;
    return(data1);
}

function monthSA(dataList){
    const input6 = {
        dataArray: [
            dataList[0].slice(0,30).reverse(),
            dataList[1].slice(0,30).reverse(),
        ],
        xLabel: cycleMonth(),
        elementLabel: [
            'mail envoyé',
            'reponses'
        ],
        boxColor: '#ecf0f1'
    }
    return(type_doubleCircleLine_constructor(input6))
}

function monthSatisfaction(dataList){
    const input5 = {
        dataArray: dataList.slice(0,30).reverse(),
        xLabel: cycleMonth(),
        elementLabel: 'Satisfaction',
        boxColor: '#ecf0f1'
    }
    return(type_longSoftLine_constructor(input5));
}

const getGeneralStatistics = ()=>(dispatch)=>{
    axios.get('http://localhost:4200/admin/generalStatistics')
    .then(res => {
        const dataServer = {
            totalSent: res.data.totalSentSondage,
            totalAnswered: res.data.totalAnsweredSondage,
            totalRate: res.data.totalRate,
            totalSatis: res.data.totalSatis,
            monthSent: res.data.monthSentSondage,
            monthAnswered: res.data.monthAnsweredSondage,
            todayRate: res.data.todayAnsweredSendedRate,
            todaySatis: res.data.todayAverageSatisfaction,
            monthSatis: res.data.monthAverageSatisfaction,
            weekRate: res.data.weekRate,
        }
        const data1 = weekDataConstructor(
            input1,
            type_softLineCircle_constructor,
            dataServer.monthSent, 
            dataServer.totalSent, 
            "Total sent sondages");
        const data2 = weekDataConstructor(
            input2, 
            type_softLineCircle_constructor,
            dataServer.monthAnswered, 
            dataServer.totalAnswered, 
            "Total answered sondages");
        const data3 = weekDataConstructor(
            input3, 
            type_softLine_constructor,
            dataServer.monthSatis, 
            dataServer.totalSatis, 
            "Total satisfaction");
        const data4 = weekDataConstructor(
            input4, 
            type_softBar_constructor,
            dataServer.weekRate, 
            dataServer.totalRate,
            "Total sondage answer rate");
        const data5 = monthSatisfaction(dataServer.monthSatis);
        const data6 = monthSA([dataServer.monthSent,dataServer.monthAnswered]);
        dispatch({
            type: GET_STATISTICS_ACTION,
            payload: {
                totalSent: dataServer.totalSent,
                totalAnswered: dataServer.totalAnswered,
                totalRate: dataServer.totalRate,
                totalSatis: dataServer.totalSatis,
                monthSent: dataServer.monthSent,
                monthAnswered: dataServer.monthAnswered,
                todayRate: dataServer.todayRate,
                todaySatis: dataServer.todaySatis,
                monthSatis: dataServer.monthSatis,
                weekRate: dataServer.weekRate,
                data: [data1,data2, data3, data4, data5, data6],
                loaded: true,
            }
        })
        
    }
)};

export {getGeneralStatistics}