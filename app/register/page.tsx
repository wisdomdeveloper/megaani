import { RegisterForm } from "@/components/auth/register-form"
import { MainNav } from "@/components/common/main-nav"
import { Footer } from "@/components/common/footer"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-muted-foreground">Enter your information to get started</p>
          </div>
          <RegisterForm />
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
