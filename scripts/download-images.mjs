// Downloads the real photos and logos from the old asas.co.tz into public/images.
// Usage: node scripts/download-images.mjs   (skips files that already exist)
import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const BASE = 'https://asas.co.tz/image/webImag/';

/** [local path under public/images, remote file name under /image/webImag/ or absolute URL] */
export const IMAGE_MANIFEST = [
  ['brand/asas-logo-red.png', 'https://asas.co.tz/image/logoRed.png'],
  ['brand/asas-logo-white.png', 'https://asas.co.tz/image/logoWhite.png'],
  ['home/driver.jpg', '2-ASAS_transport-1768206926.jpg'],
  ['home/dairy-barn.jpg', '2-CALENDAR_2024-22-web-1770905054-0.jpg'],
  ['home/dairy-herd.jpg', '2-Dairy-1770905054-2.jpg'],
  ['companies/transfuel-logistics.jpg', '2-FRONT_1-1770811557-0.jpg'],
  ['companies/asas-transporters.jpg', '2-CENTER-1770812093-0.jpg'],
  ['companies/fleet-crew.jpg', '2-driver-asas-1-759x1024-1770812419-5.jpg'],
  ['about/team-dairy.jpg', '2-ASAS_Team-1770489911.jpg'],
  ['about/mechanics.jpg', '2-Training-1770815984-1.jpg'],
  ['about/farmer.jpg', '2-Photos-1770915089-0.jpg'],
  ['companies/asas-energies.jpg', '2-Pump3-1770920775-0.jpg'],
  ['companies/universal-clearing-forwarding.jpg', '2-Clearing-and-forwarding-1771184970-0.jpg'],
  ['companies/asas-dairy.jpg', '2-ASAS_milk-1767968225.jpg'],
  ['companies/asas-dairies-farm.jpg', '2-DRONE_FARM_-ASAS-4-1770904927-0.jpg'],
  ['companies/afri-farm.jpg', '2-AFRI-(A)-1770917494-0.jpg'],
  ['companies/asas-real-estate.jpg', '2-wwww-1771176273-0.jpg'],
  ['about/abri-transporters.jpg', '2-A.S._ABRI_TRANSPORTERS-1770483455.jpg'],
  ['products/mix-fruit-yogurt.jpg', '2-mix_fruit_-1768545339.jpg'],
  ['products/mango-yogurt.jpg', '2-mango_yogurt-1768545510.jpg'],
  ['products/passion-yogurt.jpg', '2-passion_yogurt-1768545645.jpg'],
  ['products/pineapple-yogurt.jpg', '2-Pineapple_yogurt-1768545752.jpg'],
  ['products/plain-yogurt.jpg', '2-Plane_yogurt-1768545793.jpg'],
  ['products/strawberry-yogurt.jpg', '2-strawberry_yogurt-1768545859.jpg'],
  ['products/vanilla-yogurt.jpg', '2-Vanilla_big_-1768549907.jpg'],
  ['products/fresh-milk.jpg', '2-ASAS_milk-1768546082.jpg'],
  ['products/full-cream-milk.jpg', '2-MILK-BOX-1771188956-0.jpg'],
  ['products/butter.jpg', '2-Butter-1768550041.jpg'],
  ['products/mtindi.jpg', '2-ASAS-MTINDI-1LTR-1771190185-0.jpg'],
  ['products/milk-powder.jpg', '2-Asas_Milk_Powder_400g-1771186965-0.jpg'],
  ['clients/puma-energy.jpg', '2-puma_energies_logo-1767673471.jpg'],
  ['clients/shell.png', '2-shell-1767673539.png'],
  ['clients/oryx-energies.png', '2-Oryx_Energies_logo-1767673629.png'],
  ['clients/total-tanzania.png', '2-Total_tanzania_logo-1767673742.png'],
  ['clients/dalbit-petroleum.png', '2-Dalbit-1767673836.png'],
  ['clients/wfp.png', '2-WFP_logo-1767673913.png'],
  ['clients/cargo-management-logistics.png', '2-cargo_managment-1767671431.png'],
  ['clients/bp.svg', '2-Bp_logo-1767673160.svg'],
  ['sustainability/hse.jpg', '2-Health_safety-first_culture-1767706992.jpg'],
  ['sustainability/community.jpg', '2-Hospital-1770752448-1.jpg'],
  ['news/africa-energy-summit-2025.png', '2-submit_2025-1765167139.png'],
  ['news/safety-champions.png', '2-Safety_Champions-1765167593.png'],
  ['news/tanga-lpg-terminal.png', '2-Energy_Expansion-1765168033.png'],
  ['news/igumbilo-fuel-station.png', '2-Fueling_Futures-1765168216.png'],
  ['news/luxury-landmark.png', '2-Luxury_Landmark-1765168784.png'],
  ['news/fueling-efficiency.png', '2-Fueling_Efficiency-1765169023.png'],
  ['news/dodoma-retail-expansion.jpg', '2-Pump-1770921339-0.jpg'],
  ['news/quality-commitment.png', '2-Quality_Commitment-1765191469.png'],
  ['news/legacy-innovators.png', '2-Legacy_Innovators-1765191598.png'],
  ['news/product-evolution.png', '2-Product_Evolution-1765191691.png'],
  ['news/brand-buzz.png', '2-Brand_Buzz-1765191811.png'],
  ['news/core-integrity.png', '2-Core_Integrity-1765191920.png'],
  ['news/energy-advocate.png', '2-Energy_Advocate-1765192061.png'],
  ['news/smart-harvest.png', '2-Smart_Harvest-1765171309.png'],
  ['news/eco-farming.png', '2-Eco_farming-1765171500.png'],
  ['news/premium-nutrition.png', '2-Premium_Nutrition-1765171672.png'],
  ['news/future-farms.png', '2-Future_Farms-1765176473.png'],
  ['news/dairy-empowerment.png', '2-Dairy_Empowerment-1765177399.png'],
  ['news/lasting-freshness.png', '2-Lasting_Freshness-1765177645.png'],
  ['news/milk-revolution.png', '2-Milk_Revolution-1765177822.png'],
  ['news/nourishing-futures.png', '2-Nourishing_Futures-1765178206.png'],
  ['news/milk-losses.png', '2-Milk_Losses-1765178426.png'],
  ['news/port-innovation.png', '2-Port_Innovation-1765180460.png'],
  ['news/live-logistics.png', '2-Live_Logistics-1765180613.png'],
  ['news/excellence-recognized.png', '2-Excelence_Recognized-1765182731.png'],
  ['news/premium-herds.png', '2-Premium_Herds-1765182898.png'],
  ['news/roadway-revolution.png', '2-Roadway_Revolution-1765183206.png'],
  ['news/regional-expansion.png', '2-Regional_Expansion-1765183334.png'],
  ['news/safer-logistics.png', '2-Safer_Logistics-1765183541.png'],
  ['news/fleet-future.png', '2-Fleet_Future-1765183717.png'],
];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const failures = [];
  for (const [localPath, remote] of IMAGE_MANIFEST) {
    const target = join('public', 'images', localPath);
    if (await exists(target)) continue;
    const url = remote.startsWith('http') ? remote : BASE + encodeURI(remote);
    const response = await fetch(url);
    if (!response.ok) {
      failures.push(`${response.status} ${url}`);
      continue;
    }
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, Buffer.from(await response.arrayBuffer()));
    console.log('saved', target);
  }
  if (failures.length) {
    console.error('Failed downloads:\n' + failures.join('\n'));
    process.exit(1);
  }
}

main();
