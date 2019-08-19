const mongoose = require('mongoose');

let Todo = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, default: null},
    priority: {type: String, default: 'low'},
    createdDate: {type: String, default: null},
    isAdmin: {type: Boolean, default: false},
    createdBy: {type: mongoose.Schema.Types.ObjectId},
    updatedDate: {type: Number, default: null},
    deadline: {type: Number, default: null},
    status: {type: String, default: 'pending'}
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Todo', Todo);
console.log('todo.js loaded successfully');