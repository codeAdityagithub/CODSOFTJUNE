"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Link from "next/link";
const Register = () => {
    const [err, setErr] = useState("");
    const router = useRouter();
    const session = useSession();

    if (session.status === "loading") {
        return <p>Loading...</p>;
    }
    if (session.status === "authenticated") {
        router?.push("/dashboard");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            res.status === 200 && setErr("User Already Exists!");
            res.status === 201 &&
                router.push("/dashboard/login?success=Account Created");
        } catch (error) {
            setErr("Something is Wrong");
        }
    };
    if (session.status === "unauthenticated") {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Create an Account</h1>
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        placeholder="Username"
                        required
                        className={styles.input}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className={styles.input}
                    />
                    <button className={styles.button}>Register</button>
                </form>
                {err}
                <span className={styles.or}>- OR -</span>
                <Link className={styles.link} href="/userauth/login">
                    Login with an existing account
                </Link>
            </div>
        );
    }
};

export default Register;
