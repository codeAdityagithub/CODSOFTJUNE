"use client";
import React from "react";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";

const HeroImage = () => {
    const { mode } = useContext(ThemeContext);

    return mode === "dark" ? (
        <Image src={"/Hero.png"} alt="not found" fill={true} />
    ) : (
        <Image src={"/Hero2.jpg"} alt="not found" fill={true} />
    );
};

export default HeroImage;
