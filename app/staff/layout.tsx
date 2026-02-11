import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";


export default async function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || (user.role !== "STAFF" && user.role !== "ADMIN")) {
    redirect("/login");
  }

  // Reuse AdminSidebar but it should ideally adapt to role. 
  // For now, we'll use a specific Staff Sidebar or just the restricted admin one.
  // Let's create a minimal layout for staff.
  
  return (
    <div className="flex min-h-screen bg-black">
      {/* We can reuse AdminSidebar if we update it to handle Staff role, 
          or create a separate one. For velocity, let's assume AdminSidebar 
          checks roles or we just render the content with a simple back link 
          if we don't want to over-engineer the sidebar right now. 
          Actually, let's use the AdminSidebar but we might need to patch it 
          to hide non-staff links.
      */}
      <div className="flex-1 lg:pl-64">
        {children}
      </div>
      {/* Temporary: Staff Sidebar replacement or re-use */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 -translate-x-full border-r border-white/10 bg-black transition-transform lg:translate-x-0 hidden lg:block">
         <div className="flex h-16 items-center border-b border-white/10 px-6">
            <span className="text-xl font-bold font-heading text-white">LumenStaff</span>
         </div>
         <nav className="space-y-1 p-4">
            <a href="/staff" className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-white transition-colors">
                Overview
            </a>
            <a href="/staff/orders" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-400 hover:bg-white/5 hover:text-white transition-colors">
                Orders
            </a>
            <a href="/staff/tickets" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-400 hover:bg-white/5 hover:text-white transition-colors">
                Tickets
            </a>
             <a href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-400 hover:bg-white/5 hover:text-white transition-colors mt-auto">
                Back to Site
            </a>
         </nav>
      </div>
    </div>
  );
}
