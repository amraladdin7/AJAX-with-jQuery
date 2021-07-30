(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    
    
    var script = document.createElement('script');
    script.src = 'jquery.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID U5rT9o0PkeBh-1Zcuh3ek1_rChQ8z8lgWfCnH7xiR_o'
            }
        }).done(addImage);

        function addImage(images) {   
            let htmlContent = '';
        
            if (images && images.results && images.results[0]) {
            const firstImage = images.results[0];
            htmlContent = `<figure>
                <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`;
            } else {
                htmlContent = '<div class="error no image"> No Images to preview </div>'
            }
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }

        function addArticles(articles) {
            let htmlContent = '';
            if (articles.response && articles.response.docs && articles.response.docs.length > 1) {
                htmlContent = '<ul>' + articles.response.docs.map(article => `<li class="article">
                    <h2> <a href="${article.web_url}">${article.headline.main}</a></h2>
                    <p>${article.snippet}</p>
                </li>`
                ).join('') + '</ul>';
            } else {
                htmlContent = '<div class="error-no-articles"> No Articles Found </div>';
            }
            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }
        
        $.ajax({
            url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=8i88GfFd8bszza5zmHGGUvxlluUQdWte`
        }).done(addArticles);
    });
})();

