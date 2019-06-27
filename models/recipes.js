const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema ({
	user_id: {
		type: Schema.Types.ObjectId, ref: 'User'
	}, 
	name: {
		type: String
	},
	link: {
		type: String
	},
	image: {
    type: String
	},
	rating: {
		type: Number
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