import Tabs from "@/components/Tabs";

const MyPage = () => {
  const tabs = [
    { key: "tab1", label: "Tab 1", content: <p>Content for Tab 1</p> },
    { key: "tab2", label: "Tab 2", content: <p>Content for Tab 2</p> },
    { key: "tab3", label: "Tab 3", content: <p>Content for Tab 3</p> },
    { key: "tab4", label: "Tab 1", content: <p>Content for Tab 1</p> },
    { key: "tab5", label: "Tab 2", content: <p>Content for Tab 2</p> },
    { key: "tab6", label: "Tab 3", content: <p>Content for Tab 3</p> },
    { key: "tab7", label: "Tab 1", content: <p>Content for Tab 1</p> },
    { key: "tab8", label: "Tab 2", content: <p>Content for Tab 2</p> },
    { key: "tab9", label: "Tab 3", content: <p>Content for Tab 3</p> },
    { key: "tab10", label: "Tab 1", content: <p>Content for Tab 1</p> },
    { key: "tab21", label: "Tab 2", content: <p>Content for Tab 2</p> },
    { key: "tab31", label: "Tab 3", content: <p>Content for Tab 3</p> },
    { key: "tab13", label: "Tab 1", content: <p>Content for Tab 1</p> },
    { key: "tab14", label: "Tab 2", content: <p>Content for Tab 2</p> },
    { key: "tab15", label: "Tab 3", content: <p>Content for Tab 3</p> },
    { key: "tab16", label: "Tab 1", content: <p>Content for Tab 1</p> },
    { key: "tab27", label: "Tab 2", content: <p>Content for Tab 2</p> },
    { key: "tab38", label: "Tab 3", content: <p>Content for Tab 3</p> },
  ];

  return (
    <div className="p-6">
      <Tabs tabs={tabs} defaultActive="tab1" />
      <Tabs
        tabs={tabs}
        defaultActive="tab1"
        layout="vertical"
        className="mt-10"
      />
    </div>
  );
};

export default MyPage;
