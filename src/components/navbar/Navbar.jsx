"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./page.module.css";
import ModeToggle from "@/components/modeToggle/ModeToggle";
import { signOut } from "next-auth/react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NavVertical from "./NavVertical";

const listitems = [
    {
        id: 1,
        title: "Home",
        href: "/",
    },

    {
        id: 3,
        title: "Posts",
        href: "/posts",
    },
    {
        id: 4,
        title: "DashBoard",
        href: "/dashboard",
    },
];

const Navbar = () => {
    const session = useSession();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    return (
        <nav className={styles.navcontainer}>
            <div className={styles.logo}>
                <Link href={"/"}>BLOGiT</Link>
            </div>
            <div className={styles.navlist}>
                <ModeToggle />
                {listitems.map((item) => (
                    <Link key={item.id} href={item.href}>
                        {item.title}
                    </Link>
                ))}
                {session?.status === "authenticated" && (
                    <>
                        <Link href={"/dashboard/profile"}>Profile</Link>
                        <button className={styles.button} onClick={signOut}>
                            Logout
                        </button>
                    </>
                )}
            </div>
            <NavVertical listitems={listitems} open={open} setOpen={setOpen} />
            <button
                className={styles.toggle}
                onClick={() =>
                    setOpen((prev) => {
                        return prev ? false : true;
                    })
                }
            >
                <Image
                    src="/menu-outline.svg"
                    width={40}
                    height={40}
                    alt="notfound"
                />
            </button>
        </nav>
    );
};

export default Navbar;
