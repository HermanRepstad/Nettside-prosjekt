
let handlekurv = JSON.parse(localStorage.getItem('handlekurv')) || [];


function leggTilIKurv(navn, pris) {
    let funnet = false;

    for (let i = 0; i < handlekurv.length; i++) {
        if (handlekurv[i].navn == navn) {
            handlekurv[i].antall++;
            funnet = true;
        }
    }

    if (funnet == false) {
        handlekurv.push({
            navn: navn,
            pris: pris,
            antall: 1
        });
    }

    oppdaterHandlekurv();
}


function fjernFraKurv(navn) {
    for (let i = 0; i < handlekurv.length; i++) {
        if (handlekurv[i].navn == navn) {
            handlekurv.splice(i, 1);
            break;
        }
    }

    oppdaterHandlekurv();
}


function lagreHandlekurv() {
    let lagretHandlekurv = JSON.stringify(handlekurv);
    localStorage.setItem('handlekurv', lagretHandlekurv);
}


function oppdaterHandlekurv() {
    const handlekurvElement = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');

    
    if (!handlekurvElement || !totalElement) {
        lagreHandlekurv();
        return;
    }

    handlekurvElement.innerHTML = '';

    let total = 0;

    for (let i = 0; i < handlekurv.length; i++) {
        let vare = handlekurv[i];

        let listeElement = document.createElement('li');

        listeElement.textContent = vare.navn + ' - ' + vare.pris + ' kr - ' + vare.antall;

        let fjernKnapp = document.createElement('button');

        fjernKnapp.textContent = 'Fjern';
        fjernKnapp.onclick = function() {
            fjernFraKurv(vare.navn);
        };

        listeElement.appendChild(fjernKnapp);
        handlekurvElement.appendChild(listeElement);

        total = total + (vare.pris * vare.antall);
    }

    totalElement.textContent = total + ' kr';

    lagreHandlekurv();
}


document.addEventListener('DOMContentLoaded', oppdaterHandlekurv);