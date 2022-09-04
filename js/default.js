

const defaultDisplay = () => {

    const newsContainer = document.getElementById('news-container');
    const newDiv = document.createElement('div');
    newDiv.classList.add('bg-light', 'p-5', 'rounded-4', 'shadow-lg')
    newDiv.innerHTML = `
    <h1 class="text-center default-text">"Please select a category"</h1>
    `;

    newsContainer.appendChild(newDiv);

}


defaultDisplay(); 