import {
  UserCircle2,
  LayoutDashboard,
  Users,
  FolderKanban,
  Bell,
  ClipboardList,
  Settings,
} from "lucide-react";
import Link from "next/link";

const sidebarItems = [
  {
    name: "Profile",
    path: "profile",
    icon: <UserCircle2 size={20} />,
  },
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Clients",
    path: "clients",
    icon: <Users size={20} />,
  },
  {
    name: "Projects",
    path: "projects",
    icon: <FolderKanban size={20} />,
  },
  {
    name: "Reminders",
    path: "reminders",
    icon: <Bell size={20} />,
  },
  {
    name: "Logs",
    path: "logs",
    icon: <ClipboardList size={20} />,
  },
  {
    name: "Settings",
    path: "settings",
    icon: <Settings size={20} />,
  },
];

const DashboardSidebar = () => {
  return (
    <aside className="w-full border-b border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex h-20 items-center px-6">
        <h2 className="text-xl font-bold tracking-tight">Mini CRM</h2>
      </div>

      <nav className="space-y-2 px-4 pb-6">
        {sidebarItems.map((item) => (
          <Link href={item.path} key={item.path}>
            <button className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800">
              <div className="flex items-center gap-3">
                {item.icon}
                {item.name}
              </div>
            </button>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
