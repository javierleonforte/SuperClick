function es() {
    // Variables de la funcion introduccion()
    let botonJugar = document.querySelector('.boton-jugar');

    function introduction() {
        // Botón para iniciar el juego.
        botonJugar.textContent = '¡Jugar!';
    }
    
    
    // Variables de la funcion game()
    let cambiarIdioma = document.createElement('button');
    let saveButton = document.createElement('button');
    let loadButton = document.createElement('button');
    let menuButton = document.createElement('div');
    let firstLine = document.createElement('span');
    let secondLine = document.createElement('span');
    let thirdLine = document.createElement('span');
    let divFlexGame = document.createElement('div');
    let cartelPuntaje = document.createElement('span');
    let payo = document.createElement('img');
    let divItems = document.createElement('div');
    let item1 = document.createElement('div');
    let iconoItem1 = document.createElement('img');
    let nombreItem1 = document.createElement('p');
    let costoItem1 = document.createElement('p');
    let item2 = document.createElement('div');
    let iconoItem2 = document.createElement('img');
    let nombreItem2 = document.createElement('p');
    let nivelItem2 = document.createElement('p');
    let costoItem2 = document.createElement('p');
    let item3 = document.createElement('div');
    let iconoItem3 = document.createElement('img');
    let nombreItem3 = document.createElement('p');
    let nivelItem3 = document.createElement('p');
    let costoItem3 = document.createElement('p');
    let item4 = document.createElement('div');
    let iconoItem4 = document.createElement('img');
    let nombreItem4 = document.createElement('p');
    let nivelItem4 = document.createElement('p');
    let costoItem4 = document.createElement('p');
    let autoClickButton = document.createElement('button');
    let autoClickImg = document.createElement('img');
    let error = document.createElement('span');
    let puntos = 0;

    // Variables del item Cruz
    let costoCruz = 5000;
    let startInterval = false;
    let item1Comprado = false;
    let menuDesplegado = false;

    // Variables del item Matadero
    let matadero = 0;
    let contMatadero = 0; // Contador auxiliar para saber cuando aumentar el costo del item
    let costoMatadero = 100;
    let nivelContItem2 = 0;
    let incrementoMatadero = 0;
    let clicksMatadero = 1;

    // Variables del item Granja
    let granja = 0;
    let contGranja = 0; // Contador auxiliar para saber cuando aumentar el costo del item
    let costoGranja = 500;
    let nivelContItem3 = 0;
    let incrementoGranja = 0;
    let clicksGranja = 5;

    // Variables del item Fabrica
    let fabrica = 0;
    let contFabrica = 0; // Contador auxiliar para saber cuando aumentar el costo del item
    let costoFabrica = 1500;
    let nivelContItem4 = 0;
    let incrementoFabrica = 0;
    let clicksFabrica = 10;

    let incrementoTotal = 1; // Incremento inicial es 1 (Sin items comprados)
    
    function game() {

        // Botón para cambiar el idioma
        cambiarIdioma.textContent = 'Cambiar Idioma';
        cambiarIdioma.setAttribute("class", "boton-idioma");
        document.body.appendChild(cambiarIdioma);
    
        // Botón para guardar el puntaje
        saveButton.textContent = 'Guardar';
        saveButton.setAttribute("class", "boton-game");
        document.body.appendChild(saveButton);
    
        // Botón para cargar el puntaje
        loadButton.textContent = 'Cargar';
        loadButton.setAttribute("class", "boton-game");
        document.body.appendChild(loadButton);

        // Boton para abrir el menú
        menuButton.setAttribute("class", "menu-btn");
        document.body.appendChild(menuButton);

        firstLine.setAttribute("class", "lines");
        menuButton.appendChild(firstLine);

        secondLine.setAttribute("class", "lines");
        menuButton.appendChild(secondLine);

        thirdLine.setAttribute("class", "lines");
        menuButton.appendChild(thirdLine);

        // Botón para parar o reanudar el autoclick
        autoClickButton.setAttribute("class", "boton-autoclick");
        autoClickButton.classList.add('item-disabled');
        document.body.appendChild(autoClickButton);

        autoClickImg.setAttribute("src", "./img/autoclickTrue.png");
        autoClickImg.setAttribute("class", "autoclick");
        autoClickImg.setAttribute("alt", "Autoclick");
        autoClickImg.setAttribute("draggable", "false");
        autoClickButton.appendChild(autoClickImg);

        if (item1Comprado) {
            autoClickButton.classList.remove('item-disabled');
        }

        autoClickButton.addEventListener("click", function() {
            if (startInterval) {
                detenerCruz();
                autoClickImg.src = "./img/autoclickFalse.png";
            }
            else {
                empezarCruz();
                autoClickImg.src = "./img/autoclickTrue.png";
            }
        });

        let intervalo;
                function empezarCruz() {
                        startInterval = true;
                        intervalo = setInterval(() => {
                        puntos++;
                        cartelPuntaje.textContent = puntos;
                    }, 1000)
                }

                function detenerCruz() {
                    clearInterval(intervalo);
                    intervalo = null;
                    startInterval = false;
                }

    
        // Div para posicionar a Payo
        divFlexGame.setAttribute("class", "flex-container");
        document.body.appendChild(divFlexGame);
    
        // Crea el nodo del puntaje
        cartelPuntaje.setAttribute("class", "puntaje");
        divFlexGame.appendChild(cartelPuntaje);
        cartelPuntaje.textContent = "¡Clickeame!";
    
        // Crea el nodo del Payo
        payo.setAttribute("class", "payo");
        payo.setAttribute("src", "./img/payoV1.png");
        payo.setAttribute("alt", "Payo");
        payo.setAttribute("draggable", "false");
        divFlexGame.appendChild(payo);
        
        // Guarda el puntaje en el Local Storage al apretar el botón Guardar.
        saveButton.addEventListener('click', function() {
            let nombre = prompt("Ingrese su nombre:");
            let datosJuego = {
                puntos: puntos,
                nivelMatadero: nivelContItem2,
                costoMatadero: costoMatadero,
                nivelGranja: nivelContItem3,
                costoGranja: costoGranja,
                nivelFabrica: nivelContItem4,
                costoFabrica: costoFabrica,
                incrementoTotal: incrementoTotal,
                autoclickActivo: startInterval,
                item1Comprado: item1Comprado,
                divItems: divFlexGame
            };
            localStorage.setItem(nombre, JSON.stringify(datosJuego));
            error.style.color = 'lightgreen';
            error.style.left = '43%'
            errorMessage(`¡Datos de ${nombre} guardado!`);
        });
        
        // Carga el puntaje al apretar el botón Cargar.
        loadButton.addEventListener('click', function() {
            let nombre = prompt("Ingrese su nombre:");
            let datosGuardados = localStorage.getItem(nombre);
            if (datosGuardados) {
                let datosJuego = JSON.parse(datosGuardados);
                puntos = datosJuego.puntos;
                nivelContItem2 = datosJuego.nivelMatadero;
                costoMatadero = datosJuego.costoMatadero;
                nivelContItem3 = datosJuego.nivelGranja;
                costoGranja = datosJuego.costoGranja;
                nivelContItem4 = datosJuego.nivelFabrica;
                costoFabrica = datosJuego.costoFabrica;
                item1Comprado = datosJuego.item1Comprado;
                startInterval = datosJuego.autoclickActivo;
                if (startInterval) {
                    autoClickButton.classList.remove('item-disabled');
                    detenerCruz();
                    empezarCruz();
                }
                else {
                    autoClickButton.classList.add('item-disabled');
                    detenerCruz();
                }
                
                incrementoTotal = datosJuego.incrementoTotal;
                cartelPuntaje.textContent = puntos;
                if (menuDesplegado) {
                    document.body.removeChild(divItems);
                    menuButton.classList.toggle('active');
                }
                error.style.color = 'lightgreen';
                error.style.left = '43%'
                errorMessage(`¡Datos de ${nombre} cargados!`);
            } else {
                error.style.color = 'red';
                error.style.left = '41%'
                errorMessage(`No hay puntaje guardado para ${nombre}`);
            }
        });

        // Cambia el idioma al apretar el botón Cambiar Idioma.
        let presionado = true;
        let esButton;
        let enButton;
        cambiarIdioma.addEventListener('click', function() {
            if (presionado) {
                esButton = document.createElement('button');
                esButton.textContent = 'Español';
                esButton.setAttribute("class", "leng-btn");
                document.body.appendChild(esButton);

                enButton = document.createElement('button');
                enButton.textContent = 'English';
                enButton.setAttribute("class", "leng-btn");
                document.body.appendChild(enButton);

                cambiarIdioma.classList.add('item-disabled');
                setTimeout(() => {
                    cambiarIdioma.classList.remove('item-disabled');
                }, 500);

                esButton.addEventListener('click', function() {
                    error.style.color = 'red';
                    error.style.left = '40%'
                    errorMessage('Ya está seleccionado este idioma.');
                    document.body.removeChild(esButton);
                    document.body.removeChild(enButton);
                    presionado = true;
                });
    
                enButton.addEventListener('click', function() {
                    localStorage.setItem('idioma','en');
                    error.style.color = 'lightgreen';
                    error.style.left = '41%'
                    errorMessage('Language changed to English.');
                    setTimeout(() => {
                        document.body.removeChild(esButton);
                        document.body.removeChild(enButton);
                        presionado = true;
                        location.reload();
                    }, 500);
                    
                });

                presionado = false;
            }
            else {
                esButton.style.animation = 'desplazarIdiomasAtras .5s forwards';
                enButton.style.animation = 'desplazarIdiomasAtras .5s forwards';
                cambiarIdioma.classList.add('item-disabled');
                setTimeout(() => {
                    esButton.style.display = 'none';
                    enButton.style.display = 'none';
                    cambiarIdioma.classList.remove('item-disabled');
                }, 500);
                presionado = true;
            }
            
        });
        
        // Efecto hamburguesa al presionar el boton menú, y desplegar el menú
        menuButton.addEventListener('click', () => {
            menuButton.classList.toggle('active');
            menuButton.style.zIndex = 1;
            menuDesplegado = true;

            if (menuButton.classList.contains('active') && menuDesplegado) {
                menuButton.classList.add('item-disabled');
                setTimeout(() => {
                    menuButton.classList.remove('item-disabled');
                }, 500);

                // Div que se despliega junto a los items al apretar el boton menú
                divItems = document.createElement('div');
                divItems.setAttribute("class", "div-items");
                document.body.appendChild(divItems);
                
                // Primer item
                item1.setAttribute("class", "items-container");
                item1.setAttribute("id", "item1");
                divItems.appendChild(item1);
                if (item1Comprado) {
                    item1.classList.add('item-disabled');
                }

                iconoItem1.setAttribute("class", "icono-items");
                iconoItem1.setAttribute("src", "./img/iconoItem1.png");
                iconoItem1.setAttribute("alt", "invert cross in the sky");
                iconoItem1.setAttribute("draggable", "false");
                iconoItem1.setAttribute("onclick", "document.getElementById('item1').click()");
                item1.appendChild(iconoItem1);

                nombreItem1.textContent = 'Cruz invertida en el cielo AUTOCLICKS';
                nombreItem1.setAttribute("class", "nombre-items");
                nombreItem1.setAttribute("onclick", "document.getElementById('item1').click()");
                item1.appendChild(nombreItem1);

                costoItem1.textContent = `Costo: ${costoCruz} CLICKS`;
                costoItem1.setAttribute("class", "costo-items");
                costoItem1.setAttribute("onclick", "document.getElementById('item1').click()");
                item1.appendChild(costoItem1);

                // Si compro algun item con los puntos disponibles, entonces suma 1 al contador del item y agrega los clicks que suma ese item a cada click dado
                item1.addEventListener("click", manejarClickItem);

                
                // Segundo item
                item2.setAttribute("class", "items-container");
                item2.setAttribute("id", "item2");
                divItems.appendChild(item2);

                iconoItem2.setAttribute("class", "icono-items");
                iconoItem2.setAttribute("src", "./img/iconoItem2.png");
                iconoItem2.setAttribute("alt", "humans slaughterhouse");
                iconoItem2.setAttribute("draggable", "false");
                iconoItem2.setAttribute("onclick", "document.getElementById('item2').click()");
                item2.appendChild(iconoItem2);

                nombreItem2.textContent = `Matadero de humanos +${clicksMatadero} CLICKS`;
                nombreItem2.setAttribute("class", "nombre-items");
                nombreItem2.setAttribute("onclick", "document.getElementById('item2').click()");
                item2.appendChild(nombreItem2);

                nivelItem2.textContent = `Nivel: ${nivelContItem2}`;
                nivelItem2.setAttribute("class", "nombre-items");
                nivelItem2.setAttribute("onclick", "document.getElementById('item2').click()");
                item2.appendChild(nivelItem2);

                costoItem2.textContent = `Costo: ${costoMatadero} CLICKS`;
                costoItem2.setAttribute("class", "costo-items");
                costoItem2.setAttribute("onclick", "document.getElementById('item2').click()");
                item2.appendChild(costoItem2);

                // Si compro algun item con los puntos disponibles, entonces suma 1 al contador del item y agrega los clicks que suma ese item a cada click dado
                item2.addEventListener('click', manejarClickItem);

                
                // Tercer item
                item3.setAttribute("class", "items-container");
                item3.setAttribute("id", "item3");
                divItems.appendChild(item3);

                iconoItem3.setAttribute("class", "icono-items");
                iconoItem3.setAttribute("src", "./img/iconoItem3.png");
                iconoItem3.setAttribute("alt", "blood farm");
                iconoItem3.setAttribute("draggable", "false");
                iconoItem3.setAttribute("onclick", "document.getElementById('item3').click()");
                item3.appendChild(iconoItem3);

                nombreItem3.textContent = `Granja sangrienta +${clicksGranja} CLICKS`;
                nombreItem3.setAttribute("class", "nombre-items");
                nombreItem3.setAttribute("onclick", "document.getElementById('item3').click()");
                item3.appendChild(nombreItem3);

                nivelItem3.textContent = `Nivel: ${nivelContItem3}`;
                nivelItem3.setAttribute("class", "nombre-items");
                nivelItem3.setAttribute("onclick", "document.getElementById('item3').click()");
                item3.appendChild(nivelItem3);

                costoItem3.textContent = `Costo: ${costoGranja} CLICKS`;
                costoItem3.setAttribute("class", "costo-items");
                costoItem3.setAttribute("onclick", "document.getElementById('item3').click()");
                item3.appendChild(costoItem3);

                // Si compro algun item con los puntos disponibles, entonces suma 1 al contador del item y agrega los clicks que suma ese item a cada click dado
                item3.addEventListener('click', manejarClickItem);


                // Cuarto item
                item4.setAttribute("class", "items-container");
                item4.setAttribute("id", "item4");
                divItems.appendChild(item4);

                iconoItem4.setAttribute("class", "icono-items");
                iconoItem4.setAttribute("src", "./img/iconoItem4.png");
                iconoItem4.setAttribute("alt", "humans factory");
                iconoItem4.setAttribute("draggable", "false");
                iconoItem4.setAttribute("onclick", "document.getElementById('item4').click()");
                item4.appendChild(iconoItem4);

                nombreItem4.textContent = `Fábrica de humanos +${clicksFabrica} CLICKS`;
                nombreItem4.setAttribute("class", "nombre-items");
                nombreItem4.setAttribute("onclick", "document.getElementById('item4').click()");
                item4.appendChild(nombreItem4);

                nivelItem4.textContent = `Nivel: ${nivelContItem4}`;
                nivelItem4.setAttribute("class", "nombre-items");
                nivelItem4.setAttribute("onclick", "document.getElementById('item4').click()");
                item4.appendChild(nivelItem4);

                costoItem4.textContent = `Costo: ${costoFabrica} CLICKS`;
                costoItem4.setAttribute("class", "costo-items");
                costoItem4.setAttribute("onclick", "document.getElementById('item4').click()");
                item4.appendChild(costoItem4);

                // Si compro algun item con los puntos disponibles, entonces suma 1 al contador del item y agrega los clicks que suma ese item a cada click dado
                item4.addEventListener('click', manejarClickItem);

            }
            else {
                divItems.style.animation = 'desplazarMenuAtras .3s forwards';
                menuButton.classList.add('item-disabled');
                setTimeout(() => {
                    divItems.style.display = 'none';
                    menuButton.classList.remove('item-disabled');
                }, 300);
                menuDesplegado = false;
            }
        });

        function manejarClickItem(event) {
            const item = event.target;
            const itemId = item.id;

            switch (itemId) {
                case 'item1':
                    if (puntos >= costoCruz) {
                        puntos -= costoCruz;
                        cartelPuntaje.textContent = puntos;
                        empezarCruz();
                        item1.classList.add('item-disabled');
                        autoClickButton.classList.remove('item-disabled');
                        item1Comprado = true;
                    }
                    else {
                        error.style.color = 'red';
                        error.style.left = '35%';
                        errorMessage('No tienes puntos suficientes para comprar este item.');
                    }
                    break;
                case 'item2':
                    if (puntos >= costoMatadero) {
                        puntos -= costoMatadero;
                        cartelPuntaje.textContent = puntos;
                        matadero++;
                        incrementoMatadero += clicksMatadero;
                        actualizarIncremento(); // Actualiza el incremento total
                        if (matadero > contMatadero) {
                            costoMatadero *= 2; // Multiplica el costo por 2 por cada vez que es comprado
                            costoItem2.textContent = `Costo: ${costoMatadero} CLICKS` // Actualiza en pantalla el costo del item
                            nivelContItem2++;
                            nivelItem2.textContent = `Nivel: ${nivelContItem2}`
                            contMatadero++;
                        }
                    }
                    else {
                        error.style.color = 'red';
                        error.style.left = '35%';
                        errorMessage('No tienes puntos suficientes para comprar este item.');
                    }
                    break;
                case 'item3':
                    if (puntos >= costoGranja) {
                        puntos -= costoGranja;
                        cartelPuntaje.textContent = puntos;
                        granja++;
                        incrementoGranja += clicksGranja;
                        actualizarIncremento(); // Actualiza el incremento total
                        if (granja > contGranja) {
                            costoGranja *= 2; // Multiplica el costo por 2 por cada vez que es comprado
                            costoItem3.textContent = `Costo: ${costoGranja} CLICKS` // Actualiza en pantalla el costo del item
                            nivelContItem3++;
                            nivelItem3.textContent = `Nivel: ${nivelContItem3}`
                            contGranja++;
                        }
                    }
                    else {
                        error.style.color = 'red';
                        error.style.left = '35%';
                        errorMessage('No tienes puntos suficientes para comprar este item.');
                    }
                    break;
                case 'item4':
                    if (puntos >= costoFabrica) {
                        puntos -= costoFabrica;
                        cartelPuntaje.textContent = puntos;
                        fabrica++;
                        incrementoFabrica += clicksFabrica;
                        actualizarIncremento(); // Actualiza el incremento total
                        if (fabrica > contFabrica) {
                            costoFabrica *= 2; // Multiplica el costo por 2 por cada vez que es comprado
                            costoItem4.textContent = `Costo: ${costoFabrica} CLICKS` // Actualiza en pantalla el costo del item
                            nivelContItem4++;
                            nivelItem4.textContent = `Nivel: ${nivelContItem4}`
                            contFabrica++;
                        }
                    }
                    else {
                        error.style.color = 'red';
                        error.style.left = '35%';
                        errorMessage('No tienes puntos suficientes para comprar este item.');
                    }
                    break;
            }
        }

        function actualizarIncremento() {
            incrementoTotal = 1 + incrementoMatadero + incrementoGranja + incrementoFabrica;
        }

        function errorMessage(message) {
            error.setAttribute("class", "error");
            error.textContent = message;
            document.body.appendChild(error);
        }



        // Suma 1 punto por cada click que reciba Payo.
        payo.addEventListener('click', function(){
            puntos += incrementoTotal;
            cartelPuntaje.textContent = puntos;
            console.log('Puntos actuales: ', puntos);

            if (puntos < 500) {
                document.body.style.backgroundImage = "url('./img/fondo.png')";
            }
            if (puntos >= 500 && puntos < 1000) {
                document.body.style.backgroundImage = "url('./img/fondoSegundo.png')";
                payo.setAttribute('src', './img/payoV2.png');
            }
            if (puntos >= 1000 && puntos < 3000) {
                document.body.style.backgroundImage = "url('./img/fondoTercero.png')";
                payo.setAttribute('src', './img/payoV3.png');
            }
            if (puntos >= 5000) {
                document.body.style.backgroundImage = "url('./img/fondoCuarto.png')";
                payo.setAttribute('src', './img/payoV4.png');
            }
        });
    }
    
    // Limpia la pantalla principal para poder crear la pantalla del juego.
    function limpiarScreen() {
        let element = document.querySelector('.flex-container');
        element.parentNode.removeChild(element);
    
        let title = document.querySelector('.titulo-principal');
        title.parentNode.removeChild(title);
    }
    
    // Inicia la pantalla principal
    introduction();
    
    // Si presionan el boton "Jugar!" se limpiará la pantalla principal y cargará el juego.
    botonJugar.addEventListener('click', function() {
        limpiarScreen();
        game();
    });
}

