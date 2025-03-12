import CommonApi from "@/api/Common";
import SidebarMenu from "./SidebarMenu";

const Sidebar = async () => {
  const categorys = await CommonApi.GetCategorys().then((res) => {
    return res.data.map((item) => ({
      path: "/categorys/" + item.id,
      label: item.name,
    }));
  });

  const routes = [
    { label: "home", path: "/" },
    { label: "create", path: "/createPost" },
    { label: "categorys", path: "/categorys", subMenu: categorys },
    { label: "tools", path: "/tools" },
    { label: "miim", path: "/miim" },
  ];

  return <SidebarMenu routes={routes} />;
};

export default Sidebar;
