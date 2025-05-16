import { useState } from "react";
import { Timeline } from "./components/timeline";
import { Calendar } from "./components/calendar";
import { Navbar } from "./components/navbar";

export default function App() {
  const [tab, setTab] = useState("Timeline");
  return (
    <main className="w-full min-h-screen flex flex-col relative">
      <Navbar tabs={["Calendar", "Timeline"]} {...{ tab, setTab }} />
      <section className="p-4">
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
