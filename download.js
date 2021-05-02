import { CSV } from "https://js.sabae.cc/CSV.js";

const url = "https://sabapura.com/_next/data/eGqFCze-hIGd-7hkNlK9g/index.json";
//const data = await (await fetch(url)).text();
//await Deno.writeTextFile("index.json", data);
const data = JSON.parse(await Deno.readTextFile("index.json"));
//console.log(data.pageProps.events);
const list = [];
for (const d of data.pageProps.events) {
    console.log(d);
    // https://sabapura.com/_next/data/eGqFCze-hIGd-7hkNlK9g/event/maruyo.json // 情報量同じ
    //break;

    const d2 = {
        title: d.name,
        name_shop: d.shop_name,
        image: d.top.topImage.url,
        image_header: d.headers[0]?.headerImage.url || "",
        image_icon: d.icon?.iconImage?.url || "",
        description: d.text,
        date: d.date,
        time: d.time,
        limited: d.limited,
        capacity: d.capacity,
        cost: d.cost,
        tag: d.tag,
        address: d.address,
        contact: d.contact,
        url_shop: d.url, 
        url: "https://sabapura.com/event/" + d.id,
        updatedAt: d.updatedAt,
        createdAt: d.createdAt,
        revisedAt: d.revisedAt,
    };
    list.push(d2);
}
await Deno.writeTextFile("list.csv", CSV.encode(CSV.fromJSON(list)));

