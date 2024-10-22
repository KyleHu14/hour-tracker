interface Props {
    userName: string
    pictureUrl?: string
}

const Navbar = ({ userName }: Props) => {
    return (
        <nav className="flex justify-between border-b border-b-accent p-5 font-semibold text-white">
            <a>Home</a>
            <div>{userName}</div>
        </nav>
    )
}
export default Navbar
