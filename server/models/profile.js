import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  avatar: String,
  bio: String,
  location: String,
  languages: [String],
  occupation: String,
  phoneNumber: {
    type: String,
    required: true, 
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  carts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }],
  sessions:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
})

const Profile = mongoose.model('Profile', profileSchema)
export default Profile