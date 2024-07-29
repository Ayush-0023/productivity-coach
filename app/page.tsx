import { Chatbot } from "@/components/component/chatbot";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen w-full bg-gradient-to-r from-blue-200 to-purple-300 animate-fadeIn">
      <Chatbot />
    </main>
  );
}
