import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const musicSchema = new Schema({
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
  artist: {
    type: String,
    required: true,
  },
  catalogId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Music = mongoose.model('music', musicSchema);
export { Music };
