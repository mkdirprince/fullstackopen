const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
  ? 0
  : blogs.reduce(reducer, 0)
}


const favoriteBlog = (blogs) => {


  const blogLikes = blogs.map(blog => blog.likes)

  const maxLikes = Math.max(...blogLikes)

  return blogs.filter(blog => blog.likes === maxLikes)
}


const mostBlogs = (blogs) => {

  const authorsCount = _.countBy(blogs, 'author')

  const authorsObject = _.map(authorsCount, (count, author) => ({
    author, 
    blogs: count
  }))



  return _.maxBy(authorsObject, 'blogs')

}

const mostLikes = (blogs) => {
  
  const authorLikes = _.chain(blogs)
    .groupBy('author')
    .map((blogs, author) => ({ author, likes: _.sumBy(blogs, 'likes') }))
    .value();

  const mostLikes =  _.maxBy(authorLikes, 'likes')

  return _.pick(mostLikes, ['author', 'likes'])
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}