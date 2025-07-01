const Profile = require('../models/profile.js')
const User = require('../models/user.js')
const mongoose = require('mongoose') // Database

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user.id // from auth middleware
    const { avatar, bio, location, language, job, phoneNumber } = req.body

    const profileData = {
      user: userId,
      avatar,
      bio,
      location,
      language,
      job,
      phoneNumber
    }

    let profile = await Profile.findOne({ user: userId })

    if (profile) {
      profile = await Profile.findOneAndUpdate({ user: userId }, profileData, {
        new: true,
      })
    } else {
      profile = await Profile.create(profileData)
    }

    res.status(200).json(profile)
  } catch (err) {
    console.error('Error creating/updating profile:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id

    const profile = await Profile.findOne({ user: userId }).populate(
      'user',
      'name email'
    )

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }

    res.status(200).json(profile)
  } catch (err) {
    console.error('Error fetching profile:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.getPublicUserProfile = async (req, res) => {
  try {
    const userId = req.params.id

    const profile = await Profile.findOne({ user: userId }).populate(
      'user',
      'name email'
    )

    if (!profile) {
      return res.status(404).json({ message: 'User profile not found' })
    }

    res.status(200).json(profile)
  } catch (err) {
    console.error('Error fetching public profile:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

