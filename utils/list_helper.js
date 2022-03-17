const dummy = (blogs) => {
  //Takes an array that contains lsits and returns 1
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  if (blogs.length === 0) return 0;
  if (blogs.length === 1) return blogs[0].likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, curr) => {
    return prev.likes < curr.likes ? curr : prev;
  });
};

const mostBlogs = (blogs) => {
  const map = new Map();
  blogs.forEach((blog) => {
    if (map.has(blog.author)) {
      let val = map.get(blog.author) + 1;
      map.set(blog.author, val);
    } else {
      map.set(blog.author, 1);
    }
  });
  let most = null;
  for (const entry of map) {
    [key, value] = entry;
    if (most === null) {
      most = entry;
    }
    if (most && most[1] < value) {
      most = entry;
    }
  }
  const obj = { author: most[0], blogs: most[1] };
  return obj;
};

const mostLikes = (blogs) => {
  // Find the author who has the most likes overall
  const map = new Map();

  blogs.forEach((blog) => {
    if (map.has(blog.author)) {
      let currentLikes = map.get(blog.author) + blog.likes;
      map.set(blog.author, currentLikes);
    } else {
      map.set(blog.author, blog.likes);
    }
  });
  let most = null;
  for (const entry of map) {
    [key, value] = entry;
    if (most === null) {
      most = entry;
    }
    if (most && most[1] < value) {
      most = entry;
    }
  }
  const obj = { author: most[0], likes: most[1] };
  return obj;
};

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
console.log(mostLikes(blogs), "testi");
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  blogs,
};
