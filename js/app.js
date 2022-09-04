//***************  load category  ****************

const loadData = () => {
    try {
        fetch('https://openapi.programming-hero.com/api/news/categories')
            .then(res => res.json())
            .then(data => loadNewsCategory(data.data.news_category))
    }
    catch (error) {
        console.log(error)
    }
};

//*************  set category  ***************

const loadNewsCategory = (data) => {
    // console.log(data);
    const categoryContainer = document.getElementById('category-container');
    data.forEach(category => {
        // console.log(category);
        const newDiv = document.createElement('div');

        newDiv.innerHTML = `
        <button onclick="loadNews(${category.category_id},event)" class="btn category-btn border-0 my-2">${category.category_name}</button>
        
        `;

        categoryContainer.appendChild(newDiv);
    });
}

loadData();


//*************  load news  **************


const loadNews = async (id, event) => {

    toggleSpinner(true);

    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)

    const data = await res.json();
    displayNews(data.data, event);


}

//************  set news  **************

const displayNews = (news, event) => {


    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = "";

    //***********  news count  ************

    const count = document.getElementById('count');
    if (news.length === 0) {
        count.classList.remove('d-none');
        count.innerHTML = `
        <h5>No items found for category ${event.target.innerText}</h5>
        `;
    }
    else {
        count.classList.remove('d-none');
        count.innerHTML = `
        <h5>${news.length} items found for category ${event.target.innerText}</h5>
        `;
    }

    //**********  news sorting  ************

    news.sort((a, b) => b.total_view - a.total_view);

    news.forEach(newNews => {

        const newDiv = document.createElement('div');
        newDiv.classList.add('card', 'mb-4', 'shadow-lg', 'rounded');

        newDiv.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${newNews.image_url ? newNews.image_url : 'No data found'}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${newNews.title ? newNews.title : 'No data found'}</h5>
                    <p class="card-text text-wrap">${newNews.details.slice(0, 300)}...</p>
                    
                        <img class="author-img" src="${newNews.author.img ? newNews.author.img : 'No data found'}" class="img-fluid rounded-start d-inline mx-3" alt="...">
                        <p class="card-text d-inline">${newNews.author.name ? newNews.author.name : 'No data found'}</p>
                        <p class="d-inline mx-3 mt-3">Views: ${newNews.total_view ? newNews.total_view : 'No data found'}</p>
                        <p class="d-inline mx-3 mt-3">Rating: ${newNews.rating.number ? newNews.rating.number : 'No data found'}</p>
                        <button onclick="loadNewsDetails('${newNews._id}')" type="button" class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#newsDetailModal">Details
                        </button>
                    
                </div >
            </div >
        </div>

    `;

        newsContainer.appendChild(newDiv);




    });

    toggleSpinner(false);

}

//*********  load spinner  *********

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

//*********  load news data  **********

const loadNewsDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
}


//*************  set news data in modal  ************


const displayNewsDetails = allNews => {
    const modalTitle = document.getElementById('newsDetailModalLabel')
    modalTitle.innerText = allNews.title;

    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
    <img class="h-50 mb-3 img-fluid " src="${allNews.image_url}" class="card-img-top" alt="...">
    <p>Published Date: ${allNews.author.published_date ? allNews.author.published_date : 'No data found'}</p>
    <P>${allNews.details ? allNews.details : 'No data found'}</P>

    `;
}