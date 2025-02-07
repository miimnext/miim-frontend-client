import dynamic from "next/dynamic";
const componentsMaps = {
  InfiniteScroll: dynamic(() => import("./InfiniteScroll")),
  Button: dynamic(() => import("./Button")),
};
export default componentsMaps;
