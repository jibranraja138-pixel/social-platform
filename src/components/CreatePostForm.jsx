import { useState } from "react";

function CreatePostForm({ addPost }) {
  const [content, setContent] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    addPost(content);

    setContent("");
  };

  return (
    <form onSubmit={submitHandler}>
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
      />

      <button>Create Post</button>
    </form>
  );
}

export default CreatePostForm;