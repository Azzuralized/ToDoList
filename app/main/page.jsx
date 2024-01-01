import React from 'react'
import Hero from '../../components/hero/Hero'
import MainPage from '../../components/mainPage/MainPage'
import ToDo from '@/components/toDo/ToDo'

const page = () => {
  return (
    <>
      <Hero />
      <MainPage />
      <ToDo />
    </>

  )
}

export default page