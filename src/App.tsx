import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Timeline } from "./components/timeline";
import { Calendar } from "./components/calendar";

const tabs = ["calendar", "timeline"];

export default function App() {
  const [tab, setTab] = useState("timeline");
  return (
    <main className="w-full min-h-screen flex flex-col relative">
      <nav className="h-12 border-b w-full flex items-center justify-between px-4 sticky top-0 left-0 bg-white/50 backdrop-blur z-50">
        <h1 className="font-bold">react-calendar-tailwind</h1>
        <div>
          <Tabs value={tab} onValueChange={(tab) => setTab(tab)}>
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger key={tab} value={tab}>
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </nav>
      <section className="p-4">
        {
          {
            timeline: <Timeline />,
            calendar: <Calendar />,
          }[tab]
        }
      </section>
    </main>
  );
}
