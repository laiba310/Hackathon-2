
import BrowseByStyle from "@/components/dressStyle";
import Hero from "@/components/hero copy";
import Logos from "@/components/logos";

import NewArrivalsServer from "@/components/page";
import NewSaleServer from "@/components/pge";
import Rewies from "@/components/rewies";


export const dynamic ="force-static"
export const revalidate =60;

export default async function Home() {
return(
  <div>
<Hero />
<Logos />
<div>
< NewArrivalsServer /></div>
<NewSaleServer />
<BrowseByStyle/>
<Rewies />
 </div>

);}