//  [ Imports ]
// Supabase
import supabase from "@/supabase"

// Shadcn
import { Button } from "@/components/ui/button"

const HomePage = () => {
    const googleSignIn = () => {
        supabase.auth.signInWithOAuth({
            provider: "google",
        })
    }

    return (
        <main className="flex h-screen w-screen justify-center bg-background px-[10%] md:px-[25%] lg:px-[35%]">
            <div className="bg-background-lighttext-center mt-10 flex h-44 w-full flex-col items-center justify-center gap-2 rounded-md border border-accent text-center sm:gap-4">
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