function en() {
    // Variables de la funcion introduccion()
    let botonJugar = document.querySelector('.boton-jugar');

    function introduction() {
        // Botón para iniciar el juego.
        botonJugar.textContent = 'Play!';
    }
    
    // Variables de la funcion game()
    let cambiarIdioma = document.createElement('button');
    let saveButton = document.createElement('button');
    let loadButton = document.createElement('button');
    let menuButton = document.createElement('div');
    let firstLine = document.createElement('span');
    let secondLine = document.createElement('span');
    let thirdLine = document.createElement('span');
    let divFlexGame = document.createElement('div');
    let cartelPuntaje = document.createElement('span');
    let payo = document.createElement('img');
    let divItems = document.createElement('div');
    let item1 = document.createElement('div');
    let iconoItem1 = document.createElement('img');
    let nombreItem1 = document.createElement('p');
    let costoItem1 = document.createElement('p');
    let item2 = document.createElement('div');
    let iconoItem2 = document.createElement('img');
    let nombreItem2 = document.createElement('p');
    let nivelItem2 = document.createElement('p');
    let costoItem2 = document.createElement('p');
    let item3 = document.createElement('div');
    let iconoItem3 = document.createElement('img');
    let nombreItem3 = document.createElement('p');
    let nivelItem3 = document.createElement('p');
    let costoItem3 = document.createElement('p');
    let item4 = document.createElement('div');
    let iconoItem4 = document.createElement('img');
    let nombreItem4 = document.createElement('p');
    let nivelItem4 = document.createElement('p');
    let costoItem4 = document.createElement('p');
    let autoClickButton = document.createElement('button');
    let autoClickImg = document.createElement('img');
    let error = document.createElement('span');
    let puntos = 0;
    // Variables del item Cruz
    let costoCruz = 5000;
    let startInterval = false;
    let item1Comprado = false;
    let menuDesplegado = false;
    // Variables del item Matadero
    let matadero = 0;
    let contMatadero = 0; // Contador auxiliar para saber cuando aumentar el costo del item
    let costoMatadero = 100;
    let nivelContItem2 = 0;
    let incrementoMatadero = 0;
    let clicksMatadero = 1;
    // Variables del item Granja
    let granja = 0;
    let contGranja = 0; // Contador auxiliar para saber cuando aumentar el costo del item
    let costoGranja = 500;
    let nivelContItem3 = 0;
    let incrementoGranja = 0;
    let clicksGranja = 5;
    // Variables del item Fabrica
    let fabrica = 0;
    let contFabrica = 0; // Contador auxiliar para saber cuando aumentar el costo del item
    let costoFabrica = 1500;
    let nivelContItem4 = 0;
    let incrementoFabrica = 0;
    let clicksFabrica = 10;

    let incrementoTotal = 1; // Incremento inicial es 1 (Sin items comprados)
    
    function game() {

        // Botón para cambiar el idioma
        cambiarIdioma.textContent = 'Change Language';
        cambiarIdioma.setAttribute("class", "boton-idioma");
        document.body.appendChild(cambiarIdioma);
    
        // Botón para guardar el puntaje
        saveButton.textContent = 'Save';
        saveButton.setAttribute("class", "boton-game");
        document.body.appendChild(saveButton);
    
        // Botón para cargar el puntaje
        loadButton.textContent = 'Load';
        loadButton.setAttribute("class", "boton-game");
        document.body.appendChild(loadButton);

        // Boton para abrir el menú
        menuButton.setAttribute("class", "menu-btn");
        document.body.appendChild(menuButton);

        firstLine.setAttribute("class", "lines");
        menuButton.appendChild(firstLine);

        secondLine.setAttribute("class", "lines");
        menuButton.appendChild(secondLine);

        thirdLine.setAttribute("class", "lines");
        menuButton.appendChild(thirdLine);

        // Botón para parar o reanudar el autoclick
        autoClickButton.setAttribute("class", "boton-autoclick");
        autoClickButton.classList.add('item-disabled');
        document.body.appendChild(autoClickButton);

        autoClickImg.setAttribute("src", "./img/autoclickTrue.png");
        autoClickImg.setAttribute("class", "autoclick");
        autoClickImg.setAttribute("alt", "Autoclick");
        autoClickImg.setAttribute("draggable", "false");
        autoClickButton.appendChild(autoClickImg);

        if (item1Comprado) {
            autoClickButton.classList.remove('item-disabled');
        }

        autoClickButton.addEventListener("click", function() {
            if (startInterval) {
                detenerCruz();
                autoClickImg.src = "./img/autoclickFalse.png";
            }
            else {
                empezarCruz();
                autoClickImg.src = "./img/autoclickTrue.png";
            }
        });

        let intervalo;
                function empezarCruz() {
                        startInterval = true;
                        intervalo = setInterval(() => {
                        puntos++;
                        cartelPuntaje.textContent = puntos;
                    }, 1000)
                }

                function detenerCruz() {
                    clearInterval(intervalo);
                    intervalo = null;
                    startInterval = false;
                }

    
        // Div para posicionar a Payo
        divFlexGame.setAttribute("class", "flex-container");
        document.body.appendChild(divFlexGame);
    
        // Crea el nodo del puntaje
        cartelPuntaje.setAttribute("class", "puntaje");
        divFlexGame.appendChild(cartelPuntaje);
        cartelPuntaje.textContent = "¡Click me!";
    
        // Crea el nodo del Payo
        payo.setAttribute("class", "payo");
        payo.setAttribute("src", "./img/payoV1.png");
        payo.setAttribute("alt", "Payo");
        payo.setAttribute("draggable", "false");
        divFlexGame.appendChild(payo);
        
        // Guarda el puntaje en el Local Storage al apretar el botón Guardar.
        saveButton.addEventListener('click', function() {
            let nombre = prompt("Ingrese su nombre:");
            let datosJuego = {
                puntos: puntos,
                nivelMatadero: nivelContItem2,
                costoMatadero: costoMatadero,
                nivelGranja: nivelContItem3,
                costoGranja: costoGranja,
                nivelFabrica: nivelContItem4,
                costoFabrica: costoFabrica,
                incrementoTotal: incrementoTotal,
                autoclickActivo: startInterval,
                item1Comprado: item1Comprado,
                divItems: divFlexGame
            };
            localStorage.setItem(nombre, JSON.stringify(datosJuego));
            error.style.color = 'lightgreen';
            error.style.left = '43%'
            errorMessage(`${nombre} data saved!`);
        });
        
        // Carga el puntaje al apretar el botón Cargar.
        loadButton.addEventListener('click', function() {
            let nombre = prompt("Enter your name:");
            let datosGuardados = localStorage.getItem(nombre);
            if (datosGuardados) {
                let datosJuego = JSON.parse(datosGuardados);
                puntos = datosJuego.puntos;
                nivelContItem2 = datosJuego.nivelMatadero;
                costoMatadero = datosJuego.costoMatadero;
                nivelContItem3 = datosJuego.nivelGranja;
                costoGranja = datosJuego.costoGranja;
                nivelContItem4 = datosJuego.nivelFabrica;
                costoFabrica = datosJuego.costoFabrica;
                item1Comprado = datosJuego.item1Comprado;
                startInterval = datosJuego.autoclickActivo;
                if (startInterval) {
                    autoClickButton.classList.remove('item-disabled');
                    detenerCruz();
                    empezarCruz();
                }
                else {
                    autoClickButton.classList.add('item-disabled');
                    detenerCruz();
                }
                
                incrementoTotal = datosJuego.incrementoTotal;
                cartelPuntaje.textContent = puntos;
                if (menuDesplegado) {
                    document.body.removeChild(divItems);
                    menuButton.classList.toggle('active');
                }
                error.style.color = 'lightgreen';
                error.style.left = '43%'
                errorMessage(`${nombre} data loaded!`);
            } else {
                error.style.color = 'red';
                error.style.left = '41%'
                errorMessage(`No score saved for ${nombre}`);
            }
        });

        // Cambia el idioma al apretar el botón Cambiar Idioma.
        let presionado = true;
        let esButton;
        let enButton;
        cambiarIdioma.addEventListener('click', function() {
            if (presionado) {
                esButton = document.createElement('button');
                esButton.textContent = 'Español';
                esButton.setAttribute("class", "leng-btn");
                document.body.appendChild(esButton);

                enButton = document.createElement('button');
                enButton.textContent = 'English';
                enButton.setAttribute("class", "leng-btn");
                document.body.appendChild(enButton);

                cambiarIdioma.classList.add('item-disabled');
                setTimeout(() => {
                    cambiarIdioma.classList.remove('item-disabled');
                }, 500);

                enButton.addEventListener('click', function() {
                    error.style.color = 'red';
                    error.style.left = '40%'
                    errorMessage('This language is already selected.');
                    document.body.removeChild(esButton);
                    document.body.removeChild(enButton);
                    presionado = true;
                });
    
                esButton.addEventListener('click', function() {
                    localStorage.setItem('idioma','es');
                    error.style.color = 'lightgreen';
                    error.style.left = '41%'
                    errorMessage('Lenguaje cambiado a Español.');
                    setTimeout(() => {
                        document.body.removeChild(esButton);
                        document.body.removeChild(enButton);
                        presionado = true;
                        location.reload();
                    }, 500);
                    
                });

                presionado = false;
            }
            else {
                esButton.style.animation = 'desplazarIdiomasAtras .5s forwards';
                enButton.style.animation = 'desplazarIdiomasAtras .5s forwards';
                cambiarIdioma.classList.add('item-disabled');
                setTimeout(() => {
                    esButton.style.display = 'none';
                    enButton.style.display = 'none';
                    cambiarIdioma.classList.remove('item-disabled');
                }, 500);
                presionado = true;
            }
            
        });
        
        // Efecto hamburguesa al presionar el boton menú, y desplegar el menú
        menuButton.addEventListener('click', () => {
            menuButton.classList.toggle('active');
            menuButton.style.zIndex = 1;
            menuDesplegado = true;

            if (menuButton.classList.contains('active') && menuDesplegado) {
                menuButton.classList.add('item-disabled');
                setTimeout(() => {
                    menuButton.classList.remove('item-disabled');
                }, 500);

                // Div que se despliega junto a los items al apretar el boton menú
                divItems = document.createElement('div');
                divItems.setAttribute("class", "div-items");
                document.body.appendChild(divItems);
                
                // Primer item
                item1.setAttribute("class", "items-container");
                item1.setAttribute("id", "item1");
                divItems.appendChild(item1);
                if (item1Comprado) {
                    item1.classList.add('item-disabled');
                }

                iconoItem1.setAttribute("class", "icono-items");
                iconoItem1.setAttribute("src", "./img/iconoItem1.png");
                iconoItem1.setAttribute("alt", "invert cross in the sky");
                iconoItem1.setAttribute("draggable", "false");
                iconoItem1.setAttribute("onclick", "document.getElementById('item1').click()");
                item1.appendChild(iconoItem1);

                nombreItem1.textContent = 'Inverted cross in the sky AUTOCLICKS';
                nombreItem1.setAttribute("class", "nombre-items");
                nombreItem1.setAttribute("onclick", "document.getElementById('item1').click()");
                item1.appendChild(nombreItem1);

                costoItem1.textContent = `Cost: ${costoCruz} CLICKS`;
                costoItem1.setAttribute("class", "costo-items");
                costoItem1.setAttribute("onclick", "document.getElementById('item1').click()");
                item1.appendChild(costoItem1);

                // Si compro algun item con los puntos disponibles, entonces suma 1 al contador del item y agrega los clicks que suma ese item a cada click dado
                item1.addEventListener("click", manejarClickItem);

                
                // Segundo item
                item2.setAttribute("class", "items-container");
                item2.setAttribute("id", "item2");
                divItems.appendChild(item2);

                iconoItem2.setAttribute("class", "icono-items");
                iconoItem2.setAttribute("src", "./img/iconoItem2.png");
                iconoItem2.setAttribute("alt", "humans slaughterhouse");
                iconoItem2.setAttribute("draggable", "false");
                iconoItem2.setAttribute("onclick", "document.getElementById('item2').click()");
                item2.appendChild(iconoItem2);

                nombreItem2.textContent = `Human slaughterhouse +${clicksMatadero} CLICKS`;
                nombreItem2.setAttribute("class", "nombre-items");
                nombreItem2.setAttribute("onclick", "document.getElementById('item2').click()");
                item2.appendChild(nombreItem2);

                nivelItem2.textContent = `Level: ${nivelContItem2}`;
                nivelItem2.setAttribute("class", "nombre-items");
                nivelItem2.setAttribute("onclick", "document.getElementById('item2').click()");
                item2.appendChild(nivelItem2);

                costoItem2.textContent = `Cost: ${costoMatadero} CLICKS`;
                costoItem2.setAttribute("class", "costo-items");
                costoItem2.setAttribute("onclick", "document.getElementById('item2').click()");
                item2.appendChild(costoItem2);

                // Si compro algun item con los puntos disponibles, entonces suma 1 al contador del item y agrega los clicks que suma ese item a cada click dado
                item2.addEventListener('click', manejarClickItem);

                
                // Tercer item
                item3.setAttribute("class", "items-container");
                item3.setAttribute("id", "item3");
                divItems.appendChild(item3);

                iconoItem3.setAttribute("class", "icono-items");
                iconoItem3.setAttribute("src", "./img/iconoItem3.png");
                iconoItem3.setAttribute("alt", "blood farm");
                iconoItem3.setAttribute("draggable", "false");
                iconoItem3.setAttribute("onclick", "document.getElementById('item3').click()");
                item3.appendChild(iconoItem3);

                nombreItem3.textContent = `Bloody farm +${clicksGranja} CLICKS`;
                nombreItem3.setAttribute("class", "nombre-items");
                nombreItem3.setAttribute("onclick", "document.getElementById('item3').click()");
                item3.appendChild(nombreItem3);

                nivelItem3.textContent = `Level: ${nivelContItem3}`;
                nivelItem3.setAttribute("class", "nombre-items");
                nivelItem3.setAttribute("onclick", "document.getElementById('item3').click()");
                item3.appendChild(nivelItem3);

                costoItem3.textContent = `Cost: ${costoGranja} CLICKS`;
                costoItem3.setAttribute("class", "costo-items");
                costoItem3.setAttribute("onclick", "document.getElementById('item3').click()");
                item3.appendChild(costoItem3);

                // Si compro algun item con los puntos disponibles, entonces suma 1 al contador del item y agrega los clicks que suma ese item a cada click dado
                item3.addEventListener('click', manejarClickItem);


                // Cuarto item
                item4.setAttribute("class", "items-container");
                item4.setAttribute("id", "item4");
                divItems.appendChild(item4);

                iconoItem4.setAttribute("class", "icono-items");
                iconoItem4.setAttribute("src", "./img/iconoItem4.png");
                iconoItem4.setAttribute("alt", "humans factory");
                iconoItem4.setAttribute("draggable", "false");
                iconoItem4.setAttribute("onclick", "document.getElementById('item4').click()");
                item4.appendChild(iconoItem4);

                nombreItem4.textContent = `Humans factory +${clicksFabrica} CLICKS`;
                nombreItem4.setAttribute("class", "nombre-items");
                nombreItem4.setAttribute("onclick", "document.getElementById('item4').click()");
                item4.appendChild(nombreItem4);

                nivelItem4.textContent = `Level: ${nivelContItem4}`;
                nivelItem4.setAttribute("class", "nombre-items");
                nivelItem4.setAttribute("onclick", "document.getElementById('item4').click()");
                item4.appendChild(nivelItem4);

                costoItem4.textContent = `Cost: ${costoFabrica} CLICKS`;
                costoItem4.setAttribute("class", "costo-items");
                costoItem4.setAttribute("onclick", "document.getElementById('item4').click()");
                item4.appendChild(costoItem4);

                // Si compro algun item con los puntos disponibles, entonces suma 1 al contador del item y agrega los clicks que suma ese item a cada click dado
                item4.addEventListener('click', manejarClickItem);

            }
            else {
                divItems.style.animation = 'desplazarMenuAtras .3s forwards';
                menuButton.classList.add('item-disabled');
                setTimeout(() => {
                    divItems.style.display = 'none';
                    menuButton.classList.remove('item-disabled');
                }, 300);
                menuDesplegado = false;
            }
        });

        function manejarClickItem(event) {
            const item = event.target;
            const itemId = item.id;

            switch (itemId) {
                case 'item1':
                    if (puntos >= costoCruz) {
                        puntos -= costoCruz;
                        cartelPuntaje.textContent = puntos;
                        empezarCruz();
                        item1.classList.add('item-disabled');
                        autoClickButton.classList.remove('item-disabled');
                        item1Comprado = true;
                    }
                    else {
                        error.style.color = 'red';
                        error.style.left = '35%';
                        errorMessage('No tienes puntos suficientes para comprar este item.');
                    }
                    break;
                case 'item2':
                    if (puntos >= costoMatadero) {
                        puntos -= costoMatadero;
                        cartelPuntaje.textContent = puntos;
                        matadero++;
                        incrementoMatadero += clicksMatadero;
                        actualizarIncremento(); // Actualiza el incremento total
                        if (matadero > contMatadero) {
                            costoMatadero *= 2; // Multiplica el costo por 2 por cada vez que es comprado
                            costoItem2.textContent = `Costo: ${costoMatadero} CLICKS` // Actualiza en pantalla el costo del item
                            nivelContItem2++;
                            nivelItem2.textContent = `Nivel: ${nivelContItem2}`
                            contMatadero++;
                        }
                    }
                    else {
                        error.style.color = 'red';
                        error.style.left = '35%';
                        errorMessage('No tienes puntos suficientes para comprar este item.');
                    }
                    break;
                case 'item3':
                    if (puntos >= costoGranja) {
                        puntos -= costoGranja;
                        cartelPuntaje.textContent = puntos;
                        granja++;
                        incrementoGranja += clicksGranja;
                        actualizarIncremento(); // Actualiza el incremento total
                        if (granja > contGranja) {
                            costoGranja *= 2; // Multiplica el costo por 2 por cada vez que es comprado
                            costoItem3.textContent = `Costo: ${costoGranja} CLICKS` // Actualiza en pantalla el costo del item
                            nivelContItem3++;
                            nivelItem3.textContent = `Nivel: ${nivelContItem3}`
                            contGranja++;
                        }
                    }
                    else {
                        error.style.color = 'red';
                        error.style.left = '35%';
                        errorMessage('No tienes puntos suficientes para comprar este item.');
                    }
                    break;
                case 'item4':
                    if (puntos >= costoFabrica) {
                        puntos -= costoFabrica;
                        cartelPuntaje.textContent = puntos;
                        fabrica++;
                        incrementoFabrica += clicksFabrica;
                        actualizarIncremento(); // Actualiza el incremento total
                        if (fabrica > contFabrica) {
                            costoFabrica *= 2; // Multiplica el costo por 2 por cada vez que es comprado
                            costoItem4.textContent = `Costo: ${costoFabrica} CLICKS` // Actualiza en pantalla el costo del item
                            nivelContItem4++;
                            nivelItem4.textContent = `Nivel: ${nivelContItem4}`
                            contFabrica++;
                        }
                    }
                    else {
                        error.style.color = 'red';
                        error.style.left = '35%';
                        errorMessage('No tienes puntos suficientes para comprar este item.');
                    }
                    break;
            }
        }

        function actualizarIncremento() {
            incrementoTotal = 1 + incrementoMatadero + incrementoGranja + incrementoFabrica;
        }

        function errorMessage(message) {
            error.setAttribute("class", "error");
            error.textContent = message;
            document.body.appendChild(error);
        }



        // Suma 1 punto por cada click que reciba Payo.
        payo.addEventListener('click', function(){
            puntos += incrementoTotal;
            cartelPuntaje.textContent = puntos;
            console.log('Puntos actuales: ', puntos);

            if (puntos < 500) {
                document.body.style.backgroundImage = "url('./img/fondo.png')";
            }
            if (puntos >= 500 && puntos < 1000) {
                document.body.style.backgroundImage = "url('./img/fondoSegundo.png')";
                payo.setAttribute('src', './img/payoV2.png');
            }
            if (puntos >= 1000 && puntos < 3000) {
                document.body.style.backgroundImage = "url('./img/fondoTercero.png')";
                payo.setAttribute('src', './img/payoV3.png');
            }
            if (puntos >= 5000) {
                document.body.style.backgroundImage = "url('./img/fondoCuarto.png')";
                payo.setAttribute('src', './img/payoV4.png');
            }
        });
    }
    
    // Limpia la pantalla principal para poder crear la pantalla del juego.
    function limpiarScreen() {
        let element = document.querySelector('.flex-container');
        element.parentNode.removeChild(element);
    
        let title = document.querySelector('.titulo-principal');
        title.parentNode.removeChild(title);
    }
    
    // Inicia la pantalla principal
    introduction();
    
    // Si presionan el boton "Jugar!" se limpiará la pantalla principal y cargará el juego.
    botonJugar.addEventListener('click', function() {
        limpiarScreen();
        game();
    });
}

