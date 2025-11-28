
  // MW-Notification Banner
document.addEventListener('DOMContentLoaded', async function () {
  // Article label to be considered for the alerts
  const label = 'drift';

  // Get current help center locale
  const locale = document
      .querySelector('html')
      .getAttribute('lang')
      .toLowerCase();

  // URL to be called to get the alert data
  const url = `/api/v2/help_center/${locale}/articles.json?label_names=${label}`;

  // Raw data collected from the endpoint above
  const response = await fetch(url);
  const data = await response.json();

  // List of articles returned
  const articles = (data && data.articles) || [];
  console.log('ingen artiker');
  // Handle returned articles
  for (let i = 0; i < articles.length; i++) {
    const { html_url, title, id } = articles[i];
    if (sessionStorage.getItem(id) === "closed") { continue; }
    const html = `
      <div class="ns-box ns-bar ns-effect-slidetop ns-type-notice ns-show">
        <div class="ns-box-inner">
          <span class="megaphone"></span>
          <p>
            <a href="${html_url}">${title} | Tryk her for at læse mere</a>
          </p>
        </div>
        <span class="ns-close"></span>
      </div>
    `;
    // Append current alert to the alertbox container
    document.querySelector('.alertbox').insertAdjacentHTML('beforeend', html);
  }
})


document.addEventListener('click', function (event) {
  // Close alertbox
  if (event.target.matches('.ns-close')) {
    event.preventDefault();
    sessionStorage.setItem(event.target.parentElement.id, "closed");
    event.target.parentElement.remove();
  }
});

