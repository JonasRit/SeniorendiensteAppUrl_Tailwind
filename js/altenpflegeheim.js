// ================================================
// KURZZEITPFLEGE-RECHNER
// Datei: js/kurzzeitpflege-rechner.js
// ================================================

document.addEventListener('DOMContentLoaded', function () {

    // Datepicker bei Klick auf gesamtes Feld öffnen
    document.querySelectorAll('input[type="date"]').forEach(function (input) {
        input.addEventListener('click', function () {
            if (this.showPicker) this.showPicker();
        });
    });

});


// Ja/Nein-Button: Restbeträge ein-/ausblenden
function zeigeRestbetrag(ja) {
    var restDiv = document.getElementById('kzp-restbetrag');
    var btnJa = document.getElementById('btn-ja');
    var btnNein = document.getElementById('btn-nein');

    var aktivKlassen = ['bg-blau', 'text-white', 'border-blau'];
    var inaktivKlassen = ['bg-white', 'text-gray-500', 'border-grau-linie'];

    if (ja) {
        restDiv.classList.remove('hidden');
        aktivKlassen.forEach(function (c) { btnJa.classList.add(c); });
        inaktivKlassen.forEach(function (c) { btnJa.classList.remove(c); });
        aktivKlassen.forEach(function (c) { btnNein.classList.remove(c); });
        inaktivKlassen.forEach(function (c) { btnNein.classList.add(c); });
    } else {
        restDiv.classList.add('hidden');
        document.getElementById('rest-kzp').value = '';
        document.getElementById('rest-verh').value = '';
        aktivKlassen.forEach(function (c) { btnNein.classList.add(c); });
        inaktivKlassen.forEach(function (c) { btnNein.classList.remove(c); });
        aktivKlassen.forEach(function (c) { btnJa.classList.remove(c); });
        inaktivKlassen.forEach(function (c) { btnJa.classList.add(c); });
    }
}


