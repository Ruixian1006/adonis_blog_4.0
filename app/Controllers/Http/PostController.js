'use strict'

//Bring in model
const Post = use('App/Models/Post') 

//Bring in validator
const { validate } = use('Validator')

class PostController {
    // need to input the params of view in order to call
    async index({view}){
        // const posts = [
        //     {title:'Post One', body:'This is post one'},
        //     {title:'Post Two', body:'This is post two'},
        //     {title:'Post Three', body:'This is post three'},
        // ]

        // The posts object is an instance of Vanilla serializer
        const posts = await Post.all();
        // render index page under posts & pass the data title over to the frontend
        return view.render('posts.index',{
            title : 'Latest Posts',
            posts: posts.toJSON(),
        })
    }

    async details({params, view}){
        const post = await Post.find(params.id)
        console.log(post.toJSON())
        return view.render('posts.details',{
            post:post.toJSON()
        })
    }

    async add({view}){
        return view.render('posts.add')
    }
    
    async store({request, response, session}){
        const validation = await validate(request.all(),{
            title: 'required|min:3,max:255',
            body: 'required|min:3'
        })

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }   
        const post = new Post()
        post.title = request.input('title')
        post.body = request.input('body')
        await post.save()

        session.flash({notification: 'Post Added'})
        return response.redirect('/posts')
    }
    async edit({params, view}){
       const post = await Post.find(params.id)
        return view.render('posts.edit',{
            post:post.toJSON()
        })
    }
    async update({params, request, response, session}){
        const validation = await validate(request.all(),{
            title: 'required|min:3,max:255',
            body: 'required|min:3'
        })

        if(validation.fails()){
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }   
        const post = await Post.find(params.id)
        post.title = request.input('title')
        post.body = request.input('body')
        await post.save()

        session.flash({notification: 'Post Updated!'})
        response.redirect('/posts')
    }

    async destroy({params, response, session}){
        const post  = await Post.find(params.id)
        await post.delete()
        session.flash({notification: 'Post Deleted!'})
        response.redirect('/posts')
    }
}

module.exports = PostController
