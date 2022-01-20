var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

/* GET all. */
router.get('/', function(req, res, next) {
  var limit = 5;
  var order = "DESC";

  if(req.query.limit) limit = req.query.limit;
  if(req.query.order) order = req.query.order;

  connection.query(`SELECT * FROM temp ORDER BY temp.time ${order} LIMIT ${limit}`, function(err, rowsSelect, fields) {
    if (err) { res.sendStatus(500); console.error(err); return; };
    
    res.json(rowsSelect);
  });
});

/* GET by id. */
router.get('/:id', function(req, res, next) {
  connection.query(`SELECT * FROM temp WHERE temp.id = ?`, req.params.id, function(err, rowsSelect, fields) {
    if (err) { res.sendStatus(500); console.error(err); return; };
    
    if(rowsSelect.length > 0) {
      res.json(rowsSelect);
    }else {
      res.sendStatus(404);
    }
  });
});

/* POST add temp. */
router.post('/', function(req, res, next) {
  var { temp, time } = req.body;

  var id = uuidv4();

  connection.query(`INSERT INTO temp SET temp.id = ?, temp.temp = ?, temp.time = ?`, [id, temp, time], function(err, rowsInsert, fields) {
    if (err) { res.sendStatus(500); console.error(err); return; };
    
    res.sendStatus(200);
  });
});

/* POST update temp. */
router.put('/:id', function(req, res, next) {
  connection.query(`UPDATE temp SET ? WHERE temp.id = ?`, [req.body, req.params.id], function(err, rowsUpdate, fields) {
    if (err) { res.sendStatus(500); console.error(err); return; };
    
    res.sendStatus(200);
  });
});

/* DELETE delete temp. */
router.delete('/:id', function(req, res, next) {
  connection.query(`DELETE FROM temp WHERE temp.id = ?`, req.params.id, function(err, rowsDelete, fields) {
    if (err) { res.sendStatus(500); console.error(err); return; };
    
    res.sendStatus(200);
  });
});

module.exports = router;
