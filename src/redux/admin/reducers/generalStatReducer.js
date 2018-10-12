import { 
    GET_STATISTICS_ACTION
} from '../actions/adminTypes';

const generalStatReducer = function(state = null, {type, payload}){
    switch (type) {
        case GET_STATISTICS_ACTION:
            return{
                ...state,
                totalSent: payload.totalSent,
                totalAnswered: payload.totalAnswered,
                totalRate: payload.totalRate,
                totalSatis: payload.totalSatis,
                monthSent: payload.monthSent,
                monthAnswered: payload.monthAnswered,
                todayRate: payload.todayRate,
                todaySatis: payload.todaySatis,
                monthSatis: payload.monthSatis,
                weekRate: payload.weekRate,
                data: payload.data,
                loaded: payload.loaded,
            }
        default:
            return state
    }
}

export default generalStatReducer