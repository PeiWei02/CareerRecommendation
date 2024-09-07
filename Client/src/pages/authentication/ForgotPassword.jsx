import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"

export const ForgotPassword = () => {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="mx-auto w-full max-w-md space-y-4 rounded-lg p-6 shadow-lg">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your email address and we wil ll send you a link to reset your password.
            </p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter your email" required />
            </div>
            <div>
            <Link to='/reset_email'>
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            </Link>
            </div>

          </form>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Remember your password?{" "}
            <Link to="/login" className="font-medium underline" prefetch={false}>
              Login
            </Link>
          </div>
        </Card>
      </div>
  )
}