document.addEventListener("DOMContentLoaded", async () => {
  try {
    const coloniasResponse = await fetch("http://localhost:8080/colonias");

    if (!coloniasResponse.ok) {
      throw new Error(coloniasResponse.statusText);
    }

    const colonias = await coloniasResponse.json();
    const templateColoniasResponse = await fetch("./views/layouts/colonias.handelbars");
    const templateText = await templateColoniasResponse.text();
    const template = Handlebars.compile(templateText);
    const html = template({colonias: colonias});
    
    document.getElementById("listado-colonias").innerHTML = html;

  } catch (error) {
    console.error(error);
  }
});