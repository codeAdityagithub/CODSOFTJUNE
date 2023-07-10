import Link from "next/link";
import styles from "./page.module.css";
import HeroImage from "@/components/heroImage/HeroImage";

export const metadata = {
    title: "BLOGiT",
    description:
        "Immerse yourself in a world of inspiration, where passionatewriters share their expertise, personal experiences, and unique perspectives.",
};

export default function Home() {
    return (
        <main className={styles.container}>
            <div className={styles.heroSection}>
                <h1 className={styles.heroTitle}>BLOGiT</h1>
                {/* <p className={styles.heroText}>Discover. Engage. Inspire.</p> */}
                <p className={styles.heroText}>
                    Immerse yourself in a world of inspiration, where passionate
                    writers share their expertise, personal experiences, and
                    unique perspectives. Discover engaging content that sparks
                    curiosity, ignites conversations, and leaves you with a
                    renewed sense of wonder.
                </p>
                <Link href={"/posts"} className={styles.button}>
                    See More
                </Link>
            </div>

            <div className={styles.heroImage}>
                <HeroImage />
            </div>
        </main>
    );
}
