// Supabase
import supabase from "@/supabase"

// Shadcn
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"

// React Router
import { useNavigate } from "react-router-dom"

interface Props {
    userName: string
    pictureUrl?: string
}

const Navbar = ({ userName }: Props) => {
    const navigate = useNavigate()

    const handleSignOut = () => {
        supabase.auth.signOut()
        navigate("/")
    }

    return (
        <nav className="w-full">
            <Menubar className="border-b border-b-primary py-8 font-semibold">
                <MenubarMenu>
                    <MenubarTrigger className="ml-auto cursor-pointer text-xl text-white">
                        {userName}
                    </MenubarTrigger>
                    <MenubarContent className="text-white">
                        <MenubarItem>Profile</MenubarItem>
                        <MenubarItem onClick={handleSignOut}>
                            Sign Out
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </nav>

        // <nav className="flex justify-between border-b border-b-accent p-5 font-semibold text-white">
        //     <a>Home</a>
        //     <div>{userName}</div>
        // </nav>
    )
}
export default Navbar