// Hauptberechnung
function berechneKurzzeitpflege() {

    // Konfigurierbare Werte
    var kzp_anspruch_max = 1774;
    var verhinderungspflege_anspruch_max = 1612;
    var unterkunft = 20.90;
    var verpflegung = 18.23;
    var investitionskosten = 11.25;
    var ausbildungs_Zuschlag = 5.10;

    var pflegesatz = { 2: 99.48, 3: 118.22, 4: 137.77, 5: 146.53 };

    var fehler = [];

    // Fehler zurücksetzen
    ['kzp-fehler-datum', 'kzp-fehler-kzp', 'kzp-fehler-verh'].forEach(function (id) {
        var el = document.getElementById(id);
        el.textContent = '';
        el.classList.add('hidden');
    });

    // Datum
    var startDatum_lang = new Date(document.getElementById('datum-von').value);
    var endDatum_lang = new Date(document.getElementById('datum-bis').value);
    var startDatum = startDatum_lang.toLocaleDateString();
    var endDatum = endDatum_lang.toLocaleDateString();
    var tage = (Math.ceil((endDatum_lang - startDatum_lang) / (1000 * 3600 * 24))) + 1;

    if (startDatum === 'Invalid Date' || endDatum === 'Invalid Date') {
        zeigeFehler('kzp-fehler-datum', 'Bitte wählen Sie ein Start- und Enddatum aus.');
        fehler.push('fehlerDatum');
    } else if (tage < 1) {
        zeigeFehler('kzp-fehler-datum', 'Bitte überprüfen Sie den Zeitraum.');
        fehler.push('fehlerTage');
    }

    // Pflegegrad
    var pflegegradRadio = document.querySelector('input[name="pflegegrad"]:checked');
    var pflegegrad = pflegegradRadio ? parseInt(pflegegradRadio.value) : 2;

    // Restbeträge
    var kzp_anspruch = parseFloat(document.getElementById('rest-kzp').value);
    var verhinderungspflege_anspruch = parseFloat(document.getElementById('rest-verh').value);
    if (isNaN(kzp_anspruch)) kzp_anspruch = kzp_anspruch_max;
    if (isNaN(verhinderungspflege_anspruch)) verhinderungspflege_anspruch = verhinderungspflege_anspruch_max;

    if (kzp_anspruch < 0) {
        zeigeFehler('kzp-fehler-kzp', 'Kurzzeitpflege-Anspruch darf nicht kleiner als 0 sein.');
        fehler.push('fehlerKZP');
    } else if (kzp_anspruch > kzp_anspruch_max) {
        zeigeFehler('kzp-fehler-kzp', 'Kurzzeitpflege-Anspruch max: ' + kzp_anspruch_max + ' €');
        fehler.push('fehlerKZP');
    }
    if (verhinderungspflege_anspruch < 0) {
        zeigeFehler('kzp-fehler-verh', 'Verhinderungspflege-Anspruch darf nicht kleiner als 0 sein.');
        fehler.push('fehlerVerh');
    } else if (verhinderungspflege_anspruch > verhinderungspflege_anspruch_max) {
        zeigeFehler('kzp-fehler-verh', 'Verhinderungspflege-Anspruch max: ' + verhinderungspflege_anspruch_max + ' €');
        fehler.push('fehlerVerh');
    }

    // Berechnung
    var pflegeBetrag_anspruch = kzp_anspruch + verhinderungspflege_anspruch;
    var pflegesatz_aktuell = pflegesatz[pflegegrad];
    var pflegesumme = pflegesatz_aktuell + ausbildungs_Zuschlag;
    var pflegesumme_gesamt = pflegesumme * tage;
    var unterkunft_gesamt = unterkunft * tage;
    var verpflegung_gesamt = verpflegung * tage;
    var investitionskosten_gesamt = investitionskosten * tage;
    var entgelt_gesamt = pflegesumme_gesamt + unterkunft_gesamt + verpflegung_gesamt + investitionskosten_gesamt;

    var pflege_zahlt, eigenPflegeanteil, zusatz_tage = 0;
    var pflekassewert = pflegeBetrag_anspruch - pflegesumme_gesamt;

    if (pflekassewert < 0) {
        pflege_zahlt = pflegeBetrag_anspruch;
        eigenPflegeanteil = pflegesumme_gesamt - pflege_zahlt;
    } else {
        pflege_zahlt = pflegesumme_gesamt;
        zusatz_tage = pflekassewert / pflegesumme;
        eigenPflegeanteil = 0;
    }

    var eigen_Betrag = entgelt_gesamt - pflege_zahlt;

    // Ergebnis anzeigen
    var ergebnisDiv = document.getElementById('kzp-ergebnis');

    if (fehler.length === 0) {
        ergebnisDiv.classList.remove('hidden');

        // Zusammenfassungs-Karten
        document.getElementById('erg-entgelt').textContent = euro(entgelt_gesamt);
        document.getElementById('erg-kasse').textContent = euro(pflege_zahlt);
        document.getElementById('erg-eigen').textContent = euro(eigen_Betrag);

        // Desktop-Tabelle
        setText('td-pflege-tage', tage + ' Tage');
        setText('td-pflege-tag', euro(pflegesumme));
        setText('td-pflege-entgelt', euro(pflegesumme_gesamt));
        setText('td-pflege-kasse', euro(pflege_zahlt));
        setText('td-pflege-eigen', euro(eigenPflegeanteil));

        setText('td-uv-tage', tage + ' Tage');
        setText('td-uv-tag', euro(unterkunft + verpflegung));
        setText('td-uv-entgelt', euro(unterkunft_gesamt + verpflegung_gesamt));
        setText('td-uv-eigen', euro(unterkunft_gesamt + verpflegung_gesamt));

        setText('td-inv-tage', tage + ' Tage');
        setText('td-inv-tag', euro(investitionskosten));
        setText('td-inv-entgelt', euro(investitionskosten_gesamt));
        setText('td-inv-eigen', euro(investitionskosten_gesamt));

        setText('td-sum-tage', '');
        setText('td-sum-tag', euro(pflegesumme + unterkunft + verpflegung + investitionskosten));
        setText('td-sum-entgelt', euro(entgelt_gesamt));
        setText('td-sum-kasse', euro(pflege_zahlt));
        setText('td-sum-eigen', euro(eigen_Betrag));

        // Mobile Karten
        var mobilCards = document.getElementById('kzp-mobil-cards');
        mobilCards.innerHTML = ''
            + mobilCard('Pflege', tage, euro(pflegesumme), euro(pflegesumme_gesamt), euro(pflege_zahlt), euro(eigenPflegeanteil), false)
            + mobilCard('Unterkunft + Verpflegung', tage, euro(unterkunft + verpflegung), euro(unterkunft_gesamt + verpflegung_gesamt), '–', euro(unterkunft_gesamt + verpflegung_gesamt), false)
            + mobilCard('Investitionskosten', tage, euro(investitionskosten), euro(investitionskosten_gesamt), '–', euro(investitionskosten_gesamt), false)
            + mobilCard('Summe', null, euro(pflegesumme + unterkunft + verpflegung + investitionskosten), euro(entgelt_gesamt), euro(pflege_zahlt), euro(eigen_Betrag), true);

        // Zusatztage
        var zusatzDiv = document.getElementById('kzp-zusatztage');
        if (Math.floor(zusatz_tage) > 0) {
            zusatzDiv.innerHTML = 'Zusätzlich stehen noch <strong>' + Math.floor(zusatz_tage) + '</strong> Tage zur Verfügung.';
            zusatzDiv.classList.remove('hidden');
        } else {
            zusatzDiv.innerHTML = '';
            zusatzDiv.classList.add('hidden');
        }

        ergebnisDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        ergebnisDiv.classList.add('hidden');
    }
}


