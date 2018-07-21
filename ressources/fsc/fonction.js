$(document).ready(function(){
	
	var nomFormation;
	var nomProjet;
	var nomCompetence;
	var $win = $(window);
    var winH = $win.height() - 10;

    // Menu haut. Permet de mettre en surbrillance les elements du menu en fonction de la postion du visiteur sur la page.
    // En bas de la page, tous les elements sont en survrillance.
    // En haut, tous les elements sont dans leur etat classique.

	$win.on("scroll", function () {
	    if ($(this).scrollTop() > 10 ) 
	    {
	       $(".menuAccueil").addClass("activeMenu");
	    } 
	    else if ($(this).scrollTop() > winH); 
	    {
	        $(".menuFormations").addClass("activeMenu");
	    }
	    if ($(this).scrollTop() > winH*2) 
	    {
	        $(".menuProjets").addClass("activeMenu");
	    }
	    if ($(this).scrollTop() > winH*3) 
	    {
	        $(".menuCompetences").addClass("activeMenu");
	    }
	    if ($(this).scrollTop() > winH*4) 
	    {
	        $(".menuHobbies").addClass("activeMenu");
	    }
	   	if ($(this).scrollTop() > winH*4+200) 
	    {
	        $(".menuCv").addClass("activeMenu").animate({opacity:1},500);
	    }
	    if ($(this).scrollTop() <= winH*4) 
	    {
	        $(".menuHobbies").removeClass("activeMenu");
	    }
	    if ($(this).scrollTop() <= winH*3) 
	    {
	        $(".menuCompetences").removeClass("activeMenu");
	    }
	    if ($(this).scrollTop() <= winH*2) 
	    {
	        $(".menuProjets").removeClass("activeMenu");
	    }
	    if ($(this).scrollTop() <= winH*1) 
	    {
	        $(".menuFormations").removeClass("activeMenu");
	    }
	    if ($(this).scrollTop() <= winH) 
	    {
	        $(".menuProfil").removeClass("activeMenu");
	    }
	    if ($(this).scrollTop() <= 10 ) 
	    {
	       $(".menuAccueil").removeClass("activeMenu");
	    } 
	});

	// Animation Formations, permet d'afficher le logo et les infos de la formation.
	// Modification du background aussi, par defaut les 3 images son placés en colonne de largeur 33%.
	// Quand on clique sur une formation le bg de la formation associe passe à une largeur de 100%.
	// Les deux autres sont cachés avec une largeur de 0%.
	// Note : L'effet est plus sympa avec cette algo => BG1 100% et BG2 , BG3 0%
	//							     plutot que BG1, BG2, BG3 100% puis BG1 100%

	$(".dotFormation").on("click", function(){	
		var nomFormation = $(this).attr("id");
		$(".dotFormation").removeClass("hangalways");
		$(this).addClass("hangalways");
		
		if($("#bgFormations").hasClass("bgFormationsNull")) 
		{
			$("#bgFormations").removeClass("bgFormationsNull");
			$(".previewFormation"+nomFormation+" , .descriptionFormation"+nomFormation).addClass("formationActive").fadeIn(500);
			switch (nomFormation) {
				case "Hetic": $('.bgNdlp , .bgCachin').animate({width:"0%"},200); break;
				case "Ndlp": $('.bgHetic , .bgCachin').animate({width:"0%"},200); break;
				case "Cachin": $('.bgHetic , .bgNdlp').animate({width:"0%"},200);
			};
			$('.bg'+nomFormation).animate({width:"100%"},200);
		} 
		else 
		{
			$(".formationActive").removeClass("formationActive").fadeOut(500, function(){
			$(".previewFormation"+nomFormation+" , .descriptionFormation"+nomFormation).addClass("formationActive").fadeIn(500);
			switch (nomFormation) {
				case "Hetic": $('.bgNdlp , .bgCachin').animate({width:"0%"},200); break;
				case "Ndlp": $('.bgHetic , .bgCachin').animate({width:"0%"},200); break;
				case "Cachin": $('.bgHetic , .bgNdlp').animate({width:"0%"},200);
			};
			$('.bg'+nomFormation).animate({width:"100%"},200);

		});
		};
	});

	// Permet de selectionner un projet dans la fenetre de selection des projets.
	// Fontionnement : Quand on clique sur un des projets, récupereration du nom du projet (en id du bouton) dans la variable nomProjet.
	//				   Puis on cache la fenetre de selection avec la fonction fadeOut et on affiche le bouton pour recuperer la fenetre
	//				   une fois la précedente animation terminée via une fonction callback.
	//				   Une fois que c'est fait, on affiche la description et la preview de notre projet grace au nom dans la variable 
	//				   puis on ajoute la classe projetActif pour pouvoir identifier facilement les elements affichés

	$(".dotProjet").on("click", function(){
		var nomProjet = $(this).attr("id");
		$(".navProjets").fadeOut(500, function() {
			$(".switchNavProjets").fadeIn();
		});
		$(".previewProjet"+nomProjet+" , .descriptionProjet"+nomProjet+" , .bg"+nomProjet).fadeIn().addClass("projetActif");
	});	

	// Permet de fermer la fenetre de description d'un projet en cliquant sur le bouton switchNavProjet.
	// Fonctionnement : Quand on clique sur le bouton, les animations taches suivantes sont executées les unes apres les autres via des fonctions callback.
	//					Tous les elements avec la classe projetActif sont cachés, la fenetre de selection des projets apparait, et le bouton de fermeture est caché aussi.

	$(".switchNavProjets").on("click",function() {
		$(".projetActif").fadeOut(500, function(){
			$(".navProjets").fadeIn(500, function(){
				$(".switchNavProjets").fadeOut();
			});
		});
	}); 

	// Section competence, permet d'afficher le langage en fonction du bouton cliqué.
	// Fonctionnement : A droite il existe plusieurs divs (une par competence) cachés avec une hauteur de 0%.
	// 					Cette fonction permet de grandir, apres clique, la competence qui nous interessent en passant sa hauteur à 100%.

	$(".dotCompetence").on("click", function(){
		nomCompetence = $(this).attr("id");
		$(this).addClass("dotCompetenceActive");
		$(".competenceActive").animate({height:"0%"},500).removeClass("competenceActive");
		$(".competence"+nomCompetence).delay(700).animate({height:"100%"},500).addClass("competenceActive");
	});

	// Permet le scrolling fluide vers une partie du site.
	// Fonctionnement : Il faut ajouter la classe scrollFluide sur l'element qui va nous servir de lien vers une ancre sur la page.
	//					Pour connaitre l'ancre on recupère l'attribut 'href' de l'element cliqué, puis via une animation, modification de la valeur de scrolltop 
	//					pour creer l'effet fluide.

	$('.scrollFluide').on("click", function() { 
		var page = $(this).attr("href"); 
		$("html, body").animate( { scrollTop: $(page).offset().top }, 750 ); 
		return false;
	});

	// Menu hamburger pour mobile, affiche les elements les uns apres les autres grace à des callbacks successifs

	$(document).ready(function(){
		$("#menuMobileSwitch").click(function(){
			if($(this).hasClass("menuSwitchOff")) {
				$(this).removeClass("menuSwitchOff").addClass("menuSwitchOn");
				$(this).css("background-image","url(menuMobileClose.png)");
				$("#menuMobileAccueil").animate({left:-30},100, function() {
					$("#menuMobileProfil").animate({left:-30},100, function() {
						$("#menuMobileFormations").animate({left:-30},100, function() {
							$("#menuMobileProjets").animate({left:-30},100, function() {
								$("menuMobileCompetences").animate({left:-30},100, function() {
									$("#menuMobileHobbies").animate({left:-30},100);
								});
							});
						});
					});
				});
			} else {
				$(this).removeClass("menuSwitchOn").addClass("menuSwitchOff");
				$(this).css("background-image","url(menuMobileOpen.png)");
				$("#menuMobileHobbies").animate({left:-220},100, function() {
					$("#menuMobileCompetences").animate({left:-220},100, function() {
						$("#menuMobileProjets").animate({left:-220},100, function() {
							$("#menuMobileFormations").animate({left:-220},100, function() {
								$("#menuMobileProfil").animate({left:-220},100, function() {
									$("#menuMobileAccueil").animate({left:-220},100);
								});
							});
						});
					});
				});
			}
		});
	});
 });