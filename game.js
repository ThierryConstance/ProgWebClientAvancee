var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null;

//---------------------------------------------------------------------------------
// Constantes
//---------------------------------------------------------------------------------

var tailleCase = 100;
var tailleArene = 400;
var module = 0; // Cette variable permet de moduler la taille lors de l'affichage d'un nouveau carré 

//---------------------------------------------------------------------------------
// Canevas
//---------------------------------------------------------------------------------

var divArena;
var canArena;
var conArena;
var tabCarre; //Tableau avec les différents carrés
var tabArena = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

//---------------------------------------------------------------------------------
//Keys
//---------------------------------------------------------------------------------

var keys = {
    UP: 38,
    DOWN: 40,
    RIGHT: 39,
    LEFT: 37
};

var keyStatus = {};

function keyDownHandler(event) 
{
    "use strict"; 
    var keycode = event.keyCode, 
        key; 
    for (key in keys) 
    {
        if (keys[key] === keycode) 
        {
            keyStatus[keycode] = true;
            event.preventDefault();
        }
    }
}

function keyLeftHandler(event) 
{
    "use strict"; 
    var keycode = event.keyCode, 
        key; 
    for (key in keys) 
    {
        if (keys[key] === keycode) 
        {
            keyStatus[keycode] = true;
            event.preventDefault();
        }
    }
}

function keyUpHandler(event) 
{
	"use strict"
   var keycode = event.keyCode,
            key;
    for (key in keys)
    { 
        if (keys[key] == keycode) 
        {
            keyStatus[keycode] = false;
        }
        
    }
}

function keyRightHandler(event) 
{
	"use strict"
   var keycode = event.keyCode,
            key;
    for (key in keys)
    { 
        if (keys[key] == keycode) 
        {
            keyStatus[keycode] = false;
        }
        
    }
}

//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------

var mainloop = function() 
{
   updateGame();
   drawGame();		
};

var recursiveAnim = function() 
{
    mainloop();
    animFrame( recursiveAnim );
};

//---------------------------------------------------------------------------------
// Fonction permettant de connaitre la dernière position du carré à l'état 'on' 
//---------------------------------------------------------------------------------

function EstDernier()
{
	dernierCarre = 0;
	for(var i = 1 ;	i < 16 ; i++)
	{
		if(tabCarre[i].etat == 'on') dernierCarre = i;
	}
}

//---------------------------------------------------------------------------------
// Fonctions de déplacement du carré
//---------------------------------------------------------------------------------

function UpdateCarre(i) // Modifie la position du carré i
{
    //clearItems();
    
    var keycode;
    for (keycode in keyStatus) 
    {
            if( (keyStatus[keycode] == true) & (tabCarre[i].etat == 'on'))	//Problème avec le on...
            {
		tabArena[(tabCarre[i].posy)/100][(tabCarre[i].posx)/100] = 0;
                if(keycode == keys.UP) 
                {
			
			tabCarre[i].UP();
			
                }
                if(keycode == keys.DOWN) 
                { 
                	//tabArena[(tabCarre[i].posy)/100][(tabCarre[i].posx)/100] = 0;
			tabCarre[i].DOWN();
		    	//tabArena[(tabCarre[i].posy)/100][(tabCarre[i].posx)/100] = tabCarre[i].nombre; 
                } 
                if(keycode == keys.LEFT) 
                { 
			//tabArena[(tabCarre[i].posy)/100][(tabCarre[i].posx)/100] = 0;
			tabCarre[i].LEFT();
			//tabArena[(tabCarre[i].posy)/100][(tabCarre[i].posx)/100] = tabCarre[i].nombre; 
                } 
                if(keycode == keys.RIGHT) 
                { 
			//tabArena[(tabCarre[i].posy)/100][(tabCarre[i].posx)/100] = 0;
			tabCarre[i].RIGHT();
			//tabArena[(tabCarre[i].posy)/100][(tabCarre[i].posx)/100] = tabCarre[i].nombre; 
                }
		tabArena[(tabCarre[i].posy)/100][(tabCarre[i].posx)/100] = tabCarre[i].nombre;                           
            }
	/*if ( i == dernierCarre )
	{
	suiv ++;
	tabCarre[suiv].etatNewCarre = 'on'; 
	tabArena[(tabCarre[suiv].posy)/100][(tabCarre[suiv].posx)/100];
	}*/ 
        keyStatus[keycode] = false;
    }    	
}

//---------------------------------------------------------------------------------
// Fonction pour metre à jour l'arene
//---------------------------------------------------------------------------------

function DrawArena()
{
	for (var i = 0; i < 4; i++)
	{
		for (var j = 0; j < 4; j++)
		{
			if (tabArena[i][j] == 0)
			{
				conArena.fillStyle = 'silver';
				conArena.fillRect(j*100, i*100, tailleCase, tailleCase);				
			}
		}
	}
}

//---------------------------------------------------------------------------------
// Fonctions déroulement du jeu
//---------------------------------------------------------------------------------

var suiv = 0;
var dernierCarre;

function updateGame()
{

	if (tabCarre[suiv].etatNewCarre == 'on') 
	{
		tabCarre[suiv].UpdateNewCarre();
	}
	else
	{	
		EstDernier();
		for (var i = 0; i < dernierCarre + 1 ; i++)
		{
			UpdateCarre(i);
		}   
	}
}

function drawGame()
{
	DrawArena();

	if (tabCarre[suiv].etatNewCarre == 'on') 
	{
		tabCarre[suiv].AfficheCarre()
	}
	else
	{
		for (var i = 0; i < dernierCarre + 1; i++)
		{
			if (tabCarre[i].etat == 'on') 
			{
				tabCarre[i].AfficheCarre();
			}
		}
	}

}

//---------------------------------------------------------------------------------
// Fonction d'initialisation
//---------------------------------------------------------------------------------

function init() {
	"use strict";
	divArena = document.getElementById("arena");
	canArena = document.createElement("canvas");
	canArena.setAttribute("id", "canArena");
	canArena.width = tailleArene;
	canArena.height = tailleArene;
	conArena = canArena.getContext("2d");
	divArena.appendChild(canArena);

	tabCarre = new Array(); // On crée un tableau de 16 cases qui contiendra nos objets.
	tabCarre.push(new Carre("off", "on", 100, 100,tailleCase, 2, 'red', conArena, tabArena));
	tabArena[1][1] = tabCarre.nombre;
	for (var i = 0; i < 15 ; i++)
	{
		tabCarre.push(new Carre("off", 'off', 0, 0, tailleCase, 2, 'red', conArena, tabArena));
	}
	window.addEventListener("keydown", keyDownHandler, false);
	window.addEventListener("keyup", keyUpHandler, false);
	window.addEventListener("keyright", keyRightHandler, false);
	window.addEventListener("keyleft", keyLeftHandler, false);
// start the mainloop    
    animFrame( recursiveAnim );
    
}

window.addEventListener("load", init,false);
