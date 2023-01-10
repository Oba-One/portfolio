import * as prismic from "@prismicio/client";

export async function initPrismic() {
  const client = prismic.createClient(process.env.PRISMIC_ENDPOINT ?? "", {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN ?? "",
  });

  const [leafs, roots, socials, contact] = await Promise.all([
    client.getAllByType("leaf"),
    client.getAllByType("root"),
    client.getAllByType("social"),
    client.getAllByType("contact"),
  ]);

  console.log("Data", {
    leafs,
    roots,
    socials,
    contact,
  });

  return {
    leafs,
    roots,
    socials,
    contact,
  };
}
