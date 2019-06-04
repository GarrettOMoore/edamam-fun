const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pantrySchema = new Schema ({
	user_id: {
		type: Schema.Types.ObjectId, ref: 'User'
	}, 
	name: {
		type: String
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

module.exports = mongoose.model('Pantry', pantrySchema);