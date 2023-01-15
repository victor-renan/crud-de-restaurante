const senha = document.getElementById('senha');
const icons = document.getElementById('icons');

function showHide(){
    if(senha.type == 'password'){
        senha.setAttribute('type', 'text');
        icons.classList.add('hide');
    }else{
        senha.setAttribute('type', 'password');
        icons.classList.remove('hide');
    }
}
//mostrar senha!