import { MdDelete } from "react-icons/md";
import styles from "./Post.module.css";
import { PostListContext } from "../store/post-list-store";
import { useContext } from "react";
const Post = ({ post }) => {
  const { deletePost } = useContext(PostListContext);
  return (
    <div className={`card ${styles.postCard}`}>
      <div class="card-body">
        <h5 class="card-title">{post.title}</h5>
        <p class="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span class={`badge text-bg-primary ${styles.tagStyle}`}>
            {tag}

            <span
              onClick={() => deletePost(post.id)}
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              <MdDelete />
              <span class="visually-hidden">unread messages</span>
            </span>
          </span>
        ))}
        <div class={`alert alert-success ${styles.postReaction}`} role="alert">
          This post has {post.likes} likes and {post.dislikes} dislikes
        </div>
      </div>
    </div>
  );
};
export default Post;
