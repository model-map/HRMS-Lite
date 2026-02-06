import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Employees", href: "/employees" },
];

const Navbar = () => {
  return (
    <header className="border-b">
      <nav className="mx-auto flex h-14 max-w-6xl items-center px-6">
        <div className="flex items-center gap-6 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto">
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
