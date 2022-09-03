const loadNews = (id) => {
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
                    <button onclick="loadNewsDetails('${newNews._id}')" class="btn btn-primary m-auto">Details</button>
                </div >
            </div >
        </div>

    `;

        newsContainer.appendChild(newDiv);




    });

}


const loadNewsDetails = () => {
    fetch
}
