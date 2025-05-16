import { useState } from "react";
import { Timeline } from "./components/timeline";
import { Calendar } from "./components/calendar";
import { Navbar } from "./components/navbar";

export default function App() {
  const [tab, setTab] = useState("timeline");
  return (
    <main className="w-full min-h-screen flex flex-col relative">
      <Navbar tabs={["calendar", "timeline"]} {...{ tab, setTab }} />
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
