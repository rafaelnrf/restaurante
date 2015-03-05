//var urlDados = "http://www.api.guiademoteis.com.br/";
//var urlImg = "http://www.chez.com.br/";
//var urlDados = "http://localhost:2236/";
//var tipo_chamada = ".asp";
//var urlDados_nova = "http://www.penabola.com.br/chezmenu1/srv/";
var tipo_chamada = ".php";
var urlDados_nova = "http://www.chezmenu.com.br/webservice/";
var urlWebservice = "http://www.chezmenu.com.br/webservice/"
var urlImg_nova = "http://www.penabola.com.br/chezmenu1/imagens/";
var urlImg_externa = "http://www.chezmenu.com.br/upload/categoria/";
var urlImg_cat = "http://www.chezmenu.com.br/upload/categoria/";
var urlImg_dest = "http://www.chezmenu.com.br/upload/destaque/";
var urlImg_rest = "http://www.chezmenu.com.br/upload/restaurante/";
var e_categoria = 0;	

//Vai para o topo da home
function GoTop() {
    window.scrollTo(0, 0);
}
//##############################################################

//Carrega o botão baixar app, header, e footer
//function IncludeHeader(callback) {
function IncludeHeader() {
    //$('#header').append($("<div>").load("../Includes/_header.html", callback));
    var newHeader = $('#home .header').clone();
    var newRodape = $('#rodape').clone();

    //Replica header
    //$('#detalhes .header').append(newHeader.html());
    $('#buscaPorNome .header').append(newHeader.html());
    $('#login .header').append(newHeader.html());
    $('#esqueci-senha .header').append(newHeader.html());
    $('#senha-altera .header').append(newHeader.html());
    $('#informativo-altera .header').append(newHeader.html());
    $('#descontos .header').append(newHeader.html());
    $('#cupons-digitais .header').append(newHeader.html());
    $('#moteis-favoritos .header').append(newHeader.html());
    $('#cortesia .header').append(newHeader.html());
    $('#cadastro .header').append(newHeader.html());
    $('#sem-geolocation .header').append(newHeader.html());
    //Replica rodapé
    $('#detalhes .rodape').append(newRodape.html());
    $('#buscaPorNome .rodape').append(newRodape.html());
    $('#login .rodape').append(newRodape.html());
    $('#esqueci-senha .rodape').append(newRodape.html());
    $('#senha-altera .rodape').append(newRodape.html());
    $('#informativo-altera .rodape').append(newRodape.html());
    $('#descontos .rodape').append(newRodape.html());
    $('#cupons-digitais .rodape').append(newRodape.html());
    $('#cortesia .rodape').append(newRodape.html());
    $('#moteis-favoritos .rodape').append(newRodape.html());
    $('#cadastro .rodape').append(newRodape.html());
    $('#sem-geolocation .rodape').append(newRodape.html());
} 



    //Pega a latitude e longitude do usuário
function initGeoLocalizacao(callback) {
        locSucesso("", callback);
}

