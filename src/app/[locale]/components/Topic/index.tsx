import React from "react";

const TopicList = () => {
  const topics = [
    {
      id: 1,
      title: "Introduction to JavaScript",
      description: "Learn the basics of JavaScript programming.",
    },
    {
      id: 2,
      title: "Advanced React",
      description: "Dive deeper into React concepts like Hooks and Context.",
    },
    {
      id: 3,
      title: "Web Development Trends",
      description: "Explore the latest trends in web development.",
    },
    {
      id: 4,
      title: "Node.js and Express",
      description: "Understand server-side JavaScript and backend development.",
    },
    {
      id: 5,
      title: "CSS Grid and Flexbox",
      description: "Master responsive layouts with modern CSS.",
    },
  ];

  return (
    <div className="w-full  rounded-lg shadow-md mt-4 ">
      <h2 className="text-xl font-bold p-2 pb-0">topic </h2>
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
