const Post = require("./post.model");

class PostService {
  constructor() {}

  async get(tags) {
    try {
      const { pageSize, currentPage } = tags;
      const postCount = await Post.count();
      // Find Posts
      let posts;
      if (pageSize && currentPage) {
        posts = await Post.find()
          .skip(parseInt(pageSize) * (parseInt(currentPage) - 1))
          .limit(parseInt(pageSize));
      } else {
        posts = await Post.find();
      }
      return { posts, postCount };
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id) {
    try {
      const post = await Post.findById({ _id: id });
      return post;
    } catch (error) {
      console.log("error", error);
    }
  }
  async delete(id) {
    try {
      const post = await Post.deleteOne({ _id: id });
      return post;
    } catch (error) {
      console.log("error", error);
    }
  }
  async update(id, post, imagePath) {
    const newPost = new Post({
      _id: id,
      imagePath: imagePath,
      ...post,
    });
    try {
      const postUpdated = await Post.updateOne({ _id: id }, newPost);
      return postUpdated;
    } catch (error) {}
  }
  async add(postData) {
    const post = new Post(postData);
    return post
      .save()
      .then(({ _id, body, title, imagePath }) => {
        console.log("imagePath", imagePath);
        return { id: _id, body, title, imagePath };
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = PostService;
