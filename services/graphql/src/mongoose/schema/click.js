const { Schema } = require('mongoose');

const schema = new Schema({
  adId: Schema.Types.ObjectId,
  lineitemId: Schema.Types.ObjectId,
  orderId: Schema.Types.ObjectId,
  advertiserId: Schema.Types.ObjectId,
  adunitId: Schema.Types.ObjectId,
  deploymentId: Schema.Types.ObjectId,
  publisherId: Schema.Types.ObjectId,
  date: Date,
  email: String,
  send: String,
});

module.exports = schema;