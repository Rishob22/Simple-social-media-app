import {
  createContext,
  useCallback,
  useReducer,
  useState,
  useEffect,
} from "react";
export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  fetching: false,
});
const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    if (currPostList.length === 1) return [];
    newPostList = currPostList.filter(
      (post) => post.id != action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [
      {
        id: action.payload.post.id,
        title: action.payload.post.title,
        body: action.payload.post.body,
        likes: action.payload.post.reactions.likes,
        dislikes: action.payload.post.reactions.dislikes,
        userId: action.payload.post.userId,
        tags: action.payload.post.tags,
      },
      ...newPostList,
    ];
  } else if (action.type === "ADD_INITIAL_POSTS") {
    action.payload.posts.map((post) => {
      newPostList = [
        {
          id: post.id,
          title: post.title,
          body: post.body,
          likes: post.reactions.likes,
          dislikes: post.reactions.dislikes,
          userId: post.userId,
          tags: post.tags,
        },
        ...newPostList,
      ];
    });
  }
  return newPostList;
};
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);
  const [fetching, setFetching] = useState(false);

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",

      payload: {
        post: post,
      },
    });
  };
  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts: posts,
      },
    });
  };
  const deletePost = useCallback(
    (postId) => {
      dispatchPostList({
        type: "DELETE_POST",
        payload: {
          postId: postId,
        },
      });
    },
    [dispatchPostList]
  );
  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((obj) => {
        addInitialPosts(obj.posts);
        setFetching(false);
      });
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <PostListContext.Provider
      value={{
        postList: postList,
        addPost: addPost,
        deletePost: deletePost,
        fetching: fetching,
      }}
    >
      {children}
    </PostListContext.Provider>
  );
};
export default PostListProvider;