let modal = document.querySelector('.modal-overlay');

function definirIdioma() {
    document.querySelector('.en').addEventListener('click', function() {
        localStorage.setItem('idioma','en');
        cerrarModal();
        setTimeout(() =>location.reload(), 1000)
    });
    document.querySelector('.es').addEventListener('click', function() {
        localStorage.setItem('idioma','es');
        cerrarModal();
        setTimeout(()=>location.reload(), 1000);
    });
}

function cerrarModal() {
    modal.style.animation = "desaparecer 1s forwards";
    setTimeout(()=>modal.style.display = "none", 1000);

}

const idioma = localStorage.getItem('idioma');

if (idioma === null) {
    definirIdioma();
}
else {
    modal.style.display = "none";
}

if (idioma === "es") {
    document.documentElement.setAttribute('lang', 'es');
    es();
    // Cambiar el titulo cuando el usuario cambie de pestaña con el idioma en Español
    window.addEventListener('blur', () => {
        document.title = "¡Vuelve pronto!"
    })
    window.addEventListener('focus', () => {
        document.title = "SuperClick!"
    });
}
else if (idioma === "en") {
    document.documentElement.setAttribute('lang', 'en');
    en();
    // Cambiar el titulo cuando el usuario cambie de pestaña con el idioma en Inglés
    window.addEventListener('blur', () => {
        document.title = "Come back soon!"
    });
    window.addEventListener('focus', () => {
        document.title = "SuperClick!"
    });
}









const j = `
********************************
*                              *
*      *.*                     *
*                              *
*                              *
*      *******************     *
*               *              *
*               *      *.*     *
*               *              *
*               *              *
*               *              *
*      *        *              *
*      *        *              *
*      *        *              *
*       ********               *
*                              *
*          *.*                 *
*                              *
*                              *
*                      JotaDev *
********************************
`;

console.log(j);