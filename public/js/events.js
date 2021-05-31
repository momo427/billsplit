async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="events-title"]').value;
    const description = document.querySelector('input[name="events-desc"]').value;
    const cost = document.querySelector('input[name="events-cost"]').value;
    
    const response = await fetch(`/api/events`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        cost
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/events');
    } else {
      alert(response.statusText);
    }
  };
  
document.querySelector('#new-events-form').addEventListener('submit', newFormHandler);