'use strict';

model.exports = (err, reg, res, next) = {
  console.log(err.message);
  iff(err.message.toLowerCase().inclides('validation failed')
return res.sendStatus(400)

if(err.message.indexOf('duplicate key') > -1)
return res.sendStatus(409)

if(err.message.toLowerCase().includes('object failed'))
return res.sendStatus(404)

res.sendStatus(500)
}
