
// build-indonesia-provinces-regencies.mjs
// Node 18+ (punya fetch native). Output: indonesia_provinces_regencies.json

import { writeFile } from "node:fs/promises";

const BASE = "https://wilayah.id/api";

function inferType(name) {
  const n = name.toUpperCase();
  if (n.startsWith("KAB.")) return "Kabupaten";
  if (n.startsWith("KOTA")) return "Kota";
  return name.includes("Administrasi") ? "Kota" : "Kabupaten";
}

async function getJSON(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }});
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} - ${url}`);
  return res.json();
}

async function main() {
  const provJson = await getJSON(`${BASE}/provinces.json`);
  const provinces = provJson.data;
  const updatedAt = provJson.meta?.updated_at;

  const out = {
    meta: {
      administrative_area_level: [1, 2],
      updated_at: updatedAt ?? "",
      source: "Kepmendagri via wilayah.id",
    },
    provinces: []
  };

  for (let i = 0; i < provinces.length; i++) {
    const p = provinces[i];
    const regs = await getJSON(`${BASE}/regencies/${p.code}.json`);
    out.provinces.push({
      code: p.code,
      name: p.name,
      regencies: regs.data.map(r => ({
        code: r.code,
        name: r.name,
        type: inferType(r.name)
      }))
    });
    // kecilkan beban
    await new Promise(r => setTimeout(r, 150));
    console.log(`[${String(i+1).padStart(2,"0")}/${provinces.length}] ${p.name} - ${regs.data.length} kab/kota`);
  }

  await writeFile("indonesia_provinces_regencies.json", JSON.stringify(out, null, 2), "utf8");
  console.log("\n✅ Selesai: indonesia_provinces_regencies.json");
}

main().catch(err => { console.error(err); process.exit(1); });
