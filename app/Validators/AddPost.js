'use strict'

class AddPost {
  get rules() {
    return {
      // validation rules
      title: 'required|min:3,max:255',
      body: 'required|min:3',
    }
  }
  get messages() {
    return {
      'title.required': 'Key in title please',
      'title.min': 'You must at least key in 3 characters',
      'title.max': 'You have hits the max characters',
      'body.required': 'Key in body text please',
      'body.min': 'You must at least key in 3 characters',
    }
  }
}

module.exports = AddPost
