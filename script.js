document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const drawPrizeButton = document.getElementById('drawPrizeButton');
    const winnerDisplay = document.getElementById('winner');

    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const idError = document.getElementById('idError');

    function validateForm(name, phone, id) {
        const phonePattern = /^05\d{8}$/; // Saudi mobile number pattern
        const idPattern = /^\d{10}$/; // Saudi national ID pattern

        let valid = true;

        if (!name) {
            nameError.textContent = 'الاسم مطلوب.';
            nameError.style.display = 'block';
            valid = false;
        } else {
            nameError.style.display = 'none';
        }

        if (!phonePattern.test(phone)) {
            phoneError.textContent = 'الرجاء إدخال رقم جوال صحيح.';
            phoneError.style.display = 'block';
            valid = false;
        } else {
            phoneError.style.display = 'none';
        }

        if (!idPattern.test(id)) {
            idError.textContent = 'الرجاء إدخال رقم هوية سعودية صحيح.';
            idError.style.display = 'block';
            valid = false;
        } else {
            idError.style.display = 'none';
        }

        const visitors = JSON.parse(localStorage.getItem('visitors')) || [];
        if (visitors.some(visitor => visitor.phone === phone || visitor.id === id)) {
            idError.textContent = 'رقم الجوال أو رقم الهوية مسجل مسبقاً.';
            idError.style.display = 'block';
            valid = false;
        } else {
            idError.style.display = 'none';
        }

        return valid;
    }

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const id = document.getElementById('id').value;
        const prizeDraw = document.getElementById('prizeDraw').checked;

        if (!validateForm(name, phone, id)) {
            return;
        }

        const visitor = { name, phone, id, prizeDraw };

        let visitors = JSON.parse(localStorage.getItem('visitors')) || [];
        visitors.push(visitor);
        localStorage.setItem('visitors', JSON.stringify(visitors));

        alert('تم التسجيل بنجاح!');
        registrationForm.reset();
    });

    drawPrizeButton.addEventListener('click', function() {
        const visitors = JSON.parse(localStorage.getItem('visitors')) || [];
        const prizeDrawEntries = visitors.filter(visitor => visitor.prizeDraw);

        if (prizeDrawEntries.length === 0) {
            winnerDisplay.textContent = 'No prize draw entries yet.';
            return;
        }
        const winner = prizeDrawEntries[Math.floor(Math.random() * prizeDrawEntries.length)];
        winnerDisplay.textContent = `Winner: ${winner.name} (${winner.phone})`;
    });
});


// Function to populate the customer service staff dropdown
function populateCustomerServiceDropdown() {
    const customerServiceDropdown = document.getElementById('customerService');
    customerServiceDropdown.innerHTML = '<option value="">اختر موظف خدمة العملاء</option>'; // Reset dropdown
    const staffMembers = JSON.parse(localStorage.getItem('staffMembers')) || [];
    staffMembers.forEach(staff => {
        let option = document.createElement('option');
        option.value = staff;
        option.textContent = staff;
        customerServiceDropdown.appendChild(option);
    });
}

// Call the function to populate dropdown on page load
populateCustomerServiceDropdown();

