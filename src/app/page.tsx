// to prevent crash due to pre-rendering pages during build
export const dynamic = "force-dynamic";

import HomeClient from "./HomeClient";

export default function HomePage() {
  return <HomeClient />;
}
