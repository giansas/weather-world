document.querySelector('.busca').addEventListener('submit', async (event) => {
    //  previne o comportamento padrão que o formulario deveria ter
    //  não atualiza os dados, então não perde o que foi digitado no campo / salva
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    //  evitando campo vazio
    if(input !== ''){
        clearInfo();
        showWarning('Carregando...');
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=da527b14c8918aba761fcebfbcb4c94f&lang=pt_br&units=metric`;

    let results = await fetch(url);
    let json = await results.json();

    //  200 é o código de confirmação de que a cidade foi encontrada pela requisição
    //  é possível visualizar o código logo no início da requisição pelo console
    if(json.cod === 200){
        showInfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg
        });
    } else {
        clearInfo();
        showWarning("Localização inválida ou não encontrada");
    }

});

function showInfo(json){
    showWarning('');

    //  alterando os valores dinamicamente
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    //  icone direção do vento
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    //  oculta a div com a mensagem "carregando"
    document.querySelector('.resultado').style.display = 'block';
}

//  oculta o resultado
function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

//  Exibe aviso de loading após fazer a requisição
function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}