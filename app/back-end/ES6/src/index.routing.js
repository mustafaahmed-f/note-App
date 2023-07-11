// const express = require('express')
import express from 'express'
// const usersRouting = require('./modules/users/users.routing.js')
import usersRouting from './modules/users/users.routing.js'
// const notesRouting = require('./modules/notes/notes.routing.js')
import notesRouting from './modules/notes/notes.routing.js'


const bootstrap = (app)=>{

    app.use(express.json())

    app.use('/users' ,usersRouting );
    app.use('/notes' ,notesRouting);
    app.use('*',(req,res,next)=>{
        return res.json({message : 'In-valid routing ..'})
    })
    
}

// module.exports = bootstrap;
export default bootstrap;