import Post from "./Post";

import LoadingSpinner from "./LoadingSpinner";
import { useContext, useEffect, useState } from "react";
import { PostListContext } from "../store/post-list-store";
const PostList = () => {
  let { postList, fetching } = useContext(PostListContext);

  return (
    <>
      {fetching && <LoadingSpinner />}
      {!fetching && postList.length === 0 && (
        <center>
          <h1 className="emptyAndLoadingStyle">There are no posts to show</h1>
        </center>
      )}
      {!fetching && postList.map((post) => <Post post={post} />)}
    </>
  );
};
export default PostList;
