// Booking Form Validation
document.getElementById('booking-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value.trim();

    // Simple validation
    if (!name || !email || !phone || !date || !time || !guests) {
        alert('Please fill out all fields.');
        return;
    }

    // Confirmation
    alert(`Thank you, ${name}! Your table for ${guests} guest(s) has been reserved on ${date} at ${time}.`);
    document.getElementById('booking-form').reset(); // Reset the form
});
