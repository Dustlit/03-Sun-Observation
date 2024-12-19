document.addEventListener("DOMContentLoaded", () => {
    const attendeesInput = document.getElementById("attendees");
    const amountDisplay = document.getElementById("amount");
    const discountDisplay = document.getElementById("discount");

    // Cost per person and discount rate
    const originalPrice = 500;
    const discountRate = 0.4;
    const discountedPrice = originalPrice - originalPrice * discountRate;

    // Display the discounted price
    discountDisplay.textContent = `Christmas Offer: ₹${discountedPrice.toFixed()}/- per person (40% off)`;

    // Calculate total amount
    const calculateAmount = () => {
        const attendees = parseInt(attendeesInput.value) || 0;
        const totalAmount = attendees * discountedPrice;
        amountDisplay.textContent = `Total Amount: ₹${totalAmount.toFixed(2)}`;
    };

    // Attach the calculateAmount function to the attendees input
    attendeesInput.addEventListener("input", calculateAmount);

    // Handle form submission
    const registrationForm = document.getElementById("registrationForm");
    registrationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const attendees = attendeesInput.value;
        const eventDate = document.querySelector('input[name="event_date"]:checked')?.value;

        if (!name || !phone || !attendees || !eventDate) {
            alert("Please fill in all required fields, including selecting an event date.");
            return;
        }

        // Get the current date and time in IST
        const currentDate = new Date();
        const utcOffsetInMilliseconds = currentDate.getTimezoneOffset() * 60000; // UTC offset in milliseconds
        const istOffsetInMilliseconds = 5.5 * 60 * 60 * 1000; // IST offset (UTC+5:30)
        const istDate = new Date(currentDate.getTime() + utcOffsetInMilliseconds + istOffsetInMilliseconds);

        const timestamp = istDate.toISOString(); // ISO format for database
        const submission_date = istDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }); // Human-readable format

        // Prepare data for submission
        const formData = {
            name: name,
            phone: phone,
            attendees: attendees,
            event_date: eventDate,
            timestamp: timestamp,
            submission_date: submission_date
        };

        // Send data to Google Sheets via SheetDB
        fetch("https://sheetdb.io/api/v1/c4jeiz75goxnc", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert(`Thank you for registering, ${name}!\nYour data has been successfully submitted.`);
            registrationForm.reset();
            amountDisplay.textContent = "Total Amount: ₹0";
        })
        .catch(error => {
            console.error("Error submitting data to SheetDB: ", error);
            alert("An error occurred while submitting your data. Please try again.");
        });
    });
});
