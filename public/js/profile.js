const newFormHandler = async (event) => {
    event.preventDefault();
  
    const event_name = document.querySelector('#events-name').value.trim();
    const total_cost = document.querySelector('#events-cost').value.trim();
    const description = document.querySelector('#events-desc').value.trim();
  
    if (event_name && total_cost && description) {
      const response = await fetch(`/api/events`, {
        method: 'POST',
        body: JSON.stringify({ event_name, total_cost, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create event');
      }
    }
  };
  

  document
    .querySelector('.new-events-form')
    .addEventListener('submit', newFormHandler);
  
 
  