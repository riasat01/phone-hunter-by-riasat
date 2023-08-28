function getPhone(url = 'a', all) {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${url}`)
        .then(res => res.json())
        .then(tottho => displayPhones(tottho.data, all))
}

const displayPhones = (phones, all) => {
    console.log(phones);
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
                        <button class="w-full btn btn-primary">Buy Now</button>
                    </div>
                </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);

    });
    spinner(false);
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