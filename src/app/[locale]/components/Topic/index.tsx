import React from "react";

// 模拟异步获取数据的函数，返回 Promise
const fetchTopics = () => {
  return new Promise<{ id: number; title: string }[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Introduction to JavaScript" },
        { id: 2, title: "Advanced React" },
        { id: 3, title: "Web Development Trends" },
        { id: 4, title: "Node.js and Express" },
        { id: 5, title: "CSS Grid and Flexbox" },
      ]);
    }, 3000);
  });
};

const TopicList = async () => {
  // 通过 Promise 获取数据
  const topics = await fetchTopics();

  return (
    <div className="w-full rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold p-2 pb-0">Topic</h2>
      <ul className="list-none px-2">
        {topics.map((topic) => (
          <li
            key={topic.id}
            className="p-2 rounded-lg shadow-sm cursor-pointer hover:text-blue-600"
          >
            #<span className="text-md font-semibold">{topic.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicList;
