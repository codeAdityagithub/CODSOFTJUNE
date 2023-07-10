import React, { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import ModeToggle from "@/components/modeToggle/ModeToggle";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NavVertical = ({ listitems, open, setOpen }) => {
    const session = useSession();
    const router = useRouter();

    return (
        <div
            onClick={() =>
                setOpen((prev) => {
                    return prev ? false : true;
                })
            }
            className={`${styles.navVertical} ${
                open ? styles.open : styles.closed
            }`}
        >
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
    );
};

export default NavVertical;
