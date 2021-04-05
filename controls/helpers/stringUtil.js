const { get } = require("lodash")

var removeLastSpace = (str)=>{
    return(str[str.length -1] == " ")? str.substr(0,str.length-1):str
}
var removeLastGivenString = (str, gString)=>{
    const ret = removeLastSpace(str)
    const retLen = ret.length
    const last = ret.lastIndexOf(gString)
    const diff = (retLen-last)
    return (diff==gString.length)?str.substr(0,retLen-diff):str
}

var arrayToWhereString = (where)=>{
    var arrStr = ""
    for(var key in where){
        arrStr+= key + " = "+ practify(where[key],"string") + " AND "
    }
    return removeLastGivenString(arrStr,"AND")
}
/* ------------------------------------------------------------- *
||| getKeyInParkets function take object and generating string of 
||| input => {id:10, name:"test",....etc}
||| output => ( id , name , ...etc)
 * ------------------------------------------------------------- */
var getKeyInParkets = (objKey)=>{
    var arrStr = " ( "
    for(var key in objKey)
        arrStr+= "`"+ key + "` , "
    arrStr = removeLastGivenString(arrStr,',')
    arrStr+=")"
    return arrStr
}

/* ------------------------------------------------------------- *
||| getKeyInParkets function take object and generating string of 
||| input => {id:10, name:"test",....etc}
||| output => ( id , name , ...etc)
 * ------------------------------------------------------------- */
var getValueInPrakets = (objVals)=>{
    var arrStr = " ( "
    
    for(var key in objVals)
        arrStr+= practify(objVals[key],"string") + " , "
    arrStr = removeLastGivenString(arrStr,',')
    arrStr+=")"
    return arrStr
}

var practify = (str, type,prepo = "'")=>{
    if(type != "*")
        str = (typeof(str) == "string")?prepo+str+prepo:str
    else 
        str= prepo+str+prepo
    return str
}

var makeSettingKeyValString = (upObj)=>{
    var updatingStr = ""
    for(var key in upObj)
        updatingStr+= practify(key,"*","`") + "=" + practify(upObj[key],"string") + " , "
    updatingStr = removeLastGivenString(updatingStr,',')
    return updatingStr
    //console.log(updatingStr)
}

var repeateGiven = (given, freq)=>{
    var repatedStr = "";
    while(freq--)
        repatedStr+=given
    return repatedStr
}

var getKeyName = (obj)=>{
    var gettingKey = ""
    for(var key in obj){
        gettingKey = key
    }
    return gettingKey
}

var getValueName = (obj)=>{
    var gettingVal = ""
    for(var key in obj)
        gettingVal = obj[key]
    return gettingVal
}


module.exports.removeLastSpace          = removeLastSpace
module.exports.removeLastGivenString    = removeLastGivenString
module.exports.arrayToWhereString       = arrayToWhereString
module.exports.getKeyInParkets          = getKeyInParkets
module.exports.getValueInPrakets        = getValueInPrakets
module.exports.makeSettingKeyValString  = makeSettingKeyValString
module.exports.repeateGiven             = repeateGiven
module.exports.getKeyName               = getKeyName
module.exports.getValueName             = getValueName

