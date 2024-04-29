import Sidebar from "@/components/Sidebar";
import UserCard from "@/components/UserCard";

export default function homeUser(){
    return (
        <>
            <div className="flex">
                <Sidebar />
                <UserCard />
            </div>
        </>
    )
}