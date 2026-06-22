function PostCard({ post }) {
  return (
    <div className="card">
      <h3>{post.author}</h3>
      <p>{post.content}</p>
    </div>
  );
}

export default PostCard;