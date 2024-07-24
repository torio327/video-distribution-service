'use client'

import {Button} from "@nextui-org/button";
import Link from "next/link";

export default function Home() {

  return (
    <>
      <h1>Home</h1>
        <Button color={"primary"}>
            <Link href={"/login"}>Login</Link>
        </Button>
    </>
  );
}
