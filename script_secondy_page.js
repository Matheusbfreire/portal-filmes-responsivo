const TMDB_ENDPOINT = 'https://api.themoviedb.org/3';
const APIKEY = '38925d52d9663a2c6821d90b1a57c472';
const IMG_PREFIX = 'https://image.tmdb.org/t/p/w500';
let xhr;

function carregaFilmes () {
    xhr = new XMLHttpRequest ();

    xhr.open ('GET', TMDB_ENDPOINT + '/movie/popular' + '?api_key=' + APIKEY + '&language=pt-BR', true);
    xhr.onload = exibeFilmes;
    xhr.send();
}

function carregaPesquisa () {
    xhr = new XMLHttpRequest ();

    query = localStorage.getItem('psq');

    xhr.open ('GET', TMDB_ENDPOINT + '/search/movie' + '?api_key=' + APIKEY + '&query=' + query + '&language=pt-BR', true);
    xhr.onload = exibeFilmes;
    xhr.send();
}

function pesquisaFilmes () {
    xhr = new XMLHttpRequest ();

    query = document.getElementById('pesquisa').value;

    xhr.open ('GET', TMDB_ENDPOINT + '/search/movie' + '?api_key=' + APIKEY + '&query=' + query+ '&language=pt-BR', true);
    xhr.onload = exibeFilmes;
    xhr.send();
}


function exibeFilmes () {
    
    let data = JSON.parse (xhr.responseText);
    let textoHTML = '';

    for (let i = 0; i < data.results.length; i++) {
        let imagem = IMG_PREFIX + data.results[i].poster_path;
        let titulo = data.results[i].title;
        let resumo = data.results[i].overview;
        let estreia = data.results[i].release_date;
        let nota = data.results[i].vote_average;

        textoHTML += `<div id="card" class="card mb-3" ">
            <div class="row g-0">
                <div id="card_img" class="col-lg-4 col-md-4">
                    <img src="${imagem}">
                </div>
                <div class="col-lg-8 col-md-8">
                    <div class="card-body">
                        <h1 class="card-title">${titulo}</h1>
                        <p><b>Sinopse:</b> ${resumo}</p>
                        <p><b>Estreia:</b> ${estreia}</p>
                        <p><b>Avaliação:</b> ${nota}</p>
                    </div>
                </div>
            </div>
        </div>`
    }

    document.getElementById('tela').innerHTML = textoHTML;
}

function filmesSelect (elemento) {
    xhr = new XMLHttpRequest ();

    xhr.open ('GET', TMDB_ENDPOINT + '/movie/' + elemento.value + '?api_key=' + APIKEY + '&language=pt-BR', true);
    xhr.onload = exibeFilmes;
    xhr.send();
}

if (localStorage.getItem('psq')) {
    carregaPesquisa();
} else {
    carregaFilmes();
}

/*
carregaFilmes();
if (localStorage.getItem('test')) {
    localStorage.removeItem('test');
}

console.log(query);
localStorage.setItem('test',JSON.stringify(query));
let teste = localStorage.getItem('test');
console.log(teste);*/
