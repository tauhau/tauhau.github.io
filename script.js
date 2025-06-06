document.addEventListener('click', async function (event) {
    // Check if the clicked element has the desired class
    if (event.target.classList.contains('uniwersalia') || event.target.classList.contains('notatki')) {
      const listContainer = document.getElementById('lista');
      
      // Clear previous content
      listContainer.innerHTML = '';
  
      // Determine which file to fetch
      let jsonFile = '';
      if (event.target.classList.contains('uniwersalia')) {
        console.log('uniwersalia')
        jsonFile = 'uniwersalia.json';
      } else if (event.target.classList.contains('notatki')) {
        console.log('notatki')
        jsonFile = 'notatki.json';
      }
  
      try {
        const response = await fetch(jsonFile);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
  
        // Expecting array of { title, link }
        data.forEach(item => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.textContent = item.title;
          a.href = item.link;
          a.target = '_blank'; // optional: open in new tab
          a.classList.add('lista_link')
          li.appendChild(a);
          listContainer.appendChild(li);
        });
      } catch (error) {
        console.error('Error loading JSON:', error);
        listContainer.innerHTML = '<li>Failed to load content</li>';
      }
    }
  });