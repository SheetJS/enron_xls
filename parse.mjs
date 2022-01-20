#!/usr/bin/env node

import { readFileSync, existsSync, writeFileSync, statSync } from 'fs';
import fetch from "node-fetch";
const { DOMParser } = await import('@xmldom/xmldom');

const tag = "edrm.enron.email.data.set.v2.xml";
const baseXML = `artifacts/${tag}_files.xml`;
const baseURL = `https://ia801309.us.archive.org`;
const EXT = process.env.EXT || "xls";
/*
| ext | count |
|:----|------:|
| wk4 |     1 |
| wk1 |     2 |
| tsv |     6 |
| xla |    30 |
| xlw |   124 |
| xls | 65564 |
*/

/* download a file if it does not exist */
async function grab(fn, url, size, subdir) {
	if(subdir) fn = subdir + fn;
	if(existsSync(fn)) return;
	console.log(`GET ${url}${size ? " " + size : ""}`);
	const f = await fetch(url);
	const t = Buffer.from(await f.arrayBuffer());
	writeFileSync(fn, t);
}

/* grab the archive.org manifest */
await grab(baseXML, `${baseURL}/4/items/${tag}/${tag}_files.xml`);

/* find the file entries */
const doc = new DOMParser().parseFromString(readFileSync(baseXML).toString());
const files = doc.getElementsByTagName("file");

/* look for ZIP files and process them */
(async() => { for(var i = 0; i < files.length; ++i) {
	const file = files[i];
	const name = file.getAttribute("name");
	if(!name) continue;
	if(process.argv[2] && process.argv[2] != name) continue;
	if(file.getElementsByTagName("format")?.[0]?.textContent?.trim() == "ZIP") await zipped(name);
}})();

/* process a zip file (this part depends on the specific layout of the HTML listing) */
async function zipped(name) {
	/* grab the HTML page (there is no XML entry like the main listing) */
	const fn = `artifacts/ZZZ_${name}`;
	await grab(fn, `${baseURL}/view_archive.php?archive=/4/items/${tag}/${name}`);

	/* find the relevant links */
	const html = readFileSync(fn).toString().split(/[\r\n]+/);
	const rows = html.filter(t => t.indexOf(`.${EXT}</a>`) > -1);

	/* process the html line */
	for(let ri = 0; ri < rows.length; ++ri) {
		const t = rows[ri];
		const m = t.match(/a href="(.*?)"/);
		if(!m) return;
		const szm = t.match(/td id="size">(\d+)<\//);

		/* try to download the file */
		const f = m[1].split("/").slice(-1)[0];
		await grab(f, (m[1].startsWith("//") ? "https:" : "") + m[1], szm?.[1], "files/");

		/* if the file size is found, try to do the right thing */
		try {
			const sza = statSync("files/" + f)?.size;
			if(szm?.[1] && sza != +szm[1]) console.log(`${f}: expected size ${szm[1]}, actual size ${sza}`)
		} catch(e) {}
	}
}

