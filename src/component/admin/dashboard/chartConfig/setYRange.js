
const heightMinValue = 0.4
const marginTopPourcent = 30

const setYRange = function(yList){
    let yMin = yList[0]
    let yMax = yList[0]
    yList.forEach(y => {
        if(y>yMax){
            yMax=y
        }
        if(y<yMin){
            yMin=y
        }
    });
    const minValue = (yMin-heightMinValue*yMax)/(1-heightMinValue)
    const maxValue = yMax + (yMax - minValue)*marginTopPourcent/100
    return {min: minValue, max:maxValue}
}

export default setYRange