import { CSV } from "https://js.sabae.cc/CSV.js";
import { getDate } from "https://js.sabae.cc/getDate.js";
import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";

const url = "https://sabapura.com/data.json";
const data = await fetchJSON(url);
console.log(data);
