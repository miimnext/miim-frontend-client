"use client";

import { NextPage } from "next";
import VirtualScroller from "@/components/VirtualScroller";
import Image from "next/image";

interface Data {
  title: string;
  description: string;
}

const mockData: Data[] = Array.from({ length: 1000000 }, (_, index) => ({
  title: `Item ${index + 1}`,
  description: `This is the description for item ${index + 1}`,
}));

const renderItem = (item: Data, index: number) => (
  <div
    style={{
      display: "flex",
      padding: "10px",
      borderBottom: "1px solid #ddd",
    }}
  >
    <Image src="/images/post1.png" alt={item.title} width={50} height={50} />
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  </div>
);

const Home: NextPage = () => {
  return (
    <div>
      <h1>Virtual Scroller</h1>
      <VirtualScroller<Data>
        data={mockData}
        itemHeight={80} // 每项的高度
        renderItem={renderItem} // 渲染每项的内容
      />
    </div>
  );
};

export default Home;
