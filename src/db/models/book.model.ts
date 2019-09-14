import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: false,
  },
  year: {
    type: Date,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: true,
  },
  catalogId: {
    type: Schema.Types.ObjectId,
    required: false,
  },
});

const Book = mongoose.model('book', bookSchema);
export { Book };
