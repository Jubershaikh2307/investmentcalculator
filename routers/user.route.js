const express = require('express');
const { userModel } = require('../Models/user.models');

const User = express()

User.post("/login", async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email, password })
        if (user == null) {
            return res.send({ "responce": "Fail" })
        }
        return res.send({ "responce": "Success" })
    } catch (error) {
        return res.send("Check Username and Password");
    }

})

User.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    try {
        const new_user = new userModel({
            name,
            email,
            password
        })
        await new_user.save()
        return res.send("Success")
    } catch (error) {
        return res.send(err)
    }

})

User.post("/getProfile", async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email, password })
        res.send(user)
    } catch (error) {
        return res.send("Check Username and Password");
    }
})

User.post("/calculate", async (req, res) => {
    const { p, i, y } = req.body
    // F = P [({(1+i) ^n}-1)/i]
    let temp=1+(i/100)
    let temp1=temp**y
    let temp3=((temp1-1)/(i/100))
    let f=p*temp3
    let ti=Number(p)*y
    let tm=f-ti
    return res.send({f,ti,tm})

})

module.exports = { User }