

const defaultDisplay = () => {

    const newsContainer = document.getElementById('news-container');
    const newDiv = document.createElement('div');
    newDiv.classList.add('bg-light', 'p-4', 'rounded-4')
    newDiv.innerHTML = `
    <h1 class="text-center my-5">"Please select a category"</h1>
    `;

    newsContainer.appendChild(newDiv);

}


defaultDisplay(); 