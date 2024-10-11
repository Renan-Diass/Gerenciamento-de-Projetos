const express = require('express')

const UserApi = require('../api/user')
const router = express.Router()

router.put('/:id', UserApi.updateUser)
router.get('/', UserApi.findUsers)
router.delete('/:id', UserApi.deleteUser)
router.get('/:id', UserApi.findUserById)

module.exports = router