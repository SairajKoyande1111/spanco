import { Link } from "react-router-dom";
import type { NavSubGroup } from "@/data/navigation";

interface MegaMenuProps {
  groups: NavSubGroup[];
}

const MegaMenu = ({ groups }: MegaMenuProps) => {
  return (
    <div className="absolute top-full left-0 bg-popover border border-border rounded-lg shadow-card animate-slide-down z-50 min-w-[280px]">
      <div className="p-6 flex gap-10">
        {groups.map((group) => (
          <div key={group.title}>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3 pb-2 border-b border-border">
              {group.title}
            </h4>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item.title}>
                  <Link
                    to={item.href}
                    className="text-sm font-body text-muted-foreground hover:text-primary transition-colors block py-0.5"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
