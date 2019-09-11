import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const movieSchema = new Schema({
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
  director: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model('movie', movieSchema);
export { Movie };
