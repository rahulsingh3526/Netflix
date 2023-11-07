import { signOut, getSession } from "next-auth/react";
import { NextPageContext } from "next";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  return (
    <>
      <h1 className="text-7xl text-green-500 ">NetFlix Clone</h1>;
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        LogOut!
      </button>
    </>
  );
}
