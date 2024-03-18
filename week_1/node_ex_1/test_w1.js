const base_api = "https://jsonplaceholder.typicode.com";

const getData = async (api) => {
  const response = await fetch(api, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
};

const groupData = (users, posts, comments) => {
  const data = users.map((user) => {
    user.posts = posts.filter((post) => post.userId === user.id);
    user.comments = user.posts.map((post) => {
      return comments.filter((comment) => comment.postId === post.id);
    });
    user.comments = user.comments.flat();
    const { address, phone, company, website, ...new_user } = user;
    return new_user;
  });
  return data;
};

/* This function is used to find users with more than 3 comments and 
reformat the data with the count of comments and posts*/

const filterUser = (users) => {
  const data = users.filter((user) => user.comments.length >= 3);
  const result = users.map((user) => {
    const { posts, comments, ...user_info } = user;
    return {
      postsCount: posts.length,
      commentsCount: comments.length,
      user_info,
    };
  });
  console.log(`users with more than 3 comments: ${data}`);
  console.log(`users with the count of comments and posts: ${result}`);
};

//  This function is used to find the most interactive user
const mostUser = (users) => {
  const result = users.reduce((accumulator, currentValue) => {
    if (
      currentValue.posts.length + currentValue.comments.length >
      accumulator.posts.length + accumulator.comments.length
    ) {
      return currentValue;
    }
    return accumulator;
  }, users[0]);
  const { posts, ...user_result } = result;
  console.log(user_result);
  //   console.log(`user with the most comments/posts: ${result}`);
};

const SortUserByPostCount = (users) => {
  return users.sort((a, b) => b.posts.length - a.posts.length);
};

// this function is used get data in a post
const getPostDetail = async () => {
  try {
    const [post, comments] = await Promise.all([
      getData(`${base_api}/posts/1`),
      getData(`${base_api}/comments?postId=1`),
    ]);

    console.log({ ...post, comments: comments });
  } catch (error) {
    console.log(error);
  }
};

const Solution = async () => {
  try {
    // get data from https://jsonplaceholder.typicode.com
    // const [users, posts, comments] = await Promise.all([
    //   getData(`${base_api}/users`),
    //   getData(`${base_api}/posts`),
    //   getData(`${base_api}/comments`),
    // ]);
    // // ex3
    // const new_data = groupData(users, posts, comments);
    // console.log(new_data);
    // ex 4, 5
    // filterUser(new_data);
    // ex 6
    // mostUser(new_data);

    // ex 7
    // SortUserByPostCount(new_data);

    // ex 8
    getPostDetail();
  } catch (error) {
    console.log(error);
  }
};

Solution();
