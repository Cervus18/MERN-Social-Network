const express = require('express')
const router=express.Router()
const Profile = require('../../models/profile');
const auth = require('../../middleware/auth');
const User= require('../../models/user')
const { check, validationResult } = require('express-validator');
const user = require('../../models/user');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  auth,
  check('status', 'Status is required').notEmpty(),
  check('skills', 'Skills is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook
    } = req.body;

    // Build profile fields
    const profileFields = {}
    profileFields.user = req.user.id

    if(company) profileFields.company = company
    if(website) profileFields.website = website
    if(location) profileFields.location = location
    if(bio) profileFields.bio = bio
    if(status) profileFields.status = status
    if(githubusername) profileFields.githubusername = githubusername
    if(skills){
      profileFields.skills = skills.split(',').map(skill => skill.trim())
    }
    
   // Build social object
   profileFields.social={}

   if(youtube) profileFields.social.youtube = youtube
   if(twitter) profileFields.social.twitter = twitter
   if(facebook) profileFields.social.facebook = facebook
   if(linkedin) profileFields.social.linkedin = linkedin
   if(instagram) profileFields.social.instagram = instagram

   try{

    let profile = await Profile.findOne({user: req.user.id})

    if(profile){
      // if the profile is found Update
      profile = await Profile.findOneAndUpdate({user: req.user.id},{$set: profileFields},{new: true})

      return res.json(profile)

    }
    // if profile not found Create it
    profile = new Profile(profileFields)
    await profile.save()
    res.json(profile)


   }catch(err){
     console.error(err.message)
     res.status(500).send('Server Error')
   }

  }
);


// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
/*router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});*/

router.get('/search/:query', async (req, res) => {
  const query = req.params.query
  try {
    const users = await User.find({name:{ $regex: '.*' + query + '.*' } })
   
    const profiles = []
    for(let i =0; i<users.length; i++){
      let profile = await Profile.find({user:users[i]._id}).populate('user', ['name', 'avatar'])
      profiles.push(...profile)
    }
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
    try {
     const  profile = await Profile.findOne({user:req.params.user_id}).populate('user', ['name', 'avatar']);

     if(!profile){ return res.status(400).json({msg: 'Profile not found'}) }
     res.json(profile)

    } catch (err) {
      console.error(err.message);
      if(err.kind == 'ObjectId'){
        return res.status(400).json({msg: 'Profile not found'}) 
      }
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private

router.delete('/', auth, async (req, res) => {
  try {
    // todo -- remove users posts

    //Remove profile
    await Profile.findOneAndRemove({user: req.user.id})

    //Remove user
    await User.findOneAndRemove({_id: req.user.id})

    res.json({msg:'User deleted'})


  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private

router.put( '/experience',auth,
  check('title', 'Title is required').notEmpty(),
  check('company', 'Company is required').notEmpty(),
  check('from', 'From date is required and needs to be from the past').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body

    const newExp  = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } 

    try {

      const profile = await Profile.findOne({user:req.user.id})
      profile.experience.unshift(newExp)
      await profile.save()
      res.json(profile)

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
)


// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get remove index
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)
    profile.experience.splice(removeIndex,1)

    await profile.save()
    res.json(profile)

   
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});
/*----------*/
// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private

router.put( '/education',auth,
  check('school', 'School is required').notEmpty(),
  check('degree', 'Degree is required').notEmpty(),
  check('fieldofstudy', 'Field of study is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body

    const newEdu  = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } 

    try {

      const profile = await Profile.findOne({user:req.user.id})
      profile.education.unshift(newEdu)
      await profile.save()
      res.json(profile)

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
)


// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    //Get remove index
    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)
    profile.education.splice(removeIndex,1)

    await profile.save()
    res.json(profile)

   
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});
module.exports = router;


//// @route  PUT api/profile/follow/:user_id
// @desc     Follow or unfollow a user
// @access   Private

router.put('/follow/:user_id',auth, async (req, res) => {
  try {
    //get user to follow
    const userToFollow = await User.findOne({ _id:req.params.user_id });
    //if user to follow doesnt exist
    if(!userToFollow){ return res.status(400).json({msg: 'User not found'}) }

    const profile = await Profile.findOne({user:req.user.id})

    //Follow if not followed or unfollow if followed
    if (profile.followings.some((userObject) => userObject.user.toString() === userToFollow._id.toString())) {
      //Unfollow
      profile.followings = profile.followings.filter(
        ({ user }) => user.toString() !== userToFollow._id.toString()
      );
     
     
     

    }else{
      //Follow
      profile.followings.push({user: userToFollow._id})


      

    }
     

    await profile.save();
    return res.json(profile.followings);
   
    
    
  } catch (err) {
    console.error(err.message);
    if(err.kind == 'ObjectId'){
      return res.status(400).json({msg: 'User not found'}) 
    }
    return res.status(500).json({ msg: 'Server error' });
  }
})

//// @route  GET api/profile/followings/
// @desc     get the followings of logged in user
// @access   Private

router.get('/followings/',auth, async (req, res) => {

  try {
    const profile =await  Profile.findOne({user: req.user.id})
    let followings = [...profile.followings]
    let user1 = await User.findOne({_id:req.user.id})
    let user={user: user1._id, _id: user1._id}
    followings.push(user)
    res.json(followings)
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
})