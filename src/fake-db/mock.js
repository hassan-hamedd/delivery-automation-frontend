// const MockAdapter = require('src/axios-mock-adapter')
// const axios = require('axios')
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
const Mock = new MockAdapter(axios)
export default Mock
