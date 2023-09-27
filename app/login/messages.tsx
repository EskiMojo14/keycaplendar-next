"use client";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import styles from "./messages.module.scss";

export default function Messages() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  return (
    <>
      {error && <p className={clsx(styles.message, styles.error)}>{error}</p>}
      {message && <p className={styles.message}>{message}</p>}
    </>
  );
}
