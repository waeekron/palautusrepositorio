const helper = require("./blog_helper.test")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chang",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
]

const Blog = require("../models/blog")
const User = require("../models/user")

describe("when there is blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })


  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("correct amount of blogs", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body).toHaveLength(2)
  })

  test("has 'id' identificator", async () => {
    const res = await api.get("/api/blogs")
    res.body.forEach((blog) => expect(blog.id).toBeDefined())
  })
})


describe("Adding a new blog", () => {
  test("user can add blogs", async () => {
    const newBlog = {
      title: "Otsikko4",
      author: "Walter Kronqvist3",
      url: "www.google.com",
      likes: 0,
    }
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()


    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
  })

  test("Adding blog that has a missing like value", async () => {
    const newBlog = {
      title: "titteli",
      author: "Anni Kronq",
      url: "www.google.com",
    }

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/)
      .catch((error) => console.log(error))
    const res = await api.get("/api/blogs")
    res.body.forEach((blog) => expect(blog.likes).toBeDefined())
  })
})


describe("Deleting a blog", () => {
  test("Returns 204 when deletion is succesfull", async () => {
    const blogAtStart =  await Blog.find({})

    const blogToDelete = blogAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({})

    expect(blogsAtEnd).toHaveLength(
      blogAtStart.length - 1
    )

    const titles = blogsAtEnd.map(r => r.titles)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe("Creating users", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash })

    await user.save()
  })
  test("Creating user with unique username", async () => {
    //const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: "kissa2",
      name: "Mia Umau",
      password: "kissanminttu",
    }
    await api.post("/api/users").send(newUser).expect(201).expect("Content-Type", /application\/json/)
  })

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("username must be unique")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})


afterAll(() => {
  mongoose.connection.close()
})

