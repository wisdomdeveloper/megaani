"use client"
import type { Metadata } from "next"
import { InstructorBooksList } from "@/components/instructor/instructor-books-list"
import { MainNav }  from "@/components/common/main-nav"
import { Footer } from "@/components/common/footer"
import { useRouter } from "next/navigation"



export default function InstructorBooksPage() {
  const router = useRouter();
  return (
  <div>
    <MainNav/>
     <button 
        className="px-3 py-1 m-[1rem] rounded-xl bg-purple-600 hover:bg-purple-700"
        onClick={()=> router.back()}>Go Back </button>
    <div className="flex items-center px-3 flex-col !w-[100%]   ">
      <div className="  py-2">
       
      <InstructorBooksList />
    </div>
    </div>
    <Footer/>
  </div>
  )
}
