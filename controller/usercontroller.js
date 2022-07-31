const User = require("../models/usermodel");
const Garbage = require("../models/Garbagemodel")
const UserTransaction=require('../models/userTransaction')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const validateRegisterInput = require("../utils/validation/signup")
const { sendemail } = require('../utils/Sendemail');

exports.registration = (req, res) => {
  //Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(async (user) => {
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      const pass = await bcrypt.hash(req.body.password, 8)
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        city: req.body.city,
        password: pass,
      });

      newUser.save().then(async (user) => {
        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECERET);
        return res.status(201).json({ user, token })
      }).catch((error) => res.json(error))

    }
  }).catch((error) => res.json(error));
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }).then(async (user) => {
    if (!user) {
      return res.status(404).send({ "error": "User not Found" })
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) {
      return res.status(404).send({ "error": "password is not valid" })
    }

    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECERET)
    return res.status(200).send({ "user": user, "token": token })
  })
};

let o = "";
exports.checkuser = (req, res) => {
  User.findOne({ email: req.body.email }).then(async (user) => {
    if (!user) {
      return res.status(400).send({ "error": "user not found" })
    }

    const otp = await sendemail(req.body.email)
    o = otp
    return res.status(200).send({ "message": "user found" })
  })
}

exports.editprofile = (req, res) => {
  User.findOne({ email: req.body.email }).then(async (user) => {
    if (!user) {
      return res.status(400).send({ "error": "user not found" })
    }

    user.name = req.body.name
    user.mobile = req.body.mobile
    user.city = req.body.city

    await user.save()
    return res.status(200).send({ "user": user })

  })
}

exports.checkotp = async (req, res) => {
  if (o == req.body.otp) {
    return res.status(200).send("valid otp")
  }

  return res.status(400).send("invalid otp")

}

exports.updatepassword = async (req, res) => {
  User.findOne({ email: req.body.email }).then(async user => {
    if (!user) {
      return res.status(400).send("user not found")
    }
    const pass = await bcrypt.hash(req.body.password, 8)
    user.password = pass
    user.save()
  })
}

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (user) {
      return res.status(200).send(user)
    }
  }
  catch (e) {
    return res.status(400).send(e)
  }
}

exports.logout = (req, res) => {
  res.status(200).send("logged out");
}

exports.changepassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(400).send("user not found")
    }
    const isMatch = await bcrypt.compare(req.body.oldpsw, user.password)
    if (!isMatch) {
      return res.status(400).send("old password is wrong")
    }
    const pass = await bcrypt.hash(req.body.newpsw, 8)
    user.password = pass
    user.save()
    return res.status(200).send("password changed")
  } catch (e) {
    return res.status(400).send(e)
  }
}

exports.getgarbage = async (req, res) => {
  const garbage = await Garbage.find({})
  return res.status(200).send(garbage)
}

exports.getusertransaction = async (req, res) => {
  try {
    await UserTransaction.find({ userId: req.user._id }).then(transactions => {
      return res.status(200).send(transactions)
    })
  } catch (error) {
    return res.status(400).send(error)
  }
}

exports.reedommoney=async(req,res)=>{
  try {
    await User.findById(req.user._id).then(async user=>{
      user.walletAmount=parseFloat((user.walletAmount-req.body.money).toFixed(2))
      await user.save()
      const userTra=new UserTransaction({
        userId:user._id,
        withdraw:parseFloat(req.body.money),
        sender:user.name,
        receiver:`${user.name}'s Bank Account`
      })
      await userTra.save()
      return res.status(200).send("ok")
    })
  } catch (e) {
    return res.status(400).send(e)
  }
}