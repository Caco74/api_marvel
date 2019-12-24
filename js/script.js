//  LLave Pública y llave Privada
const privateKey = 'c30efda1a50999cb3e17001c4f951ba6da4f37fc',
  publicKey = '3e170ddbcf51785a2b16c077d8589207',
  content = document.getElementById('content'),
  search = document.getElementById('search');

// Creamos método fetch() para que haga la conexión y traiga los resultados
const getConnection = () => {
  const ts = Date.now(),
    hash = MD5(ts + privateKey + publicKey),
    URL = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    //Vamos a hacer la petición con fetch()
    fetch(URL)
    // .then(response => {
    //   if (response.status === 200) {
    //     console.log('Correcto');
    //   }
    // }) // Petición a URLs. Esta es una promesa, entonces cuando la petición devuelve la infornmación, solo hasta que la devuelve, actúa este THEN.
      .then(response => response.json()) //Procesar y convertir en un json a response
      .then(response => {
        //console.log(response)
        response.data.results.forEach(e => {
          drawHero(e) // e -> es el objeto que quiero que dibuje
        })
      }) //Mostrar la infornmación
      .catch(e => console.log(e)) // Recibimos un objeto error 'e'
}

const drawHero = e => { // Recibe un objeto 'e'
  const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;
  //Crear elentos HTML de nuestro objetos
  const hero = `
  <div class="hero ed-item l-1-3">
    <h3>${e.name}</h3>
    <div class="hero-img">
      <img class="thumbnail" src="${image}">
      <p class="description">${e.description}</p>
    </div>
  </div>
  `;
  // insertAdjacentHTML permite agregar html escrito de la forma de arriba ( `` ) en un string, en una parte específica de un elemento
  content.insertAdjacentHTML('beforeEnd', hero)
}

const searchHero = name => { //Recibe el nombre del heroe que debemos buscar
  const ts = Date.now(),
    hash = MD5(ts + privateKey + publicKey),
    hero = encodeURIComponent(name), //Codificar el nombre en una URI que acepte
    URL = `http://gateway.marvel.com/v1/public/characters?name=${hero}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    fetch(URL)
      .then(response => response.json())
      .then(response => {
        response.data.results.forEach(e => {
          drawHero(e);
        });
      })
      .catch(e => console.log(e));
}


search.addEventListener('keyup', e => {
  if (e.keyCode === 13) {
    content.innerHTML = '';
    searchHero(e.target.value.trim());     // O sea el nombre que estamos enviando
  }
})
getConnection();
