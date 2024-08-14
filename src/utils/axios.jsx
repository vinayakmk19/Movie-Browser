import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWZiNzE3MjkwNDM0OGNhMWRkN2VkYjRlN2M2ZGMwZCIsIm5iZiI6MTcyMzYzNTA4Ny4xNzgyNjEsInN1YiI6IjY2YmI1ZWIxNzliZWMxYzM3OTFhNmZiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KicVWfgvBpSty7Y-DYQG2S0QKC5RbweFn85n79SYrRA",
  },
});

export default instance;
