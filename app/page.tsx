import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { auth, signIn } from "@/auth";

export default function Home() {
  return (
    <div className="h-screen w-screen p-4">
      <h1 className="text-xl font-semibold">NetBooks</h1>
      <p className="text-white">Please sign in to continue</p>
      <SignIn />
      {/* <Button className="bg-purple-500 hover:bg-purple-700">Sign in</Button> */}
      {/* <div className="h-screen w-screen flex justify-center items-center"> */}
      {/* <div className="h-screen flex items-center justify-center flex-col gap-3">
          <p>Loading...</p>
        </div> */}
    </div>
  );
}

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";

        // Skip sign-in screen if the user is already signed in
        if ((await auth()) !== null) {
          redirect("/loggedin");
        }

        await signIn(undefined, { redirectTo: "/loggedin" });
      }}
    >
      <Button color="primary" type="submit">
        Sign in
      </Button>
    </form>
  );
}
