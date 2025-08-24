import NavBar from "@/components/NavBar";
import { createClient } from "@/prismicio";

// Get the navbar links
export default async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <header className="sticky top-0 z-50 w-full">
      <NavBar settings={settings} />
    </header>
  );
}
