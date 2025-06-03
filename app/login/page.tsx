import { LoginForm } from "@/components/auth/login-form"
import { MainNav } from "@/components/common/main-nav"
import { Footer } from "@/components/common/footer"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>
          <LoginForm />
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-primary underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
