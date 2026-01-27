import Link from "next/link";
import { LogoutButton } from "@/components";

const linkStyle =
  "block px-4 py-2 rounded text-gray-300 hover:bg-blue-400 hover:text-white transition";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {/* Header */}
      <header className="bg-gray-900 text-white px-8 py-4 flex items-center justify-between shadow-lg">
        <div className="text-2xl font-bold">Request Services</div>
        <LogoutButton />
      </header>

      {/* Main Content with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 p-6 shadow-lg font-bold">

          <nav className="space-y-2">
            <Link href="/dashboard" className={linkStyle}>
              Dashboard
            </Link>
            <Link href="/dashboard/create-request" className={linkStyle}>
              Create Request
            </Link>
            <Link href="/dashboard/requests" className={linkStyle}>
              Requests
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
