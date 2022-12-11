const API_URL_RAMDON = 'https://api.thecatapi.com/v1/images/search?limit=2&live_iRZL09x5awS4ipuFPfrxx81KcoKHEzfCjaOaVMlDXBZ4q9LIEumxBFrITHwGhpkZ';

const API_URL_FAVS = 'https://api.thecatapi.com/v1/favourites';
const API_KEY = 'live_Xm7ifTEzz2vbXchOxdEKhvEiV98c972O65ReIEDBimOukTzzOgWbZXwlhDX93aua';



const btn = document.getElementById('button');
const spanError = document.getElementById('error');

async function loadRandomMichis() { 
    
    const response = await fetch(API_URL_RAMDON);
    const data = await response.json();
    
    if (response.status !== 200) {
        spanError.innerHTML = 'Error al cargar las imágenes ' + response.status;
        return;
    }
    else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
    
        img1.src = data[0].url;
        img2.src = data[1].url;
    
        btn1.onclick = () => saveFavoriteMichi(data[0].id);
        btn2.onclick = () => saveFavoriteMichi(data[1].id);
    }


};

async function loadFavoriteMichis(id) {

    const res = await fetch(
        API_URL_FAVS ,{
        headers:{
            "content-type":"application/json",
            'x-api-key': API_KEY
        }
    });

    const data = await res.json();
    console.log('Favoritos')
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = 'Error al cargar las imágenes ' + res.status;
        return;
    } 
    else {
        
        const section = document.getElementById('favoritesMichis');
        section.innerHTML = '';
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('MichisFavoritos');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(michi => {
            
            const article = document.createElement('article');
            const img = document.createElement('img');
            const button = document.createElement('button');
            const btnText = document.createTextNode('Eliminar');

            button.appendChild(btnText);
            img.src = michi.image.url;
            img.width = 250;
            img.height = 250;
            
            button.onclick = () => deleteFavoriteMichi(michi.id);

            article.appendChild(img);
            article.appendChild(button);
            section.appendChild(article);

            // michi.image.url
        });
    }
}


async function saveFavoriteMichi (id) {
    const res = await fetch( API_URL_FAVS + '/', {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            'x-api-key': API_KEY
        },
        body: JSON.stringify({
            "image_id": `${id}`,
        })
    });

    if (res.status !== 200) {
        spanError.innerHTML = 'Error al cargar las imágenes ' + res.status;
        return;
    }
    else {
        console.log(`michi ${id} guardado`);
        loadFavoriteMichis();
    }

    const data = await res.json();
    console.log(data);
}


async function deleteFavoriteMichi (id) {

    const res = await fetch( API_URL_FAVS + `/${id}`, {
        method: 'DELETE',
        headers: {
            'x-api-key': API_KEY
        }
    });

    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = 'Error al cargar las imágenes ' + res.status;
        return;
    }
    else {
        console.log(`michi ${id} eliminado`);
        loadFavoriteMichis();
    }



}


loadRandomMichis();
loadFavoriteMichis();

btn.onclick = loadRandomMichis;


