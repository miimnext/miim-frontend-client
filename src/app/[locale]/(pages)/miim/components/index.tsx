import dynamic from "next/dynamic";
const componentsMaps = {
  InfiniteScroll: dynamic(() => import("./InfiniteScroll")),
  Button: dynamic(() => import("./Button")),
  Upload: dynamic(() => import("./Upload")),
  Modal: dynamic(() => import("./Modal")),
  Form: dynamic(() => import("./Form")),
  Menu: dynamic(() => import("./Menu")),
};
export default componentsMaps;
