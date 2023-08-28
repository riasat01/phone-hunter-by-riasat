function getPhone(url = 'a', all) {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${url}`)
        .then(res => res.json())
        .then(tottho => displayPhones(tottho.data, all))
}

const displayPhones = (phones, all) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const showBtn = document.getElementById('show-all');
    const showLess = document.getElementById('show-less');
    if (phones.length > 12 && all === false) {
        showBtn.removeAttribute('disabled');
        showLess.setAttribute('disabled', true);
        phones = phones.slice(0, 12);
    } else {
        showBtn.setAttribute('disabled', true);
        showLess.removeAttribute('disabled');
    }
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
                        <button onclick="handleDetails('${phone.slug}')" class="w-full btn btn-primary">Buy Now</button>
                    </div>
                </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);

    });
    spinner(false);
}

// show details

const handleDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(tottho => displayDetails(tottho.data))
}

// display details

const displayDetails = (data) => {
    console.log(data);
    const modal = document.querySelector('#phoneDtails').childNodes[1];
    // console.log(modal.childNodes[1].childNodes);
    const div = document.createElement('div');
    const details = `
    <img src="${data.image}" alt="phone image" />
    <p>${data.name}</p>
    <p>Storage: ${data?.mainFeatures?.storage}</p>
    <p>Display Size: ${data?.mainFeatures?.displaySize}</p>
    <p>Chipset: ${data?.mainFeatures?.chipSet}</p>
    <p>Memory: ${data?.mainFeatures?.memory}</p>
    <p>Slug: ${data.slug}</p>
    <p>Release Date: ${data.releaseDate}</p>
    <p>Brand: ${data.brand}</p>
    <p>GPS: ${data?.others?.GPS}</p>
    <div class="modal-action">
        <button class="btn">Close</button>
    </div>
    `;
    modal.textContent = '';
    div.innerHTML = details;
    modal.insertBefore(div, modal.childNodes[3]);
    phoneDtails.showModal()
}

// searchPhone

function searchPhone(all = false) {
    spinner(true);
    const phone = document.getElementById('search-phone').value;
    getPhone(phone, all);
}

// show  all

document.querySelector('#show-all').addEventListener('click', () => {
    const callFromShowAll = true;
    searchPhone(callFromShowAll);
});

// show less
document.querySelector('#show-less').addEventListener('click', () => {
    // const callFromShowAll = true;
    searchPhone();
})

// getPhone();

// loading spinner

const spinner = (isLoading) => {
    const loading = document.querySelector("#spinner");
    if (isLoading) {
        loading.classList.remove('hidden');
    } else {
        loading.classList.add('hidden');
    }
}