function locSucesso(position, callback) {

        var param = {
            latitude:   "",
            longitude:  "",
            pageNumber: "",
            pageSize:   "6"
        };

        //Motéis Perto
        $.ajax({
            type: "POST",
            url: urlDados_nova + "categoria" + tipo_chamada,
            data: param,
            success: SucessoLoadMoteisPerto,
            complete: callback,
            dataType: "json"
        });
		
		$.post(urlDados_nova + "popup.php",{},function(data){
				var dados = eval(data);
				$.each(dados, function (i, item) {
					$("#bannerCadastro").css("background-image","http://www.chezmenu.com.br/upload/popup/"+item.imagem);
				});
		});

    }

    function SucessoLoadMoteisPerto(dados) {
       $.each(dados, function (i, item) {
            //var km = item.Distance.toString();
            var texto = "<li id='categoria-" + item.categoriaId + "' class='arrow' data-categoriaid='" + item.categoriaId + "'>";
            //texto = texto + "<a href='#detalhes' onclick='LoadDetalhesMotel(" + item.MotelId + ")'>";
            //texto = texto + "<a href='#rest' data-categoriaid='" + item.categoriaId + "'>";
            texto = texto + "<div class='premium-left'/>";
            var logotipo = item.logo;
			if ( logotipo.indexOf("thumb") == -1)
			{
				texto = texto + "<img src='" + urlImg_cat +  item.logo + "' width='100%'/>";
			} else {
				texto = texto + "<img src='" + urlImg_cat +  item.logo + "' width='100%'/>";
			};
            //texto = texto + "<span class='distancia'>Distância: <strong>" + km.substring(0, 4) + " km</strong></span>";
            
            texto = texto + "</div>";
            if (item.planoredef == "1")
                texto = texto + "<span class='motel-premium'>";
            else if (item.planoredef == "2")
                texto = texto + "<span class='motel-indicado'>";
            else
                texto = texto + "<span>";

            texto = texto + "</span>";
            texto = texto + "</div>";
            texto = texto + "<div class='premium-right'/>";
            texto = texto + "<span class='nome'>" + item.categoria + "</span>";
            //texto = texto + "<span class='endereco'>" + item.City + " - " + item.Uf + "</span>";
            texto = texto + "</div>"; 
            //texto = texto + "</a>";
            texto = texto + "</li>";
            //texto = texto + "</li>";
            $("#moteis-premium").append(texto);
            $('.loader').hide();
        });
		
        //Paginação
        var TotPaginas = parseInt(dados.PagesCount);
        var Pagina     = parseInt($('#hidPagina').val());
        Pagina = Pagina + 1;
        if (Pagina < TotPaginas) {
            $('#hidPagina').val(Pagina);
            texto = "<li id='moteisperto-next'><a onclick='LoadMaisMoteiePerto(" + Pagina + ")'>VER MAIS MOTÉIS</a><div class='premium-right'/></div></li>"
            $("#moteis-premium").append(texto);
        }
        else 
            $("#moteisperto-next").hide();
    }

    function SucessoRestCategoria(dados) {
		$("#rest-premium").empty();
		$("h2").empty();
        $.each(dados, function (i, item) {
            //var km = item.Distance.toString();
            var km = item.km;
			var categoria = item.categoria
            var texto = "<li id='rest-" + item.id + "' data-restid='" + item.id + "' onclick='LoadRestaurante(" + item.id + ");'  class='arrow'>";
            texto = texto + "<div class='premium-left'>";
            var logotipo = item.logo;
			if (logotipo.indexOf("thumb") == -1)
			{
				texto = texto + "<img src='" + urlImg_rest +  item.logo + "'/>";
			} else {
				texto = texto + "<img src='" + urlImg_rest +  item.logo + "'/>";
			};
            //texto = texto + "<span class='distancia'>Distância: <strong>" + km.substring(0, 4) + " km</strong></span>";
            
            texto = texto + "</div>";
            if (item.planoredef == "1")
                texto = texto + "<span class='motel-premium'>";
            else if (item.planoredef == "2")
                texto = texto + "<span class='motel-indicado'>";
            else
                texto = texto + "<span>";
            texto = texto + "</span>";
            texto = texto + "</div>";
            texto = texto + "<div class='premium-right'/>";
            texto = texto + "<span class='nome'>" + item.cliente + "</span>";
            texto = texto + "<span class='endereco'>" + item.cidade + " - " + item.estado + "</span>";
            texto = texto + "</div>"; 
            texto = texto + "</li>";
            $("#rest-premium").append(texto);
			$("h2").empty();
			$("#titulo2").append("Categoria: " + item.nome_categoria)
			$(".det-imagem").attr("src", urlImg_externa + item.propaganda);
            $('.loader').hide();
        });

		e_categoria = 1;	
		$("#home").hide();
		$("#rest").show();
		
		//Paginação
        var TotPaginas = parseInt(dados.PagesCount);
        var Pagina     = parseInt($('#hidPagina').val());
        Pagina = Pagina + 1;
        if (Pagina < TotPaginas) {
            $('#hidPagina').val(Pagina);
            texto = "<li id='moteisperto-next'><a onclick='LoadMaisMoteiePerto(" + Pagina + ")'>VER MAIS MOTÉIS</a><div class='premium-right'/></div></li>"
            $("#moteis-premium").append(texto);
        }
        else 
            $("#moteisperto-next").hide();
    }

