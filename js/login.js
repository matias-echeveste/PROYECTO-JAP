const loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault() /* evita que no se recargue la página */
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    /* traemos la base de datos */
    const Users = JSON.parse(localStorage.getItem('users')) || []
    /* hacemos uso de un find para buscar la contraseña y correo en la base de datos, en el caso de que coincidan, quiere decir que se logueó correctamente el usuario y le damos acceso */
    const validUser = Users.find(user => user.email === email && user.password === password)
    if(!validUser){ /* en caso de que salga undefined, quiere decir que el suario ingresó mal el correo o la contraseña */
        return alert('Usuario y/o contraseña incorrectos!') /* con el return se sale de la función */
    }
    alert(`Bienvenido ${validUser.name}`)
    localStorage.setItem('login_success', JSON.stringify(validUser)) /* para poder ver que hay un usuario logueado */
    window.location.href = 'index.html'   

})