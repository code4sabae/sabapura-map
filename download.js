import { CSV } from "https://js.sabae.cc/CSV.js";
import { getDate } from "https://js.sabae.cc/getDate.js";
import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";

const getId = async () => {
    const url = "https://sabapura.com";
    const html = await (await fetch(url)).text();
    //await Deno.writeTextFile("html/index.html", html);
    //const html = await Deno.readTextFile("html/index.html");
    //console.log(html);
    
    const root = HTMLParser.parse(html);
    const scripts = root.querySelectorAll("script");
    for (const scr of scripts) {
        const url = scr.attributes.src;
        if (url && url.startsWith("/_next/static/") && !url.startsWith("/_next/static/chunks/")) {
            return url.split("/")[3];
        }
        //console.log(url);
    }
    return null;
};
const id = await getId();
console.log(id);

//const url = "https://sabapura.com/_next/data/eGqFCze-hIGd-7hkNlK9g/index.json";
//const url = "https://sabapura.com/_next/data/nCAj9Fcx8CeAStkmiS5AL/index.json";
const url = "https://sabapura.com/_next/data/" + id + "/index.json";
const data = await (await fetch(url)).json();
//await Deno.writeTextFile("index.json", JSON.stringyfi(data));
//const data = JSON.parse(await Deno.readTextFile("index.json"));
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
const fn = "data/latest.csv";
const sold = CSV.stringify(CSV.parse(await Deno.readTextFile(fn)));
const snew = CSV.stringify(list);
if (sold != snew) {
    await Deno.writeTextFile(fn, snew);
    await Deno.writeTextFile("data/" + getDate() + ".csv", snew);
    /*
    console.log(snew.length, snew.substring(0, 10))
    console.log(sold.length, sold.substring(0, 10))
    */
} else {
    console.log("not changed");
}