//TV por IP
function LoadTVPorIP(callback) {
    var param = {
        latitude:  $('#hidLatitude').val().replace(".", ","),
        longitude: $('#hidLongitude').val().replace(".", ","),
        pageNumber: "1"
    };
	console.log(urlDados_nova + "destaque" + tipo_chamada);
 
    //$('#spiner-tv').show();
    $.ajax({
        type: "POST",
        url: urlDados_nova + "destaque" + tipo_chamada,
        //url: urlDados + "Motel/GetDestaqueTV/",
        data: param,
        success: SucessoLoadTVPorIP,
        complete: callback,
        dataType: "json"
    });
}

function SucessoLoadTVPorIP(dados) {
    $.each(dados, function (i, item) {
        i++;
        var texto = "<figure id='" + item.Id + "' onclick='LoadRestaurante(" + item.cliente + ")'>";
        texto = texto + "<a href=\"javascript:testandoclick();\"  >";
        var img_destaque = item.Imagem;
		if (img_destaque.indexOf("thumb") == -1)
		{
			texto = texto + "<img  src='" + urlImg_dest +  item.Imagem + "'/>";
		} else {
			texto = texto + "<img  src='" + urlImg_dest +  item.Imagem + "'/>";
		};

        // Titando o nome do restaurante
		//texto = texto + "<figcaption>" + item.Titulo + "</figcaption>";
        texto = texto + "</a>";
        texto = texto + "</figure>";
        $("#slider-3-content").append(texto);
    });
}


function testandoclick(){
	e_categoria = 0;
}

function HomeTVLoad() {
    $('#tv-home').swipeSlide({ visibleSlides: 1, autoPlay: true });
}
//##############################################################

function LoadRestCategoria(categoria_id, callback) {
     	console.log(urlDados_nova + "rest_categoria" + tipo_chamada + "?categoria_id="+categoria_id);
         var param = {
            latitude:   $('#hidLatitude').val().replace(".", ","),
            longitude:  $('#hidLongitude').val().replace(".", ","),
            pageNumber: $('#hidPagina').val(),
            pageSize:   "6" 
        };
        $.ajax({
            type: "POST",
            url: urlDados_nova + "rest_categoria" + tipo_chamada + "?categoria_id="+categoria_id,
//            data: param,
            success: SucessoRestCategoria,
            complete: callback,
            dataType: "json"
        });
}


//Redireciona
function Redireciona() {
    if (!sessionStorage.Redirect)
        window.location = "#home";
    else 
        window.location = sessionStorage.Redirect;

    sessionStorage.removeItem("Acao");
    sessionStorage.removeItem("Redirect");
}
//## Redireciona - fim ##################################################



function SucessoLoadMoteisPorRegiao(dados) {

    $("#pre-result").empty();
//    $.each(dados.Motels, function (i, item) {
    $.each(dados, function (i, item) {
        //var km = item.Distance.toString();

        var texto = "<li id='motel-" + item.categoriaId + "'" + ">";
        texto = texto + "<a onclick='LoadDetalhesMotel(" + item.categoriaId + ")' >";
        texto = texto + "<div class='premium-left'/>";
        texto = texto + "<img src='" + item.logo + "'/>";
        texto = texto + "</div>";
        texto = texto + "<div class='premium-right'/>";
        texto = texto + "<span class='nome'>" + item.categoria + "</span>";
        //texto = texto + "<span class='endereco'>" + item.City + " - " + item.Uf + "</span>";
        texto = texto + "</div>";
        texto = texto + "</a></li>"
        $("#pre-result").append(texto);
    });
}


