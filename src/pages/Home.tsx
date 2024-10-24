//  [ Imports ]
// Supabase
import supabase from "@/supabase"

// Shadcn
import { Button } from "@/components/ui/button"
import { BASE_URL } from "@/config"

const HomePage = () => {
    const googleSignIn = () => {
        supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${BASE_URL}/dashboard`,
            },
        })
    }

    return (
        <main className="flex h-screen w-screen justify-center bg-background px-[10%]">
            {/* <p>Current User : {session?.user.email || "None"}</p> */}
            <div className="mt-10 flex h-44 w-96 flex-col items-center justify-center gap-2 rounded-md border border-accent bg-background-light text-center sm:gap-4">
                <h1 className="text-2xl font-semibold text-accent sm:text-3xl">
                    Hour Tracker
                </h1>

                <p className="text-lg font-light text-white sm:text-xl">
                    Login to get started.
                </p>

                <Button
                    size="sm"
                    className="text-md bg-accent-darker hover:bg-[#2e74b6] md:px-11"
                    onClick={googleSignIn}
                >
                    Sign In With Google
                </Button>
            </div>
        </main>
    )
}

export default HomePage
