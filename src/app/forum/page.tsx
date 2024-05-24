import Chat from "@/components/Chat"
import Sidebar from "@/components/Sidebar";

export default function forum() {
  return (
    <>
      <Sidebar />
      <div className="containerForum">
      <main className="mainForum">
        <h1 className="titleForum" id="title">Discute avec tout le monde !</h1>
        <Chat />
      </main>
    </div>
    </>
  )
}