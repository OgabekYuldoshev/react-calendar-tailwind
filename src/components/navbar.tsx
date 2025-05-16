import { ModeToggle } from "./mode-toggle";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface NavbarProps {
  tabs: string[];
  tab: string;
  setTab: (tab: string) => void;
}
export function Navbar({ tabs, tab, setTab }: NavbarProps) {
  return (
    <nav className="h-12 border-b w-full flex items-center justify-between px-4 sticky top-0 left-0 bg-white/40 dark:bg-black/40 backdrop-blur z-50">
      <h1 className="font-bold">react-calendar-tailwind</h1>
      <div className="flex gap-2">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <ModeToggle />
      </div>
    </nav>
  );
}
