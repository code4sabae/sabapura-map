import { CSV } from "https://js.sabae.cc/CSV.js";

const data = CSV.parse(await Deno.readTextFile("data/latest.csv"));
const geo3x3 = CSV.parse(await Deno.readTextFile("geo3x3.csv"));
for (const d of data) {
    const pos = geo3x3.find(s => s.name_shop == d.name_shop);
    console.log(pos);
    if (!pos) {
        throw new Error("not found Geo3x3 in geo3x3.csv!! " + d.name_shop);
    }
    d.geo3x3 = pos.geo3x3;
}
await Deno.writeTextFile("events.csv", CSV.stringify(data));

