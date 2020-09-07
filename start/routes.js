'use strict'

const { get, route } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('home')

Route.get('/posts', 'PostController.index')

Route.get('/posts/add', 'PostController.add')

Route.get('/posts/table', 'PostController.table')

Route.get('/posts/edit/:id', 'PostController.edit')

Route.get('/posts/export/:format', 'PostController.exportExcel')

Route.get('posts/:id', 'PostController.details')

Route.post('/posts', 'PostController.store').validator('AddPost')

Route.put('/posts/:id', 'PostController.update')

Route.delete('/posts/:id', 'PostController.destroy')
// // Run route directly with the Arrow Function
// Route.get('/test', () => 'Hello World');

// //Run route with normal function
// Route.get('/test2', function(){
//     return 'Hello There';
// });

// // Take in parameter with : 
// // Take in id parameter
// Route.get('/test/:id',function({params}){
//     return `Hello World ${params.id}`;
// });