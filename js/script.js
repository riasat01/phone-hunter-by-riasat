function getPhone(url) {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${url}`)
        .then(res => res.json())
        .then(tottho => displayPhones(tottho.data))
}

const displayPhones = phones => {
    console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-base-100 shadow-xl`;
        phoneCard.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
                <figure><img src="${phone.image}" alt="Shoes" /></figure>
                <div class="card-body">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-end">
                        <button class="w-full btn btn-primary">Buy Now</button>
                    </div>
                </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
}

// searchPhone

function searchPhone(){
const phone = document.getElementById('search-phone').value;
getPhone(phone);
}