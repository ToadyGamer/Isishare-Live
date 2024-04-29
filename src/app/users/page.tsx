import Sidebar from "@/components/Sidebar"
import Users from "@/components/Users"

export default function Home() {
    return (
        <>
        <div className="flex">
            <Sidebar />
            <Users />
        </div>
        </>
    )
}