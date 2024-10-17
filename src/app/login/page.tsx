"use client";

import SignIn from "../components/SignIn";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleSignInFlow = (provider: string) => {
    console.log("provider", provider);
    signIn(provider, { callbackUrl: "/" });
  }


  return (
    <div className="bg-cover bg-[url('../../public/images/sf.png')] h-screen flex items-center justify-center">
      <SignIn 
        signIn={handleSignInFlow}
      />
    </div>
  );
}