const User = require('../models/user');

exports.signup = (req, res) => {
  // try
  const user = new User({
    username: 'Tair Mazuz55',
    email: 'about my new blog',
    password: 'more about my new blog',
    phone: 'about my new blog',
    address: 'about my new blog',
    name: 'about my new blog',
  });

  //user.save()

//   const { email, password, username } = req.body;
//   const level = 'starter';
//   // Check if the user already exists in the database
//   User.findOne({ $or: [{ email }, { username }] })
//     .then(existingUser => {
//       if (existingUser) {
//         if (existingUser.email === email) {
//           res.status(400).json({ error: 'Email already exists' });

//         }
//       } else {
//         // Create a new user
//         const newUser = new User({ email, password, username ,level});
//        //try

//         //end of try
//         // Save the user to the database
//         newUser.save()
//           .then(() => {
//             res.status(200).json({ message: 'Sign up successful' });
//           })
//           .catch(error => {
//             console.error('Sign up error:', error);
//             res.status(500).json({ error: 'Internal server error' });
//           });
//       }
//     })
//     .catch(error => {
//       console.error('User lookup error:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     });
// };