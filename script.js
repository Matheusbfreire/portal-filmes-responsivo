const TMDB_ENDPOINT = 'https://api.themoviedb.org/3';
const APIKEY = '38925d52d9663a2c6821d90b1a57c472';
const IMG_PREFIX = 'https://image.tmdb.org/t/p/w500';
let xhr;

function filmesDestaque () {
    xhr = new XMLHttpRequest ();

    xhr.open ('GET', TMDB_ENDPOINT + '/movie/popular' + '?api_key=' + APIKEY + '&language=pt-BR', true);
    xhr.onload = exibeFilmes;
    xhr.send();
}

function filmesLancamentos () {
    xhr = new XMLHttpRequest ();

    xhr.open ('GET', TMDB_ENDPOINT + '/movie/top_rated' + '?api_key=' + APIKEY + '&language=pt-BR', true);
    xhr.onload = exibeCarrossel;
    xhr.send();
}

function gravaLS () {
    query = document.getElementById('pesquisa').value;
    localStorage.setItem('psq', JSON.stringify(query));
}

function removeLS () {
    if (localStorage.getItem('psq')) {
        localStorage.removeItem('psq');
    }
}

function exibeFilmes () {
    let data = JSON.parse (xhr.responseText);
    let textoHTML = '';

    for (let i = 0; i < 4; i++) {
        let imagem = IMG_PREFIX + data.results[i].poster_path;

        textoHTML += `<div class="col-12 col-md-6 col-lg-3">
        <img class="img_capa" src="${imagem}">
    </div>`
    }

    document.getElementById('destaques').innerHTML = textoHTML;
}

function exibeCarrossel () {
    let data = JSON.parse (xhr.responseText);
    let textoHTML = '';

    for (let i = 0; i < 3; i++) {
        let imagem = IMG_PREFIX + data.results[i].poster_path;
        let titulo = data.results[i].title;
        let resumo = data.results[i].overview;
        let estreia = data.results[i].release_date;
        let nota = data.results[i].vote_average;

        textoHTML = `<div class="row">
                        <div class="col-md-6 col-sm-12 div-l">
                            <div class="carousel-img">
                                <img src="${imagem}">
                            </div>
                        </div>
                        <div id="filme" class="col-md-6 col-sm-12 div-r">
                            <h2>${titulo}</h2>
                            <p class="sinopse" id="lancamentos"><b>Sinopse:</b> ${resumo}</p>
                            <p><b>Estreia:</b> ${estreia}</p>
                            <p><b>Avaliação</b> ${nota}</p>
                        </div>
                    </div>`
        
        document.getElementById(`sl${i}`).innerHTML = textoHTML;
}
}

filmesLancamentos();

filmesDestaque();

/*
carregaFilmes();
if (localStorage.getItem('test')) {
    localStorage.removeItem('test');
}

localStorage.setItem('test',JSON.stringify(query));
let teste = localStorage.getItem('test');
*/