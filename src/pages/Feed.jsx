import { useState } from "react";

import CreatePostForm from "../components/CreatePostForm";
import PostCard from "../components/PostCard";

function Feed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Ali",
      content: "Hello React Developers!"
    }
  ]);

  const addPost = (content) => {
    const newPost = {
      id: Date.now(),
      author: "You",
      content
    };

    setPosts([newPost, ...posts]);
  };

  return (
    <div className="container">
      <h2>News Feed</h2>

      <CreatePostForm addPost={addPost} />

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}

export default Feed;