"use client";
import { useSession, SessionProvider } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function ClientMember() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/sigin?callbackUrl=/ClientMember");
    },
  });
  return (
    <SessionProvider session={session}>
      <div>
        <h1>Member Client Session</h1>
        <p>{session?.user?.email}</p>
        <p>{session?.user?.name}</p>
        {/* If there is no user replace it with static profile photo */}
        {/* <Image src={session?.user?.image!} alt="photo" /> */}
      </div>
    </SessionProvider>
  );
}
