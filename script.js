document.addEventListener('DOMContentLoaded', () => {
    const attendeesInput = document.getElementById('attendees');
    const amountDisplay = document.getElementById('amount');
    const copyButton = document.getElementById('copyButton');
    const upiNumber = document.getElementById('upiNumber').textContent;
    const apiUrl = "https://sheetdb.io/api/v1/c4jeiz75goxnc"; // SheetDB API link

    // Calculate the total amount dynamically
    attendeesInput.addEventListener('input', calculateAmount);

    function calculateAmount() {
        const attendees = parseInt(attendeesInput.value) || 0;
        const totalAmount = attendees * 500;
        amountDisplay.textContent = `Total Amount: ₹${totalAmount}`;
    }

    // Copy UPI number to clipboard
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(upiNumber)
            .then(() => {
                alert('UPI number copied to clipboard!');
            })
            .catch((err) => {
                alert('Failed to copy UPI number.');
                console.error(err);
            });
    });

    // Get current timestamp in IST
    function getISTTimestamp() {
        const now = new Date();
        const utcOffset = now.getTimezoneOffset() * 60000; // Offset in milliseconds
        const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
        const istDate = new Date(now.getTime() + utcOffset + istOffset);
        return istDate.toISOString().replace("T", " ").substring(0, 19); // Format: YYYY-MM-DD HH:MM:SS
    }

    // Handle form submission
    document.getElementById('registrationForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const attendees = parseInt(attendeesInput.value) || 0;

        if (!name || phone.length !== 10 || attendees <= 0) {
            alert("Please fill out the form correctly.");
            return;
        }

        // Prepare data to send to SheetDB
        const data = {
            data: {
                Name: name,
                Phone: phone,
                Attendees: attendees,
                TotalAmount: attendees * 500,
                Timestamp: getISTTimestamp() // Add the timestamp
            }
        };

        // Send data to SheetDB
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            alert("Registration submitted successfully!");
            document.getElementById('registrationForm').reset(); // Reset the form
            amountDisplay.textContent = "Total Amount: ₹0"; // Reset amount display
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to submit the registration. Please try again.");
        });
    });
});
