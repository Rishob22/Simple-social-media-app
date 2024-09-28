import { useContext, useRef } from "react";
import { PostListContext } from "../store/post-list-store";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const navigate = useNavigate();
  const userIdRef = useRef();
  const postTitleRef = useRef();
  const postContentRef = useRef();
  const postLikesRef = useRef();
  const postDislikesRef = useRef();
  const postTagsRef = useRef();
  const { addPost } = useContext(PostListContext);
  const handleSubmit = (event) => {
    console.log("Submit button clicked");
    event.preventDefault();
    const userIdValue = userIdRef.current.value;
    const postTitleValue = postTitleRef.current.value;
    const postContentValue = postContentRef.current.value;
    const postLikesValue = postLikesRef.current.value;
    const postDislikesValue = postDislikesRef.current.value;
    const postTagsValue = postTagsRef.current.value.split(" ");

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postTitleValue,
        body: postContentValue,
        reactions: { likes: postLikesValue, dislikes: postDislikesValue },
        userId: userIdValue,
        tags: postTagsValue,
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        addPost(post);
        navigate("/");
        //navigate only when the response is received from the server
      });

    userIdRef.current.value = "";
    postTitleRef.current.value = "";
    postContentRef.current.value = "";
    postLikesRef.current.value = "";
    postDislikesRef.current.value = "";
    postTagsRef.current.value = [];
  };
  return (
    <form className="createPost" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          User ID
        </label>
        <input
          type="text"
          className="form-control"
          id="userId"
          placeholder="Enter your User ID"
          ref={userIdRef}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="postTitle" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          className="form-control"
          id="postTitle"
          placeholder="How are you feeling today..."
          ref={postTitleRef}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="postContent" className="form-label">
          Post Content
        </label>
        <textarea
          type="text"
          className="form-control"
          id="postContent"
          placeholder="Tell us more about it!"
          ref={postContentRef}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="postReactions" className="form-label">
          Likes
        </label>
        <input
          type="text"
          className="form-control"
          id="postLikes"
          placeholder="Enter the number of likes on the post"
          ref={postLikesRef}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="postReactions" className="form-label">
          Dislikes
        </label>
        <input
          type="text"
          className="form-control"
          id="postDislikes"
          placeholder="Enter the number of dislikes on the post"
          ref={postDislikesRef}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="postTags" className="form-label">
          Tags
        </label>
        <input
          type="text"
          className="form-control"
          id="postTags"
          placeholder="Enter the tags separated by space"
          ref={postTagsRef}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};
export default CreatePost;
