import User from "@/models/User";
import connect from "@/utils/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            // credentials: {
            //     username: {
            //         label: "Email",
            //         type: "email",
            //         placeholder: "abc@email.com",
            //     },
            //     password: { label: "Password", type: "password" },
            // },
            async authorize(credentials) {
                //checking if user exists
                await connect();

                try {
                    const user = await User.findOne({
                        email: credentials.email,
                    });

                    if (user) {
                        //checking password is correct

                        const isPwdCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );
                        if (isPwdCorrect) {
                            return user;
                        } else {
                            throw new Error("Wrong Credentials!");
                        }
                    } else {
                        throw new Error("User Not Found!");
                    }
                } catch (err) {
                    throw new Error(err);
                }
            },
        }),
    ],
    pages: {
        error: "/userauth/login",
        signIn: "/userauth/login",
        
    },
});

export { handler as GET, handler as POST };
