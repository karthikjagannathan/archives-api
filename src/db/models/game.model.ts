import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  catalogId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Game = mongoose.model('game', gameSchema);
export { Game };
