import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import { SOLUTIONS_QUERY } from "@/lib/sanity/queries";
import type { SolutionsPage } from "@/types/sanity";
import styles from "./solutions.module.css";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Pressio Spine™ solutions for surgeons, ASCs, and distribution partners.",
};

const AUDIENCES = [
  { 
    id: "surgeons", 
    key: "forSurgeons" as const, 
    label: "For Surgeons",  
    description: "Harness shape-memory Nitinol for continuous, dynamic compression at the fusion site.",
    img: "https://res.cloudinary.com/dumskfbgj/image/upload/v1779123564/Surgeons_filajl.png" 
  },
  { 
    id: "ascs",     
    key: "forASCs"     as const, 
    label: "For ASCs",      
    description: "Transform outpatient spine surgery with zero tray burden and rep-independent workflows.",
    img: "https://res.cloudinary.com/dumskfbgj/image/upload/v1779123557/ASCs_rxkaip.png" 
  },
  { 
    id: "partners", 
    key: "forPartners" as const, 
    label: "For Partners",  
    description: "Partner to lead the commercial shift toward the outpatient era of spinal fixation.",
    img: "https://res.cloudinary.com/dumskfbgj/image/upload/v1779123563/Partners_xyle3m.png" 
  },
];

export default async function SolutionsPage() {
  const data = await sanityFetch<SolutionsPage>(SOLUTIONS_QUERY).catch(() => null);

  return (
    <div className={styles.container}>
      {AUDIENCES.map(({ id, key, label, img, description }) => {
        const section = data?.[key];
        return (
          <div key={id} className={styles.column}>
            <div className={styles.bg} style={{ backgroundImage: `url(${img})` }} />
            <div className={styles.overlay} />
            
            <div className={styles.content}>
              <h2 className={styles.title}>{label}</h2>
              <p className={styles.text}>
                {section?.body ?? description}
              </p>
              
              <div className={styles.actions}>
                <Link href={`/solutions/${id}`} className={styles.btnPrimary}>
                  More Details
                </Link>
                <Link href="/contact" className={styles.btnSecondary}>
                  Contact
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
