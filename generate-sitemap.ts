// import { js2xml } from "xml-js";
// import router from "./src/router";
// // @ts-ignore
// import fs from "fs";


const { js2xml } = require("xml-js");
const fs = require("fs");
const router = require("./src/router").default;



// Generate Sitemap from Vue Router
const routes = router.getRoutes()
    .filter(route => route.path !== "/:pathMatch(.*)*") // Exclude wildcard routes
    .map(route => ({
        loc: `https://portrec.ng${route.path}`,
        lastmod: new Date().toISOString().split("T")[0],
        priority: route.path === "/" ? "1.0" : "0.8",
    }));

const sitemapObj = {
    urlset: {
        _attributes: { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" },
        url: routes,
    },
};

// Convert JSON to XML
const xmlContent = js2xml(sitemapObj, { compact: true, ignoreComment: true, spaces: 2 });


// Save as sitemap.xml
fs.writeFileSync("./public/sitemap.xml", xmlContent, "utf8");

console.log("✅ Sitemap generated successfully: /public/sitemap.xml");