const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  title: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  note: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

//* IF we need to change the way that serialize the model, we can change this by accesing the object and rewrite the properties that need to change. Like this:

eventSchema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Event', eventSchema);
