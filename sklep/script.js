window.onload = function () {
    let basketValue = 0;
    let basketCounter = 0;
    const basketLimit = 8;
    const basketOverflowMessage = 'Osiągnięto limit koszyka - 8 szt.\nProszę dokonać zakupu albo usunąć niepotrzebne towary z koszyka';

    const ofertaContainer = document.getElementById('oferta');
    const basketItems = document.getElementById('basket-items');
    const buttonBuy = document.getElementById('btn-buy');
    const buttonClear = document.getElementById('btn-clear');

    buttonBuy.disabled = true;
    buttonClear.disabled= true;

    function updateBasketValue(amount) {
        if (amount === 0) {
            basketValue = 0;
            buttonBuy.disabled = true;
            buttonClear.disabled = true;
        } else {
            basketValue = basketValue + amount;
        }
        document.getElementById('cena-koszyka').textContent = 'cena koszyka: ' + basketValue.toLocaleString('de-DE') + ' zł';
    }

    function convertToValue(price) {
        let ind = price.indexOf(' ');
        price = price.substr(0, ind).replace('.', '');
        return parseInt(price);
    }

    function createBasketItem(name, price) {
        let newBasketItem = document.createElement('div');
        newBasketItem.classList.add('basket-item');

        let newBasketItemNameRem = document.createElement('div');
        newBasketItemNameRem.classList.add('basket-item-name_rem');

        let newBasketItemName = document.createElement('div');
        newBasketItemName.classList.add('basket-item-name');
        newBasketItemName.textContent = name;

        let newBasketRemoveBtn = document.createElement('button')
        newBasketRemoveBtn.classList.add('basket-remove-btn');
        newBasketRemoveBtn.textContent = 'Usuń';

        let newBasketItemPrice = document.createElement('div');
        newBasketItemPrice.classList.add('basket-item-price');
        newBasketItemPrice.textContent = price;

        newBasketItem.appendChild(newBasketItemNameRem);
        newBasketItem.appendChild(newBasketItemPrice);

        newBasketItemNameRem.appendChild(newBasketItemName);
        newBasketItemNameRem.appendChild(newBasketRemoveBtn);

        basketItems.appendChild(newBasketItem);

        buttonBuy.disabled = false;
        buttonClear.disabled = false;
    }

    function clearBasket() {
        let basketElements = document.getElementsByClassName('basket-item');
        for (let i = basketCounter; i > 0; i--) {
            basketItems.removeChild(basketElements[i - 1]);
        }
        basketCounter = 0;
        updateBasketValue(0);
    }

    ofertaContainer.addEventListener('click', function (e) {
        if (e.target.className.includes('btn-dodaj')) {
            if (basketCounter < basketLimit) {
                let itemName = e.target.parentNode.previousElementSibling.textContent;
                let itemPrice = e.target.previousElementSibling.textContent;
                createBasketItem(itemName, itemPrice);
                updateBasketValue(convertToValue(itemPrice));
                basketCounter++;
            } else {
                window.alert(basketOverflowMessage);
            }
        }
    })

    basketItems.addEventListener('click', function (e) {
        if (e.target.className.includes('basket-remove-btn')) {
            let itemPrice = e.target.parentNode.nextElementSibling.textContent;
            let elementToRemove = e.target.parentNode.parentNode;
            let elementParent = elementToRemove.parentNode;
            elementParent.removeChild(elementToRemove);
            updateBasketValue(-convertToValue(itemPrice));
            basketCounter--;
        }
    })

    buttonBuy.addEventListener('click', function () {
        if (basketValue !== 0) {
            window.alert('Zakupiono towary z koszyka.\nWartość zakupionych towarów wynosi ' + basketValue.toLocaleString('de-DE') + ' zł')
            clearBasket();
        }
    })

    buttonClear.addEventListener('click', function () {
        if (basketValue !== 0) {
            clearBasket();
        }
    })
}