// === Hilfsfunktionen ===

function euro(val) {
    return (Math.round(val * 100) / 100).toFixed(2) + ' €';
}

function setText(id, text) {
    document.getElementById(id).textContent = text;
}

function zeigeFehler(id, nachricht) {
    var el = document.getElementById(id);
    el.textContent = nachricht;
    el.classList.remove('hidden');
}

function mobilCard(titel, tage, tagessatz, entgelt, kasse, eigen, isSumme) {
    var wrapperClass = isSumme
        ? 'bg-blau rounded-lg p-5'
        : 'bg-white rounded-lg p-5 border border-grau-linie';

    var titelClass = isSumme
        ? 'text-white font-bold text-sm mb-3 pb-2 border-b border-white/30'
        : 'text-blau font-bold text-sm mb-3 pb-2 border-b border-grau-linie';

    var labelClass = isSumme ? 'text-white/70' : 'text-gray-500';
    var valueClass = isSumme ? 'text-white font-semibold' : 'text-gray-900 font-semibold';

    var html = '<div class="' + wrapperClass + '">';
    html += '<h4 class="' + titelClass + '">' + titel + '</h4>';
    if (tage !== null) html += mobilZeile(labelClass, valueClass, 'Tage', tage);
    html += mobilZeile(labelClass, valueClass, 'Entgelt/Tag', tagessatz);
    html += mobilZeile(labelClass, valueClass, 'Entgelt', entgelt);
    html += mobilZeile(labelClass, valueClass, 'Pflegekasse', kasse);
    html += mobilZeile(labelClass, valueClass, 'Eigenanteil', eigen);
    html += '</div>';
    return html;
}

function mobilZeile(labelClass, valueClass, label, wert) {
    return '<div class="flex justify-between py-1 text-sm">'
         + '<span class="' + labelClass + '">' + label + '</span>'
         + '<span class="' + valueClass + '">' + wert + '</span>'
         + '</div>';
}