const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require('mongoose-auto-increment-reworked');

const { Schema } = mongoose;

const userSchema = new Schema(
   {
      first_name: {
         type: String,
      },
      last_name: {
         type: String,
      },
      email: {
         type: String,
         required: true,
      },
      coins_count: {
         type: Number,
         required: false,
         default: 0,
      },
      profile_picture_link: { type: String },
      auth: {
         local: {
            passwordHash: String,
         },
         facebook: {
            id: String,
            accessToken: String,
         },
         google: {
            id: String,
            accessToken: String,
         },
      },
   },
   { versionKey: false, timestamps: true }
);

userSchema.plugin(MongooseAutoIncrementID.plugin, { modelName: 'users' });

const DBUser = mongoose.model('users', userSchema);
const makeDBUser = (user) => {
   return new DBUser({
      first_name: user.getFirstName(),
      last_name: user.getLastName(),
      email: user.getEmail(),
      coins_count: user.getCoinsCount(),
      profile_picture_link: user.getProfilePictureLink(),
      auth: user.getAuthData(),
   });
};

module.exports = {
   DBUser,
   makeDBUser,
};
