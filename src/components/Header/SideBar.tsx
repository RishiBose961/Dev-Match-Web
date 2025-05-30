import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    ChevronDown,
    CreditCard,
    FileText,
    LogOut,
    Menu,
    User,
    Users,
    X,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleDropdown = (name: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const menuItems = [
    { name: "General", href: "#", icon: null, active: true },
    {
      name: "Teams",
      icon: Users,
      dropdown: true,
      items: [
        { name: "Banned Users", href: "#" },
        { name: "Calendar", href: "#" },
      ],
    },
    { name: "Billing", href: "#", icon: CreditCard },
    { name: "Invoices", href: "#", icon: FileText },
    {
      name: "Account",
      icon: User,
      dropdown: true,
      items: [
        { name: "Details", href: "#" },
        { name: "Security", href: "#" },
        { name: "Logout", href: "#", icon: LogOut },
      ],
    },
  ];

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 transform bg-white dark:bg-zinc-900 border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col justify-between">
          {/* Header */}
          <div className="px-4 py-6">
         

            {/* Navigation Menu */}
            <nav className="mt-10">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    {item.dropdown ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                        >
                          <div className="flex items-center gap-3">
                            {item.icon && <item.icon className="h-4 w-4" />}
                            <span>{item.name}</span>
                          </div>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              openDropdowns.includes(item.name) && "rotate-180"
                            )}
                          />
                        </button>

                        {/* Dropdown Items */}
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-200",
                            openDropdowns.includes(item.name)
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          )}
                        >
                          <ul className="mt-2 space-y-1 px-4">
                            {item.items?.map((subItem) => (
                              <li key={subItem.name}>
                                <a
                                  href={subItem.href}
                                  className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                                >
                                  {subItem.icon && (
                                    <subItem.icon className="h-4 w-4" />
                                  )}
                                  <span>{subItem.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                          item.active
                            ? "bg-gray-100 text-gray-700"
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        )}
                      >
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.name}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

        </div>
      </div>
    </>
  );
}
