import dynamic from "next/dynamic";
const componentsMaps = {
  InfiniteScroll: dynamic(() => import("./InfiniteScroll")),
  Button: dynamic(() => import("./Button")),
  Modal: dynamic(() => import("./Modal")),
};
export default componentsMaps;
