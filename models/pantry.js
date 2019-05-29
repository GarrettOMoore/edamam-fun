const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const pantrySchema = new Schema ({
	name: {
		type: String,
		required: [true, 'You must enter a name'],
		minlength: [1, 'Name must be between 1 and 99 characters.'],
		maxlength: [99, 'Name must be between 1 and 99 characters']
	},
	quantity: {
		type: Number
	},
	image: {
    type: String
  }
})

pantrySchema.set('toObject', {
	transform: function (doc, ret, options)  {
		let returnJson = {
			_id: ret._id,
			name: ret.name,
			quantity: ret.quantity,
      image: ret.image,
		}
		return returnJson;
	}
});