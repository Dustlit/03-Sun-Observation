document.getElementById('generateQRBtn').addEventListener('click', generateQRCode);
document.getElementById('submitBtn').addEventListener('click', submitForm);

function updateAmount() {
    const attendees = parseInt(document.getElementById('attendees').value) || 0;
    const amountPerPerson = 500;
    const totalAmount = attendees * amountPerPerson;
    document.getElementById('amount').textContent = `Total Amount: ₹${totalAmount}`;
}

function generateQRCode() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const attendees = parseInt(document.getElementById('attendees').value) || 0;
    const totalAmount = attendees * 500;

    if (!name || phone.length !== 10 || attendees <= 0) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const qrContainer = document.getElementById('qrContainer');
    qrContainer.innerHTML = ''; // Clear previous QR code

    // UPI payment string format
    const upiID = "visualsofsai@okhdfcbank";
    const qrData = `upi://pay?pa=${upiID}&pn=Event Registration&mc=&tid=&tr=&tn=Sun-oObservation&am=${totalAmount}&cu=INR`;

    const qrCode = new QRCode(qrContainer, {
        text: qrData,
        width: 128,
        height: 128
    });

    alert("QR Code generated! Use it to complete your payment.");
}

function submitForm(event) {
    const qrContainer = document.getElementById('qrContainer');
    if (qrContainer.innerHTML === '') {
        alert("Please generate the payment QR code before submitting.");
        event.preventDefault(); // Prevent form submission if QR is not generated
    } else {
        alert("Form submitted successfully!");
    }
}
