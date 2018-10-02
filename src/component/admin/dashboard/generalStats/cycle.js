
const cycleWeek = function(){
    const week = ['dimanche','lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const plop = new Date(Date.now());
    const day = plop.getDay();
    let sortedWeek =[];
    let interVar = [];
    for (var i = 0; i<7; i++){
        if(i<=day){
            interVar.push(week.shift());
        }
    }
    sortedWeek = week.concat(interVar);
    return(sortedWeek)
}

const cycleMonth =function(){
    const month = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'];
    const plop = new Date(Date.now());
    const day = plop.getDate();
    let sortedMonth =[];
    let interVar = [];
    for (var i = 0; i<30; i++){
        if(i<=day){
            interVar.push(month.shift());
        }
    }
    sortedMonth = month.concat(interVar);
    return(sortedMonth)
}

module.exports = {cycleWeek, cycleMonth};