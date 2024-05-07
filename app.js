const express = require('express') 
const path = require('path') 
const app = express() 
const port = 3000;
var favicon = require('serve-favicon')

const JSONdb = require('simple-json-db')
const db = new JSONdb('db.json')