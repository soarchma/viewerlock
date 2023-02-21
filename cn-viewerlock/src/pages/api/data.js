export default async function handler(req, res) {
  console.log(`Name: ${req.body.name}`);
  try {
    // some await stuff here
    res.redirect(307, "/posts/first-post2");
  } catch (err) {
    res.status(500).send({ error: "Error while fetching data" });
  }
}
