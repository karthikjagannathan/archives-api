import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const catalogSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Catalog = mongoose.model('catalog', catalogSchema);
export { Catalog };
