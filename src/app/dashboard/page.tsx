import { auth } from "@/auth"; // 1. Import the auth helper from your new auth.ts file
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StudentDashboard from "@/components/StudentDashboard";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Home, LogOut } from "lucide-react";
import SignOutButton from "@/components/SignOutButton"; // We'll create this small component

// 2. Make the component async to use await
export default async function DashboardPage() {
  // 3. Get the session directly on the server
  const session = await auth();

  // 4. If no session, redirect on the server. This is instant.
  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div>
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Note: We use an <a> tag for server-side navigation */}
              <a href="/">
                <Button variant="ghost" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </a>
              <h1 className="text-xl font-bold text-green-600">STEM Learning Platform</h1>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                  <AvatarFallback className="bg-green-100 text-green-600 text-sm">
                    {session.user.name?.split(' ').map(n => n[0]).join('') || session.user.email?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden sm:block">
                  {session.user.name || session.user.email}
                </span>
              </div>
              <SignOutButton />
            </div>
          </div>
        </div>
      </nav>
      <StudentDashboard />
    </div>
  );
}