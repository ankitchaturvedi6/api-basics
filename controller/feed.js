const res = require("express/lib/response");

class Feed {
  static getPosts(req, res, next) {
    res.status(200).json({
      message: "Post Send Successfully",
      posts: [
        {
          id: Date.now().toString(),
          title: "This is Post One",
          body: "This is Post One Body",
        },
      ],
    });
  }

  static createPosts(req, res, next) {
    let title = req.body.title;
    let body = req.body.body;

    console.log(req.body);

    res.status(201).json({
      message: "Post Successfully Created",
      posts: [
        {
          id: Date.now().toString(),
          title,
          body,
        },
      ],
    });
  }
}

module.exports = Feed;
