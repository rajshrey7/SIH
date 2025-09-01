<<<<<<< HEAD
import { auth } from "@/auth"; // 1. Import the auth helper from your new auth.ts file
=======
import { auth } from "@/auth"; 
>>>>>>> d6a375d (Initial commit: Next.js + WebSocket + Auth setup)
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StudentDashboard from "@/components/StudentDashboard";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
<<<<<<< HEAD
import { Home, LogOut } from "lucide-react";
import SignOutButton from "@/components/SignOutButton"; // We'll create this small component

// 2. Make the component async to use await
export default async function DashboardPage() {
  // 3. Get the session directly on the server
  const session = await auth();

  // 4. If no session, redirect on the server. This is instant.
=======
import { Home } from "lucide-react";
import SignOutButton from "@/components/SignOutButton";

export default async function DashboardPage() {
  // Get the session on the server
  const session = await auth();

  // If no session, redirect
>>>>>>> d6a375d (Initial commit: Next.js + WebSocket + Auth setup)
  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div>
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
<<<<<<< HEAD
            <div className="flex items-center gap-4">
              {/* Note: We use an <a> tag for server-side navigation */}
=======
            {/* Left side */}
            <div className="flex items-center gap-4">
>>>>>>> d6a375d (Initial commit: Next.js + WebSocket + Auth setup)
              <a href="/">
                <Button variant="ghost" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </Button>
              </a>
<<<<<<< HEAD
              <h1 className="text-xl font-bold text-green-600">STEM Learning Platform</h1>
            </div>
=======
              <h1 className="text-xl font-bold text-green-600">
                STEM Learning Platform
              </h1>
            </div>

            {/* Right side */}
>>>>>>> d6a375d (Initial commit: Next.js + WebSocket + Auth setup)
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
<<<<<<< HEAD
                  <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                  <AvatarFallback className="bg-green-100 text-green-600 text-sm">
                    {session.user.name?.split(' ').map(n => n[0]).join('') || session.user.email?.[0] || 'U'}
=======
                  <AvatarImage
                    src={session.user.image || ""}
                    alt={session.user.name || ""}
                  />
                  <AvatarFallback className="bg-green-100 text-green-600 text-sm">
                    {session.user.name?.split(" ").map(n => n[0]).join("") ||
                      session.user.email?.[0] ||
                      "U"}
>>>>>>> d6a375d (Initial commit: Next.js + WebSocket + Auth setup)
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
<<<<<<< HEAD
      <StudentDashboard />
    </div>
  );
}
=======

      <StudentDashboard />
    </div>
  );
}
>>>>>>> d6a375d (Initial commit: Next.js + WebSocket + Auth setup)
