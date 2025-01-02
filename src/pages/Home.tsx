//  [ Imports ]
// Supabase
import supabase from "@/supabase/client"

// Shadcn
import { Button } from "@/components/ui/button"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { BASE_URL } from "@/config"

const HomePage = () => {
    // O Auth Signin function
    const googleSignIn = () => {
        supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                queryParams: {
                    prompt: "select_account",
                },
                redirectTo: `${BASE_URL}/dashboard`,
            },
        })
    }

    return (
        <main className="flex h-screen w-full items-center justify-center bg-background px-[10%]">
            <Card className="w-[380px] text-center">
                <CardHeader>
                    <CardTitle>Hour Tracker</CardTitle>
                    <CardDescription className="text-lg">
                        Login to get started.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        size="sm"
                        className="text-md w-full hover:brightness-90 md:px-11"
                        onClick={googleSignIn}
                    >
                        Sign In With Google
                    </Button>
                </CardContent>
            </Card>
        </main>
    )
}

export default HomePage
