import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function ResetPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
        <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Enter your new password to reset your account password.</CardDescription>
        </CardHeader>
        <CardContent>
            <form className="space-y-4">
            <div className="space-y-1">
                <Label htmlFor="password">New Password</Label>
                <Input id="password" type="password" required />
            </div>
            <div className="space-y-1">
                <Label htmlFor="password">Re-Type Password</Label>
                <Input id="password" type="password" required />
            </div>
            <div>
                <Link to="/login">
                    <Button type="submit" className="w-full">
                        Reset Password
                    </Button>
                </Link>
            </div>
            </form>
        </CardContent>
        </Card>
    </div>
  )
}