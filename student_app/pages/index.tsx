import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>JS Advanced | Student Management</title>
        <meta name="description" content="Student App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p style={{ fontSize: 25 }}>
            Javascript advanced - Management of students with&nbsp;
            <code className={styles.code}>NextJS & MongoDB</code>
          </p>
          <div>
              
          </div>
        </div>

        <div className={styles.center}>
          <div className={styles.thirteen}>
            <Image
              src="/banner.webp"
              alt="Student icon"
              width={320}
              height={320}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="/students"
            className={styles.card}
          >
            <h2 className={inter.className}>
            &gt;&gt; Students &lt;&lt;
            </h2>
            <p className={inter.className}>
              There'll be shown all details about each student.
            </p>
          </a>

          <a
            href="/creation"
            className={styles.card}
          >
            <h2 className={inter.className}>
            &gt;&gt; Add Student &lt;&lt;
            </h2>
            <p className={inter.className}>
              There you create a new student
            </p>
          </a>

          <span
            className={styles.card}
          >
            <h2 className={inter.className}>
              Description
            </h2>
            <p className={inter.className}>
              Simple application of Management of Students. The application works fine. We used MongoDB, NextJs to our project.
            </p>
          </span>
        </div>
      </main>
    </>
  )
}
