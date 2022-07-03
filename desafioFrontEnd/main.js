document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Registration finished');
    updateTable();
    document.getElementById('table').classList.remove('d-none');
});

document.getElementById('inputFirstName').addEventListener('keyup', login);
document.getElementById('inputLastName').addEventListener('keyup', login);

try {
    document.getElementById('inputZip').addEventListener('focusout', async function (e) {
        let data = await fetch(`https://viacep.com.br/ws/${inputZip.value}/json/`);
        let zip = await data.json();

        document.getElementById('inputAddress').value = zip.logradouro;
        document.getElementById('inputComplement').value = zip.complemento;
        document.getElementById('inputDistrict').value = zip.bairro;
        document.getElementById('inputCity').value = zip.localidade;
        document.getElementById('inputState').value = zip.uf;
    });
}
catch (err) { }

function login() {
    const firstName = document.getElementById('inputFirstName').value;
    const lastName = document.getElementById('inputLastName').value;
    const login = firstName + '.' + lastName;
    document.getElementById('inputLogin').value = login.toLowerCase();
}

function updateTable() {
    document.getElementById('inputLogin').disabled = false;
    let queryString = $('#form').serializeArray();

    queryString.forEach(element => {
        if (element.name == "agreeTerms") {
            $('#gridCheck').prop('checked', false);
        }
        else if (element.name != 'radios') {
            let inputId = 'input' + capitalizeFirstLetter(element.name);

            document.getElementById(element.name).innerHTML = element.value;
            document.getElementById(inputId).value = "";
        }
    });
    document.getElementById('inputLogin').disabled = true;
    document.getElementById('radios').checked = true;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

