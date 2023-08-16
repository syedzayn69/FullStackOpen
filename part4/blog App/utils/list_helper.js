    const dummy = (blogs) => {
        return 1
    }

    const totalLikes = (blogs) => {
        let totalLikes = 0
        blogs.forEach(elem => {
            totalLikes += elem.likes
        });
        return totalLikes
    }

    const favoriteBlog = (blogs) => {
        const newArr = []
        blogs.map(elem => {
            newArr.push(elem.likes)
        });
        return Math.max(...newArr)
    }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }