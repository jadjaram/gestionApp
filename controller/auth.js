import User from "../models/User.js";

export const createUser = async(req, res, next)=> {

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    try {
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
        })
        await newUser.save()
        res.status(200).send("User has been created")
    } catch (err) {
        next(err)
    }


}

export const login = async(req, res, next) =>{

    try {

        const user = await User.findOne({email: req.body.email})

        if(!user) return next(createError(404,"user not found"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)

        if(!isPasswordCorrect) return next(createError(404,"password or email incorrect"))
        
        const token = jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.JWT)

        const {password, role, ...otherDetail} = user._doc

        res
        .cookie('access_token', token,{
            httpOnly: true,
        })
        .status(200).json({otherDetail})

    } catch (err) {
        next(err)
    }
}
