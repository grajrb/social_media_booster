import React from 'react';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Task Manager</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      
      <nav className="navbar">
        <Link href="/">
          <h1 style={{ cursor: 'pointer' }}>📋 Task Manager</h1>
        </Link>
        <div>
          <Link href="/tasks">All Tasks</Link>
          <Link href="/tasks/new">New Task</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </nav>
      
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
