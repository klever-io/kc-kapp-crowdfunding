import React, { Component } from 'react'
import Appbar from '@/components/AppBar/AppBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Appbar />
      {children}
    </>
  )
}
