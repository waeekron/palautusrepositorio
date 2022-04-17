const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
/*const getTokenFrom = request => {
  const authorization = request.get("authorization")
  console.log(authorization)
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7)
  }
  return null
}*/

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
  const body = request.body
  const token = request.token
  if (!body.title || !body.url) {
    response.status(404).end()
  }
  //const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token) {
    return response.status(401).json({ error: "token missing or invalid" })
  }
  const user = request.user//await User.findById(decodedToken.id)

  console.log(user)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
  const blogId = request.params.id
  const token = request.token
  //const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token ) {
    return response.status(401).json({ error: "token missing or invalid" })
  }

  const blog = await Blog.findById(blogId)
  const user = request.user

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
    return
  }
  response.status(401).json( { error: "Only person who posted the blog can delete it." } ).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog =  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(204).json(updatedBlog)
})

module.exports = blogsRouter