function LoadRestaurante(rest_id) {
	
    $('#det-suites').empty();
    $('#det-descontos').empty();
    var param = {
        id: rest_id
    };
	console.log(urlDados_nova + "rest_detalhe" + tipo_chamada + "?id="+rest_id);
    $.ajax({
        'async'   : false,
		type: "POST",
        url: urlDados_nova + "rest_detalhe" + tipo_chamada + "?id="+rest_id,
        success: SucessoLoadRestaurante,
        dataType: "json"
    });
}

function SucessoLoadRestaurante(dados) {
	
    $.each(dados, function (i, item) {
        //$('#hidMoelId').val(item.id);
        $('#detalhes h1').html(item.cliente);
        var logotipo = item.logo;
		if ( logotipo.indexOf("thumb") == -1)
		{
			$(".det-logo").attr("src", '../imagens/' + item.logo);
		} else {
			$(".det-logo").attr("src", urlImg_rest + item.logo);
		};
       
        $(".det-logo").attr("alt", item.cliente);
        var logotipo = item.logo;
		if ( logotipo.indexOf("thumb") == -1)
		{
			$(".det-imagem-rest").attr("src", urlImg_rest + item.imagem);
		} else {
			$(".det-imagem-rest").attr("src", urlImg_rest + item.imagem);
		};
        //$(".det-imagem-rest").attr("src", urlImg_nova + item.imagem);
        $(".det-imagem-rest").attr("alt", item.cliente);
        $('.det-topo h2').html(item.cliente);
        $('.det-descricao').html(item.descricao);
        $('.det-espaco').html("&nbsp;");
		$('.det-endereco').html(item.endereco);
        $('.det-end-bai-cid').html(item.cidade + " - " + item.bairro + " - " + item.estado);
        $('.det-telefone').html("Telefone: " + item.telefone);
		//.replace("(", "").replace(")", "").replace("-", "").replace(" ", ""));
        //$('#det_mapa').attr("href", "https://www.google.com.br/maps/place/" + item.endereco + "," + item.Bairro + "," + item.cidade + "," + item.estado + "," + item.cep);		
        $('.det-horario').html("Horário: " + item.horario);
        $('.det-culinaria').html("Culinária: " + item.culinaria);
        $('.det-lugares').html("Lugares: " + item.lugares);
        $('.det-rolha').html("Rolha: " + item.rolha);
        $('.det-cartoes').html("Cartões: " + item.cartoes);
        $('.det-informacoes').html("Informações: " + item.informacoes);
        //$('#det-mapa').attr("href", "https://www.google.com.br/maps/place/" + item.endereco + "," + item.bairro + "," + item.cidade + "," + item.estado + "," + item.cep);
        //$('#btn_det_ligar').attr("href", "tel: " + item.telefone);
        //$('#btn_det_leia').attr("href", "http://" + item.site_chezcroque);
        //$('#btn_det_site').attr("href", "http://" + item.site);
		$("#det-mapa").attr("onclick", "window.open('https://www.google.com.br/maps/place/" + item.endereco + "," + item.bairro + "," + item.cidade + "," + item.estado + "," + item.cep + "','_blank','location=yes','CloseButtonCaption=Retorna');");
        $('#btn_det_ligar').attr("href", "tel: " + item.telefone);
		$("#btn_det_leia").attr("onclick", "window.open('http://" + item.site_chezcroque + "','_blank','location=yes','CloseButtonCaption=Retorna');");
		if(item.site){
			$("#btn_det_site").attr("onclick", "window.open('http://" + item.site +"','_blank','location=yes','CloseButtonCaption=Retorna');");
        }else{
			$("#btn_det_site").attr("onclick", "alert('Este restaurante não possui site!')");
		}
		$('.loader').hide();
	});
	
	    $("#home").hide();
		$("#rest").hide();
		$("#detalhes").show();
	    $('.loader').hide();
    };
