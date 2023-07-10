import React from "react";

import styles from "./about.module.css";

const About = () => {
    return (
        <div className={styles.aboutContainer} id="About">
            <h2>About</h2>
            <div className={styles.aboutContent}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis
                voluptate accusamus ipsam exercitationem, distinctio maxime
                dolor, soluta architecto et esse commodi? Inventore vel
                similique perferendis illum assumenda fuga autem quae facilis
                laudantium sed? Nesciunt aut expedita fugiat fuga impedit minima
                fugit, commodi totam sapiente, ea cum iure voluptatem at esse.
            </div>
        </div>
    );
};

export default About;
