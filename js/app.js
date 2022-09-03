const loadNews = (id) => {
    toggleSpinner(true);

    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displayNews(data.data))
}


const displayNews = (news) => {

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = "";
    news.forEach(newNews => {
        console.log(newNews);

        const newDiv = document.createElement('div');
        newDiv.classList.add('card')
        newDiv.classList.add('g-0');
        newDiv.classList.add('mb-4');

        newDiv.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${newNews.image_url ? newNews.image_url : 'No data found'}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${newNews.title ? newNews.title : 'No data found'}</h5>
                    <p class="card-text">${newNews.details.slice(0, 400)}</p>
                    <img class="author-img" src="${newNews.author.img ? newNews.author.img : 'No data found'}" class="img-fluid rounded-start d-inline mx-3" alt="...">
                    <p class="card-text d-inline">${newNews.author.name ? newNews.author.name : 'No data found'}</p>
                    <p class="d-inline mx-3">Views: ${newNews.total_view ? newNews.total_view : 'No data found'}</p>
                    <p class="d-inline mx-3">Rating: ${newNews.rating.number ? newNews.rating.number : 'No data found'}</p>
                    <button onclick="loadNewsDetails('${newNews._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailModal">Details
                    </button>
                </div >
            </div >
        </div>

    `;

        newsContainer.appendChild(newDiv);




    });

    toggleSpinner(false);

}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}


const loadNewsDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data);
    console.log(data.data)
}




// 18th step 
// add to modal phone details 

const displayNewsDetails = allNews => {
    const modalTitle = document.getElementById('newsDetailModalLabel')
    modalTitle.innerText = allNews.title;

    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
    <img class="h-50 mb-3" src="${allNews.image}" class="card-img-top" alt="...">
    <p>Release Date: ${allNews.releaseDate ? allNews.releaseDate : 'No Release Date Found'}</p>
    <P>Storage: ${allNews.mainFeatures ? allNews.mainFeatures.storage : 'No storage info'}</P>
    <p>Others: Bluetooth: ${allNews.others ? allNews.others.Bluetooth : 'No Bluetooth'}</p>

    `;
}