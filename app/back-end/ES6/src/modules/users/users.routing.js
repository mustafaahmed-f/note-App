// const router = require('express').Router()
import { Router } from 'express';
const router = Router();
// const usersController = require('./controller/users.js')
import * as usersController from './controller/users.js'

//get all users
router.get('/',usersController.getUsers)

//search for user by list of IDs
router.get("/search", usersController.listUsersByIDs);

//Get 3 Oldest users
router.get('/oldestThree', usersController.oldestThree )

//sign in;
router.post('/signIn' ,  usersController.signIn)

//sign up
router.post('/signUp' , usersController.signUp)

//update user
router.put('/update' , usersController.updateUser)

//delete user
router.delete('/delete/:id' , usersController.deleteUser)

//Search by age and name
router.get('/search/:letter/:age' , usersController.searchByNameAndAge)

//search by age only
router.get('/searchByAge' , usersController.searchByAge)

//get Password
router.post('/getpassword' , usersController.getPassword)


export default router