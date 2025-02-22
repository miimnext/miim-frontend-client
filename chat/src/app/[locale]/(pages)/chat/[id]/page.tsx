import ChatMain from "../components/ChatMain";

export default function main({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div className="my-3">
      <ChatMain conversation_id={id}></ChatMain>
    </div>
  );
}
