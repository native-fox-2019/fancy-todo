'use strict'
require('dotenv').config()

const { User, Todo } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis')
const generatePass = require('../helpers/generateRandomPass')
const client = new google.auth.OAuth2(process.env.CLIENT_ID, 'y1Z6s1A4HZguQKiLBZzL7Uq_', "http://localhost:3000")
const sgMail = require('@sendgrid/mail');


class ControllerUser {
    static google_login(req, res, next) {
        let { gtoken } = req.body
        let payload
        client
            .verifyIdToken({
                idToken: gtoken,
                audience: process.env.CLIENT_ID
            })
            .then(ticket => {
                payload = ticket.getPayload()
                return User.findOne({ where: { email: payload.email } })
            })
            .then(data => {
                const { email, name } = payload
                let password = generatePass()
                if (!data) {
                    return User.create({ email, name, password })
                } else {
                    return data
                }
            })
            .then(data => {
                const scopes = ['https://www.googleapis.com/auth/calendar']
                const url = client.generateAuthUrl({
                    access_type: 'offline',
                    scope: scopes
                })
                const token = jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET)
                res.status(200).json({ token, url })
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static register(req, res, next) {
        const { email, name, password } = req.body
        User
            .create({ email, name, password })
            .then(data => {

                res.status(200).json({ data })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body;
        console.log ({ email, password }, req.body)
        User
            .findOne({
                where: {
                    email: email,
                }
            })
            .then(data => {
                const test = bcrypt.compareSync(password, data.password)
                if (test) {
                    const token = jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET)
                    res.status(200).json(token)
                } else {
                    throw {
                        status:404,
                        msg:'not found'
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next) {
        // let id = Number(req.user.id)
        console.log('masuk update')
        console.log(req.body,'==================')
        const { name, password, email } = req.body
        User.update({ name, password, email }, { individualHooks:true})
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static getUser(req, res, next) {
        let id = Number(req.user.id)
        User.findOne({ where: { id } })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ControllerUser