// Classe carre

function Carre(etat, etatNewCarre, posx, posy, tailleCase, nombre, couleur,context, tableau)
{
	this.etat = etat; // permet de savoir si le carré doit être affiché
	this.etatNewCarre = etatNewCarre;
	this.posx = posx;
	this.posy = posy;
	this.tailleCase = tailleCase;
	this.nombre = nombre;
	this.couleur = couleur;
	this.context = context;
	this.tableau = tableau;

	var that = this; //On passe les carractéristiques de l'objet pour les réutiliser par la suite.

	//-----------------------------------------------------------------------------
	// Fonction pour afficher un carré
	//-----------------------------------------------------------------------------	

	this.AfficheCarre = function AfficheCarre()
	{
		if (that.etat == "on")
		{
			that.context.fillStyle = that.couleur;
			that.context.fillRect(that.posx, that.posy, that.tailleCase, that.tailleCase);
			if (that.tailleCase == 100 )
			{
				context.font = "68px Calibri,Geneva,Arial";
				context.fillStyle = "white";
				context.fillText(that.nombre, 30 + that.posx, 75 + that.posy);
			}
		}
	}

	//------------------------------------------------------------------------------
	// Fonctions pour créer un nouveau carré
	//------------------------------------------------------------------------------

	//int module = 0;

	this.UpdateNewCarre = function UpdateNewCarre() 
	{
		that.etat = 'on';
		if (module <= 90)
		{
			module = module + 10;
			that.tailleCase = tailleCase*(module/100); //On modifie la taille du carré de sorte qu'il grandisse progressivement
			if ( module == 100 ) that.etatNewCarre = 'off';
		}

	}

	//--------------------------------------------------------------------------------
	// Fonction de déplacement en haut
	//--------------------------------------------------------------------------------

	this.UP = function UP()
	{
		while ( (that.posy != 0) /*& (tabArena[(that.posy - 100)/100][(that.posx)/100] == 0) */)	//PROBLEME!
		{	
			that.posy = that.posy - 100;
		}
	}

	//--------------------------------------------------------------------------------
	// Fonction de déplacement en bas
	//--------------------------------------------------------------------------------

	this.DOWN = function DOWN()
	{
		while ( (that.posy != 300) /*& (tabArena[(tabCarre[i].posy + 100)/100][(tabCarre[i].posx)/100] == 0)*/ ) //PROBLEME!
		{
			that.posy = that.posy + 100;
		}
	}

	//--------------------------------------------------------------------------------
	// Fonction de déplacement à gauche
	//--------------------------------------------------------------------------------

	this.LEFT = function LEFT()
	{
		while ((that.posx != 0) & (tabArena[(that.posy)/100][(that.posx - 100)/100] == 0)) 
		{
			that.posx = that.posx - 100;  
		}
	}

	//--------------------------------------------------------------------------------
	// Fonction de déplacement à droite
	//--------------------------------------------------------------------------------
	
	this.RIGHT = function RIGHT()
	{
		while ( (that.posx != 300) & (tabArena[(that.posy)/100][(that.posx + 100)/100] == 0)) 
		{
	  		that.posx = that.posx + 100;
		}
	}
}

