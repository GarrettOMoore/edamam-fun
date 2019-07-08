const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema ({
	id: {
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
	},
	note: {
		type: String
	},
	hasMade: {
		type: Boolean
	}
})

recipeSchema.set('toObject', {
	transform: function (doc, ret, options)  {
		let returnJson = {
			_id: ret._id,
			name: ret.name,
			link: ret.link,
      image: ret.image,
		}
		return returnJson;
	}
});

module.exports = mongoose.model('Recipe', recipeSchema);