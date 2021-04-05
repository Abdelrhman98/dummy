
var _ = require('lodash');
var db = require('./connection');
var sutil = require("../helpers/stringUtil")
var runQr = require('./query');
const { get } = require('lodash');
var queryBuilder = class{
    constructor(dbTable){
        this.table = dbTable
        this.currquery = ""
    }
    get getTable(){
        return this.table
    }
    setTable(tableName){
        this.table =tableName
    }
    select(select="*", where={},options=""){
        this.currquery = "SELECT " + select + " FROM " + this.table 
        this.currquery +=(!_.isEmpty(where))?" WHERE ":""
        var finQur = this.currquery + sutil.arrayToWhereString(where) + " " +options
        return finQur
    }

    insert(dataValues){
        this.currquery = "INSERT INTO " + this.table + sutil.getKeyInParkets(dataValues)  + " VALUES " + sutil.getValueInPrakets(dataValues)
        //console.log(this.currquery)
        return this.currquery
    }

    update(updatedObj, whereObj){
        this.currquery  = "UPDATE " + this.table + " SET " + sutil.makeSettingKeyValString(updatedObj) + " WHERE "
        var whereStr    = _.isEmpty(whereObj)?" 1 ": sutil.arrayToWhereString(whereObj)
        this.currquery  += whereStr
        //console.log(whereStr)
        //console.log(this.currquery)
        return this.currquery
    }

    delete(whereObj){
        this.currquery = "DELETE FROM " + this.table + " WHERE " ;
        var whereStr    = _.isEmpty(whereObj)?" 1 ": sutil.arrayToWhereString(whereObj)
        this.currquery  += whereStr
        //console.log(this.currquery)
        return this.currquery
    }

    inner_join(select="*",joinsTo){
        const joinsSize = _.size(joinsTo)
        this.currquery = "SELECT "+ select + " FROM "
        this.currquery+= sutil.repeateGiven("(", joinsSize) + this.table
        for(var key in joinsTo){
            this.currquery+= " INNER JOIN " + sutil.getKeyName(joinsTo[key]) 
                            + " ON " + this.table + "." + key + " = " 
                            + sutil.getKeyName(joinsTo[key]) + "." +sutil.getValueName(joinsTo[key]) + ")"
        }
        return this.currquery
    }

    like(select="*",col,pattern){
        this.currquery = "SELECT " + select + " FROM " + this.table + " WHERE " + col + " LIKE '" + pattern +"'"
        return this.currquery
    }
    
    condition(conObj){
        this.currquery = sutil.removeLastGivenString(this.currquery,")")
        this.currquery+= " AND " + this.table + "." + sutil.getKeyName(conObj)
        + " = " + sutil.getValueName(conObj)
        //console.log(this.currquery)
        return this.currquery
    }
} 


module.exports = queryBuilder

/*
var geting  = {"branch_name":{shoon_branches:"id"}}
for(var key in geting){
    console.log(geting[key])
}
*/
//console.log(_.size(geting))

/*
var test = sutil.makeSettingKeyValString({id:123, name:"asdasd"})
console.log(test)
*/
//console.log(test)
/*
const dbs = new queryBuilder("shoon_dobat")
var s =dbs.inner_join("shoon_dobat.id, shoon_branches.branchName",geting)
console.log(s)
*/
/*var ret = dbs.arrayToWhereString({id:"123", name:"asdasd"})
var last = ret.lastIndexOf("AND")
var len = ret.length
console.log(last + " " +len + " " + (len-last))*/
//console.log(dbs.removeLastGivenString("id = 123 AND name = asdasd AND ", "AND"))