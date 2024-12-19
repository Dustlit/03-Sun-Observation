document.addEventListener("DOMContentLoaded", () => {
    const attendeesInput = document.getElementById("attendees");
    const amountDisplay = document.getElementById("amount");
    const discountDisplay = document.getElementById("discount");
    const submitButton = document.getElementById("submitButton");
    const copyButtons = document.querySelectorAll("#copyButton");

    // Cost per person and discount rate
    const originalPrice = 500;
    const discountRate = 0.4;
    const discountedPrice = originalPrice - originalPrice * discountRate;

    // Display the discounted price
    discountDisplay.textContent = `Christmas Offer: ₹${discountedPrice.toFixed(2)} per person (40% off)`;

    // Calculate total amount
    const calculateAmount = () => {
        const attendees = parseInt(attendeesInput.value) || 0;
        const totalAmount = attendees * discountedPrice;
        amountDisplay.textContent = `Total Amount: ₹${totalAmount.toFixed(2)}`;
    };

    // Attach the calculateAmount function to the attendees input
    attendeesInput.addEventListener("input", calculateAmount);

    // Copy UPI number to clipboard
    copyButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const upiNumber = event.target.previousElementSibling.textContent;
            navigator.clipboard.writeText(upiNumber).then(() => {
                alert("UPI Number copied to clipboard!");
            }).catch(err => {
                console.error("Failed to copy UPI number: ", err);
            });
        });
    });

    // Handle form submission
    const registrationForm = document.getElementById("registrationForm");
    registrationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const attendees = attendeesInput.value;

        if (!name || !phone || !attendees) {
            alert("Please fill in all required fields.");
            return;
        }

        alert(`Thank you for registering, ${name}!\nWe will contact you soon.`);
        registrationForm.reset();
        amountDisplay.textContent = "Total Amount: ₹0";
    });
});
