// création des constantes ...
const nameEl = document.forms.myForm.user_name;
const prenomEl = document.forms.myForm.user_prenom;
const idEl = document.forms.myForm.user_id;
const dobEl = document.forms.myForm.user_dob;
const emailEl = document.forms.myForm.user_email;
const mdpEl = document.forms.myForm.user_mdp;
const mdpConfirmEl = document.forms.myForm.user_mdp_confirm;
const errorMess = document.querySelector('#error');
const form = document.querySelector('#submit');

// fonction pour définit les values true en false
const isRequired = (value) => (value === "" ? false : true);

// fonction pour déterminer les tailles de caratères des champs min et max 
const isBetween = (length) => length < 3 || length > 15 ? false : true;

// fonction pour rejetter des valeurs en regex afin d'éviter les piratages.
const isWordsRefuses = (name) => {
    const re = /root|deus|afpa/;
    return re.test(name);
};

// fonction pour afficher le mot de passe 
const btn = document.querySelector('#btn');
const inputPass = document.querySelector('#mp');
btn.addEventListener('click', () => {
    inputPass.type = inputPass.type === 'password' ? 'text' : 'password';
});

// fonction pour afficher le mot de passe  de confirmation
const btn1 = document.querySelector('#btn1');
const inputPass1 = document.querySelector('#mdp');
btn1.addEventListener('click', () => {
    inputPass1.type = inputPass1.type === 'password' ? 'text' : 'password';
});

// conditions pour le nom en fonction
const checkName = () => {
    let valid = false;
    let name = nameEl.value.trim().toLowerCase();
    if (!isRequired(name)) {
        errorMess.innerHTML += " le nom ne peut être vide !";
    } else if (!isBetween(name.length) || isWordsRefuses(name)) {
        errorMess.innerHTML += " le nom doit faire minimum 3 caractères et maximum 10 et vous ne pouvez pas utiliser les noms root, deus, afpa !";
    } else {
        valid = true;
    }
    return valid;
};

// fonction pour vérifier la validité du prénom 
const checkPrenom = () => {
    let valid = false;
    let prenom = prenomEl.value.trim().toLowerCase();
    if (!isRequired(prenom)) {
        errorMess.innerHTML += " le prénom ne peut être vide !";
    } else if (!isBetween(prenom.length) || isWordsRefuses(prenom)) {
        errorMess.innerHTML += " le prénom doit faire minimum 3 caractères et maximum 10 et vous ne pouvez pas utiliser les prénoms root, deus, afpa !";
    } else {
        valid = true;
    }
    return valid;
};

// focntion de vérification pour le nom d'utilisateur 
const checkUser_id = () => {
    let valid = false;
    let user_id = idEl.value.trim().toLowerCase();
    if (!isRequired(user_id)) {
        errorMess.innerHTML += " le nom d'utilisateur ne peut être vide !";
    } else if (!isBetween(user_id.length) || isWordsRefuses(user_id)) {
        errorMess.innerHTML += " le nom d'utilisateur dois faire minimum 3 caractères et maximum 10 et vous ne pouvez pas utiliser les mots root, deus, afpa !";
    } else {
        valid = true;
    }
    return valid;
};

// fonction pour vérifier l'age de l'utilisateur
const checkAge = () => {
    // passage de la fonction en false pour la faire passer en valid une fois les conditions remplises 
    let valid = false;
    let dob = dobEl.value.trim();

    // génération de la date actuelle
    let dateNow = new Date();

    // récupération des valeurs de date
    let yearsNow = dateNow.getFullYear();
    let monthNow = dateNow.getMonth() + 1;
    let dayNow = dateNow.getDate();
    let dobSplit = dob.split('-');

    // récupération des valeurs de date dans le tableau
    let dobYear = dobSplit[0];
    let dobMonth = dobSplit[1];
    let dobDay = dobSplit[2];

    // différences entre la date d'aujourd'hui et date de naissance
    let diffYear = yearsNow - dobYear;
    let diffMonth = monthNow - dobMonth;
    let diffDay = dayNow - dobDay;

    // conditions pour l'age de 18 ans 
    if (!isRequired(dob)) {
        errorMess.innerHTML += " Vous devez entrer une date de naissance !";
    }
    else if (diffYear > 18 || diffYear == 18 && (diffMonth > 0 || diffMonth == 0 && diffDay >= 0)) {
        errorMess.innerHTML += " Ok vous avez 18 ans !";
        valid = true;
    }
    else {
        errorMess.innerHTML += " Vous n\'avez pas 18 ans !";
    };

};

// check du paramètre mot de passe 
const checkMdp = () => {
    //récupération de la valeur et passage en false pour vérification
    let valid = false;
    let motDePasse = mdpEl.value.trim();

    //condition pour la valeur vide 
    if (!isRequired(motDePasse)) {
        errorMess.innerHTML += " Le mot de passe ne peut être vide !";
    } else if (isWordsRefuses(motDePasse)) {
        errorMess.innerHTML += " Vous ne pouvez pas utiliser les mots root, deus, afpa !";
    } else {
        valid = true;
    }
    return valid;
};

// check la confirmation du mot de passe et la similarité avec le mdp

const checkMdpConfirm = () => {
    //récupération de la valeur et passage en false pour vérification
    let valid = false;
    let motDePasseConfirm = mdpConfirmEl.value.trim();
    let motDePasse = mdpEl.value.trim();

    //condition pour la valeur similaire à mdp 
    if (!isRequired(motDePasseConfirm)) {
        errorMess.innerHTML += " La confirmation du mot de passe ne peut être vide !";
    } else if ((motDePasseConfirm !== motDePasse)) {
        errorMess.innerHTML += " La confirmation du mot de passe n'est pas similaire au mot de passe initial !";
    } else {
        valid = true;
    }
    return valid;
};

// appel de l'evennement avec addeventlistener
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isNameValid = checkName(),
        isAgeValid = checkAge(),
        isPrenomValid = checkPrenom(),
        isUserValid = checkUser_id(),
        isMdpValid = checkMdp(),
        isMdpConfirmValid = checkMdpConfirm();
    let isFormValid = isNameValid && isAgeValid && isPrenomValid && isUserValid && isMdpValid && isMdpConfirmValid;
    if (isFormValid) {
        console.log("vous avez gagné!");
    }
});