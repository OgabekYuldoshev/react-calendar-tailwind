import { useState } from "react";
import { Timeline } from "./components/timeline";
import { Calendar } from "./components/calendar";
import { Navbar } from "./components/navbar";

export default function App() {
  const [tab, setTab] = useState("Calendar");
  return (
    <main className="w-full min-h-screen flex flex-col relative">
      <Navbar tabs={["Calendar", "Timeline"]} {...{ tab, setTab }} />
      <section className="p-4 flex-1 flex flex-col">
        {
          {
            Timeline: <Timeline />,
            Calendar: <Calendar />,
          }[tab]
        }
      </section>
    </main>
  );
}
