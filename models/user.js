import mongoose from 'mongoose';

const { Schema } = mongoose;

const cardSchema = new Schema({
  id: {
    type: String,
    index: true,
    required: true,
    minlength: 10,
    maxlength: 19,
  },
  name: {
    type: String,
    required: true,
    default: '',
    minlength: 1,
    maxlength: 20,
  },
});

const userSchema = new Schema({
  id: {
    type: Number,
    required: true,
    index: true,
  },
  cards: [cardSchema],
  settings: {
    main: {
      type: String, minlength: 10, maxlength: 19, default: null,
    },
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  },
});

export default mongoose.model('User', userSchema);
