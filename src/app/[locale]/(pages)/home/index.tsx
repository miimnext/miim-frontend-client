import ThemeSwitcher from "../../(layout)/ThemeSwitcher";
import PostMain from "../../components/PostMain";
import CommonApi from "@/api/Common";

// ✅ Server Component：负责获取初始数据
const Home = async () => {
  const initialPosts = await CommonApi.getPostList({ page: 1, page_size: 10 });
  return (
    <div className="p-4 max-w-5xl mx-auto ">
      <ThemeSwitcher />
      <PostMain initialPosts={initialPosts.data.list} />
    </div>
  );
};

export default Home;
