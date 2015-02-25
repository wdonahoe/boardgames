var express = require('express')
var router = express.Router()
var sqlite3 = require('sqlite3').verbose()
var _ = require("underscore")
var restify = require('restify')

var db = new sqlite3.Database('db/bgg.sqlite', function(err){
    if (err)
        throw err
    console.log("Connected to sqlite3 database bgg")
})

var query ="select objectname, games.objectid, rank, playingtime, minplayers, maxplayers, thumbnail, image, description, categories, bggbestplayers from games left join extra on (games.objectid = extra.objectid)"

/*

*/
router.get('/api/games', function(req, res) { 
    if (/\?.+/.test(req.url)) {
        executeQuery(req.query,res,false)
    } else {
        db.all(query, function(err,games){
            if (err)
                throw err
            res.json({games:games})
        })
    }
})

/*

*/
router.get('/api/games/range',function(req,res){
    if (/\?.+/.test(req.url)) {
        var queries = req.query
        var str = "select * from games where "
        for(var col in queries){
            str += col + " " + queries[col] + " and "
        }
        str = str.substring(0, str.lastIndexOf(" and ")) + "";
    
        db.all(str,function(err,games){
            if (err)
                throw err
            res.json({games:games})
        })
    } else {
        res.json(new restify.InvalidArgumentError('Please supply a column name for a range query!'))
    }
})

/*

*/
router.get('/api/games/random/:n',function(req,res){
    var str = "select * from games order by random() limit 0, " + Number(req.params.n)
    db.all(str,function(err,games){
        if (err)
            throw err
        res.json({games:games})
    })
})

/*

*/
router.get('/api/games/:id',function(req,res){
    db.get(query + " where games.objectid=" + req.params.id, function(err,game){
        if (err)
            throw err
        res.json({game:game})
    })
})

router.get('/partials/:filename',function(req,res){
    res.render('partials/' + req.params.filename)
})

router.get('/',function(req,res){
    res.render('index')
})

/*

*/
function executeQuery(queries,res){
    var str = prepareConjunct(queries)
    db.all(str,function(err,games){
        if (err)
            throw err
        res.json({games:games})
    })
}

/*

*/
function prepareConjunct(queries){
    var str = "select * from games where "
    for(var col in queries){
        str += col + "=" + queries[col] + " and "
    }
    str = str.substring(0, str.lastIndexOf(" and ")) + "";
    
    return str
}

module.exports = router
