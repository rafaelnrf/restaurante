/// <reference path="cadastro_adw_conversion.html" />
/// <reference path="cadastro_adw_conversion.html" />
//Storage.remove('Usuario');
Storage.remove('Cupom');
Storage.remove('AcaoRedirect');
Storage.remove('Acao');
Storage.remove('Redirect');
Storage.remove('Geo');
Storage.remove('Motel');

var urlDados = "http://m.guiademoteis.com.br/";
var url = "http://m.guiademoteis.com.br/mobile.html";
//var urlDados = "http://localhost:2236/";
var urlImg = "http://www.guiademoteis.com.br/";
var initialLocation;
var map;

var geoDefault = {
    Latitude: -23.5488,
    Longitude: -46.62952
};
$('#hidLatitude').val(geoDefault.Latitude);
$('#hidLongitude').val(geoDefault.Longitude);

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//Vai para o topo da home
function GoTop() {
    window.scrollTo(0, 0);
}
function GoBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}
//##############################################################

//Carrega o botão baixar app, header, e footer
//function IncludeHeader(callback) {
function IncludeHeader() {
    var newHeader = $('#home .header').clone();
    var newRodape = $('#rodape').clone();

    //Replica header
    $('#detalhes .header').html(newHeader.html());
    $('#buscaPorNome .header').html(newHeader.html());
    $('#login .header').html(newHeader.html());
    $('#esqueci-senha .header').html(newHeader.html());
    $('#senha-altera .header').html(newHeader.html());
    $('#informativo-altera .header').html(newHeader.html());
    $('#descontos .header').html(newHeader.html());
    $('#cupons-digitais .header').html(newHeader.html());
    $('#mapa .header').html(newHeader.html());
    $('#moteis-favoritos .header').html(newHeader.html());
    $('#cortesia .header').html(newHeader.html());
    $('#favoritar .header').html(newHeader.html());
    $('#cadastro .header').html(newHeader.html());
    $('#sem-geolocation .header').html(newHeader.html());
    //Replica rodapé
    $('#detalhes .rodape').html(newRodape.html());
    $('#buscaPorNome .rodape').html(newRodape.html());
    $('#login .rodape').html(newRodape.html());
    $('#esqueci-senha .rodape').html(newRodape.html());
    $('#senha-altera .rodape').html(newRodape.html());
    $('#informativo-altera .rodape').html(newRodape.html());
    $('#descontos .rodape').html(newRodape.html());
    $('#cupons-digitais .rodape').html(newRodape.html());
    $('#cortesia .rodape').html(newRodape.html());
    $('#favoritar .rodape').html(newRodape.html());
    $('#moteis-favoritos .rodape').html(newRodape.html());
    $('#cadastro .rodape').html(newRodape.html());
    $('#sem-geolocation .rodape').html(newRodape.html());
}

//Pega a latitude e longitude do usuário
function initGeoLocalizacao(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            locSucesso(position, callback);
        }, erro);
    } else {
        erro();
    }
}

function locSucesso(position, callback) {

    //Armazena Latitude e longitude
    var geo = {
        Latitude: position.coords.latitude,
        Longitude: position.coords.longitude
    };
    Storage.set('Geo', geo);

    $('#hidLatitude').val(position.coords.latitude);
    $('#hidLongitude').val(position.coords.longitude);
    $('#hidPagina').val("1");

    //Se tudo deu certo, lê os motéis próximos (pela latitude e longitude) 
    $('#hidPagina').val("1")
    var param = {
        latitude: $('#hidLatitude').val().replace(".", ","),
        longitude: $('#hidLongitude').val().replace(".", ","),
        pageNumber: $('#hidPagina').val(),
        pageSize: "6"
    };

    //Motéis Perto
    Post(urlDados + "Motel/GetNearMotels", param, SucessoLoadMoteisPerto, callback);
    //$.ajax({
    //    type: "POST",
    //    url: urlDados + "Motel/GetNearMotels",
    //    data: param,
    //    success: SucessoLoadMoteisPerto,
    //    complete: callback,
    //    dataType: "json"
    //});
}

function ReloadMoteisPerto() {
    var geoObj = Storage.get('Geo');
    if (!geoObj)
        geoObj = geoDefault;

    $('#hidLatitude').val(geoObj.Latitude);
    $('#hidLongitude').val(geoObj.Longitude);
    $('#hidPagina').val("1")
    var param = {
        latitude: $('#hidLatitude').val().replace(".", ","),
        longitude: $('#hidLongitude').val().replace(".", ","),
        pageNumber: $('#hidPagina').val(),
        pageSize: "6"
    };

    //Motéis Perto Reload
    $.ajax({
        type: "POST",
        url: urlDados + "Motel/GetNearMotels",
        data: param,
        success: SucessoLoadMoteisPerto,
        dataType: "json"
    });
}

//function erro(error) {
//    $('#hidLatitude').val("0");
//    $('#hidLongitude').val("0");
//    $('#status').text(error == typeof msg == 'string' ? msg : "falha ao localizar");
//    $('#status').css('background-color', '#F00').css('padding', '5px');
//}
function erro(error) {
    $('.loader').hide();
    $('.mask').hide();
    $('.menu-login').hide();
    $('.menu-logout').show();
    window.location = "#sem-geolocation";
}
//##############################################################

function LoadMaisMoteiePerto() {

    $('.loader').show();
    $('.mask').show();
    $('#moteisperto-next').remove();
    var param = {
        latitude: $('#hidLatitude').val().replace(".", ","),
        longitude: $('#hidLongitude').val().replace(".", ","),
        pageNumber: $('#hidPagina').val(),
        pageSize: "6"
    };

    $.ajax({
        type: "POST",
        url: urlDados + "Motel/GetNearMotels",
        data: param,
        success: SucessoLoadMoteisPerto,
        dataType: "json"
    });
}

function SucessoLoadMoteisPerto(dados) {
    $.each(dados.Motels, function (i, item) {
        var km = item.Distance.toString();
        var texto = "<li id='motel-" + item.MotelId + "' class='arrow' onclick='LoadDetalhesMotel(" + item.MotelId + ")'>";
        texto = texto + "<div class='premium-left'/><div class='formatLogoMotel'>";
        //texto = texto + "<img src='ImageHandler.ashx?u=" + item.Logo.replace(new RegExp(/\\/g), '/').replace("http://www.guiademoteis.com.br/", "") + "'/></div>";
        texto = texto + "<img src='" + item.Logo + "'/></div>";
        texto = texto + "<span class='distancia'>Distância: <strong>" + km.substring(0, 4) + " km</strong></span>";

        texto = texto + "</div>";
        if (item.PlanoRedef == "1")
            texto = texto + "<span class='motel-premium'>";
        else if (item.PlanoRedef == "2")
            texto = texto + "<span class='motel-indicado'>";
        else
            texto = texto + "<span>";

        texto = texto + "</span>";
        texto = texto + "</div>";
        texto = texto + "<div class='premium-right'/>";
        texto = texto + "<span class='nome'>" + item.MotelName + "</span>";
        texto = texto + "<span class='endereco'>" + item.City + " - " + item.Uf + "</span>";
        texto = texto + "</div>";
        texto = texto + "</li>"
        $("#moteis-premium").append(texto);
    });

    $('.loader').hide();
    $('.mask').hide();

    if (dados.Motels.length > 0) {
        //Mais motéis (paginação)
        var TotPaginas = parseInt(dados.PagesCount);
        var Pagina = parseInt($('#hidPagina').val());
        Pagina = Pagina + 1;
        if (Pagina < TotPaginas) {
            $('#hidPagina').val(Pagina);
            texto = "<li id='moteisperto-next' onclick='LoadMaisMoteiePerto(" + Pagina + ")'>Ver mais motéis</li>"
            $("#moteis-premium").append(texto);
        }
        else
            $("#moteisperto-next").hide();
    }
    else {
        erro();
    }
}


//TV por IP
function LoadTVPorIP(callback) {
    if ($('#hidLatitude').val() == "" && $('#hidLongitude').val() == "") {
        $('#hidLatitude').val(geoDefault.Latitude);
        $('#hidLongitude').val(geoDefault.Longitude);
    }

    var param = {
        latitude: $('#hidLatitude').val().replace(".", ","),
        longitude: $('#hidLongitude').val().replace(".", ","),
        pageNumber: "1"
    };
    $.ajax({
        type: "POST",
        url: urlDados + "Motel/GetDestaqueTV/",
        data: param,
        success: SucessoLoadTVPorIP,
        complete: callback,
        dataType: "json"
    });
}

function SucessoLoadTVPorIP(dados) {
    $.each(dados, function (i, item) {
        i++;
        var texto = "<figure id='" + item.Id + "'>";
        texto = texto + "<a href='#' onclick='LoadDetalhesMotel(" + item.Id + ")' >";
        //texto = texto + "<img src='" + urlImg + item.Imagem.replace(new RegExp(/\\/g), '/') + "'/>";
        texto = texto + "<img src='ImageHandler.ashx?u=" + item.Imagem.replace(new RegExp(/\\/g), '/') + "'/>";
        texto = texto + "<figcaption>" + item.Titulo + "</figcaption>";
        texto = texto + "</a>";
        texto = texto + "</figure>"
        $("#slider-3-content").append(texto);
        //console.log(urlImg + item.Imagem.replace(new RegExp(/\\/g), '/'));
    });
}

function HomeTVLoad() {
    $('#tv-home').swipeSlide({ visibleSlides: 1 });
}
//##############################################################

//LoadDetalhesMotel (load motel, detalhes)
//No evento "LoadDetalhesMotel" as suites são lidas
function LoadDetalhesMotel(motel_id) {

    //Some com os botões da detalhes
    $("#btn_det_ligar").hide();
    $("#btn_det_descontos").hide();
    $("#btn_det_cortesias").hide();

    //Limpa os dados do motel anterior
    window.location = "#detalhes";
    $('#detalhes h1').html("");
    $(".det-logo").attr("src", urlImg + "imagens/logotipos/pixel_transp.png");
    $(".det-logo").attr("alt", "");
    $(".det-logo").bind('click', function () {
        LoadDetalhesMotel(motel_id);
    });
    $('.det-topo h2').html("");
    $('.det-endereco').html("");
    $('.det-end-bai-cid').html("");
    $('#btn_det_ligar').attr("href", "tel: ");
    $('#det-suites').empty();
    $('#det-descontos .seta').empty();
    $('.loader').show();
    $('.mask').show();
    var param = {
        id: motel_id
    };

    $.ajax({
        type: "POST",
        url: urlDados + "Motel/GetMotelById",
        data: param,
        success: SucessoLoadDetalhesMotel,
        dataType: "json"
    });
}

function LoadDetalhesMotelPorUrl(url, mac, mic) {

    //Some com os botões da detalhes
    $("#btn_det_ligar").hide();
    $("#btn_det_descontos").hide();
    $("#btn_det_cortesias").hide();

    //Limpa os dados do motel anterior
    window.location = "#detalhes";
    $('#detalhes h1').html("");
    $(".det-logo").attr("src", urlImg + "imagens/logotipos/pixel_transp.png");
    $(".det-logo").attr("alt", "");
    $('.det-topo h2').html("");
    $('.det-endereco').html("");
    $('.det-end-bai-cid').html("");
    $('#btn_det_ligar').attr("href", "tel: ");
    $('#det-suites').empty();
    $('#det-descontos .seta').empty();
    $('.loader').show();
    $('.mask').show();
    var param = {
        url: url,
        mac: mac,
        mic: mic
    };

    $.ajax({
        type: "POST",
        url: urlDados + "Motel/GetMotelByUrl",
        data: param,
        success: SucessoLoadDetalhesMotel,
        dataType: "json"
    });
}

function SucessoLoadDetalhesMotel(dados) {
    //console.log(dados);
    var motel = dados.Motel;
    var tel = motel.Phone.replace("(", "").replace(")", "").replace("-", "").replace(" ", "");
    $('#hidMoelId').val(dados.Motel.MotelId);
    $('#det-star').attr('onclick', "Favoritar()");
    $('#detalhes h1').html(dados.Motel.MotelName);
    var logo = motel.Logo.replace(new RegExp(/\\/g), '/');
    var imgLogo = "";
    if (logo.trim() == "")
        imgLogo = urlImg + "imagens/logotipos/out.gif";
    else
        imgLogo = urlImg + "imagens/" + logo.trim();
    $(".det-logo").attr("src", imgLogo);//urlImg + "imagens/" + motel.Logo.replace(new RegExp(/\\/g), '/')
    $(".det-logo").attr("alt", motel.MotelName);
    $(".det-logo").bind('click', function () {
        window.location = "#detalhes"
    });
    $('.det-topo h2').html(motel.MotelName);
    $('.det-dados h2').html(motel.MotelName);
    $('.det-endereco').html(motel.Address);
    $('.det-end-bai-cid').html(motel.District + " - " + motel.City + " - " + motel.Uf);

    $('#det-descontos').empty();

    if (motel.DiscountsBC.length > 0 && motel.DiscountsBC[0].IsDigital) {
        $("#det-bc-descontos").show();
    } else {
        $("#det-bc-descontos").hide();
    }
    //console.log(motel.DiscountsBC);
    //$('.bc-descontos').html("");
    $.each(motel.DiscountsBC, function (i, desconto) {
        if (desconto.IsDigital) {
            descIdAnt = motel.MotelId;
            var divId = "#desconto-mt-" + motel.MotelId;
            var newDesconto = $('.bcmodel').clone();
            newDesconto.removeAttr('id');
            newDesconto.removeAttr('style');
            newDesconto.removeAttr('class');
            newDesconto.data('entryId', "desconto-mt-" + motel.MotelId);
            newDesconto.find(".titulo").html(desconto.DiscountTitle);
            newDesconto.find(".subtitulo").html(desconto.DiscountSubTitle);
            newDesconto.find(".descricao").html(desconto.Description);

            //$('.oqueeh-cupomdigital').show();
            var botao = "<a class='btn-bc' href='#' onclick='AddCupomDigitalBC(" + desconto.DiscountId + ")' >Adicionar Cupom Digital</a><br>";
            newDesconto.find(".individual li.descbc").html(botao);

            $('.bc-descontos').append(newDesconto);
            //$(".bc-seta").after(newDesconto);
        }
    });

    $.each(motel.Discounts, function (i, desconto) {
        descIdAnt = motel.MotelId;
        var divId = "#desconto-mt-" + motel.MotelId;
        var newDesconto = $('.desconto').clone();
        newDesconto.removeAttr('id');
        newDesconto.removeAttr('style');
        newDesconto.removeAttr('class');
        newDesconto.data('entryId', "desconto-mt-" + motel.MotelId);
        newDesconto.find(".titulo").html(desconto.DiscountTitle);
        newDesconto.find(".subtitulo").html(desconto.DiscountSubTitle);
        newDesconto.find(".descricao").html(desconto.Description);

        if (desconto.IsDigital) {
            $('.oqueeh-cupomdigital').show();
            var botao = "<a class='btn-add-cupomdigital' href='#' onclick='AddCupomDigital(" + desconto.DiscountId + ")' >Adicionar Cupom Digital</a><br>";
            newDesconto.find(".individual li.digital").html(botao);
        } else {
            $('.oqueeh-cupomdigital').hide();
            var botaoprint = "<a class='btn-print' href='#' onclick='SendByEmail(" + desconto.DiscountId + ",\"" + dados.Motel.MotelName.replace("'", "") + "\", \"" + desconto.DiscountTitle.trim() + "\")'>Enviar cupom por e-mail</a><br>";
            newDesconto.find(".individual li.print").html(botaoprint);
        }
        $('#det-descontos').append(newDesconto);
    });

    //Grava os dados do motel, para serem usados no mapa
    var motelObj = {
        Id: motel.MotelId,
        Nome: motel.MotelName,
        Endereco: motel.Address,
        Telefone: tel.substring(3, tel.length),
        Latitude: motel.Location.Latitude,
        Longitude: motel.Location.Longitude,
        Logo_p: dados.BaseImageUrl + dados.Motel.LogoSmall,
        FavoritoId: 0,
        CategoriaId: "",
        Rating: "",
        Comentario: "",
        DescontosBC: (motel.DiscountsBC != null && motel.DiscountsBC.length > 0 && motel.DiscountsBC[0].IsDigital) ? motel.DiscountsBC.length : 0,
        Descontos: motel.Discounts.length,
        Cortesias: 0
    };

    Storage.remove('Motel');
    Storage.set('Motel', motelObj);

    //#cortesia
    LoadCortesia();

    //LoadSuites
    var param = {
        id: motel.MotelId
    };

    $.ajax({
        type: "POST",
        url: urlDados + "Suites/GetMotelSuites",
        data: param,
        success: SucessoLoadSuites,
        dataType: "json"
    });

    //Verifica se o motel é favorito
    if (Storage.get('Usuario')) {
        var usuarioObj = Storage.get('Usuario');
        Motel_E_Favorito(usuarioObj.Id, motel.MotelId, usuarioObj.Token);
    }

    if (!Storage.get('Usuario')) {
        $('.menu-login').hide();
        $('.menu-logout').show();
    }
    else {
        ReloadUsuario();
    }
}

function SucessoLoadSuites(dados) {
    var url = dados.BaseImageUrl;
    var suites = dados.Suites;

    $.each(suites, function (i, suite) {
        var newSuite = $('#suiteTemplate').clone();
        var divTvId = "#fotos_" + suite.SuiteId;
        newSuite.removeAttr('id');
        newSuite.removeAttr('style');
        newSuite.data('entryId', "suite-" + suite.SuiteId);
        newSuite.find("h2").html(suite.SuiteName);
        newSuite.find(".slider").attr('id', "fotos_" + suite.SuiteId);

        //Lendo as imagens da suite     
        var fotos = suite.Photos;
        var texto = "<div id='slider-" + suite.SuiteId + "-content'>";
        //Se não tiver foto
        if (fotos.length == 0) {
            texto = texto + "<figure>";
            texto = texto + "<img src='" + urlImg + "imagens/suites/preview/out.gif'/>";
            texto = texto + "</figure>";
        }
        else {
            $.each(fotos, function (i, foto) {
                texto = texto + "<figure>";
                texto = texto + "<img src='ImageHandler.ashx?u=" + "imagens/suites/" + foto + "'/>";
                texto = texto + "</figure>";
            });
        }
        newSuite.find('.slider').append(texto + "</div>");

        //Periodo
        var periodos = "";
        $.each(suite.Periods, function (i, periodo) {
            if (periodo.Price == "R$ 0,00")
                periodos = periodos + periodo.Description + "<br>";
            else
                periodos = periodos + periodo.Description + " - " + periodo.Price + "<br>";
        });

        if (periodos != "")
            newSuite.find('.periodo').html("<br><h4>Períodos:</h4>" + periodos);

        //Pernoite
        var pernoite = "";
        $.each(suite.Overnights, function (i, overnight) {
            if (overnight.Price == "R$ 0,00")
                pernoite = pernoite + overnight.Description + "<br>";
            else
                pernoite = pernoite + overnight.Description + " - " + overnight.Price + "<br>";
        });

        if (pernoite != "")
            newSuite.find('.pernoite').html("<br><h4>Pernoite</h4>" + pernoite);

        //Itens da suíte
        var itens = "";
        var qtde = (suite.Items.length - 1);
        $.each(suite.Items, function (i, item) {
            itens = itens + item;
            if (qtde > i)
                itens = itens + ", ";
        });

        if (itens != "")
            newSuite.find('.itens').html("<br><h4>Essa suíte tem:</h4>" + itens + ".");
        var aviso = "";
            //"IMPORTANTE!<br>Entre os dias 11 e 13/06 as informações aqui exibidas poderão sofrer alterações. Recomendamos confirmá-las diretamente com o motel.";
        if (suite.Observation != "")
            newSuite.find('.obs').html("<br><h4>Observações:</h4>" + aviso + "<br />" + suite.Observation);
        //else {
        //    newSuite.find('.obs').html("<br><h4>Observações:</h4>" + aviso);
        //}
        var conteudo = newSuite;
        $('#det-suites').append(conteudo);

        $(divTvId.toString()).swipeSlide({ visibleSlides: 1 });
        $('.loader').hide();
        $('.mask').hide();
    });

    var motelObj = Storage.get('Motel');
    if (motelObj.Telefone != "") {
        var tel = motelObj.Telefone.replace("\\", "/");
        if (tel.indexOf("/") != -1) {
            tel = tel.split("/")[0];
        }
        $('#btn_det_ligar').attr("href", "tel: " + tel);
        $('#btn_det_ligar').show();
    }

    //Habilita botão descontos
    if (motelObj.Descontos > 0 || motelObj.DescontosBC > 0)
        $('#btn_det_descontos').show();

    //Habilita botão cortesia
    if (motelObj.Cortesias > 0)
        $('#btn_det_cortesias').show();

}

function ReloadDetalhes(callback) {
    var motelObj = Storage.get('Motel');
    LoadDetalhesMotel(motelObj.Id);
    var newHeader = $('#home .header').clone();
    var newRodape = $('#rodape').clone();
    $('#detalhes .header').html(newHeader.html());
    $('#detalhes .rodape').html(newRodape.html());
    ReloadUsuario();

    if (callback)
        callback();
}

//LoadCrtesia
function LoadCortesia() {
    $('.loader').show();
    $('.mask').show();
    var param = {
        MotelId: $('#hidMoelId').val()
    };

    $.ajax({
        type: "POST",
        url: urlDados + "Motel/GetCortesia",
        data: param,
        success: SucessoLoadCortesia,
        dataType: "json"
    });
}

function SucessoLoadCortesia(dados) {
    var texto = "";
    var motelObj = Storage.get('Motel');
    motelObj.Cortesias = dados.length;

    Storage.set('Motel', motelObj);

    $('#cortesia-dados ul').empty();
    $.each(dados, function (i, item) {
        texto = texto + "<li><span class='cortesia-nome'>" + item.Nome + "</span><span class='cortesia-obs'><p>" + item.Obs + "</p></span>";
    });
    $('#cortesia-dados ul').append(texto);
    $('.loader').hide();
    $('.mask').hide();
}

function Rating(length) {
    $('#hidRating').val(length);
    $('.rating span').removeClass('rating-on');
    for (var i = 0; i <= length; i++) {
        var starId = "#rating" + i;
        $(starId).addClass('rating-on');
    }
}

function Favoritar() {
    ;
    if (!Storage.get('Usuario')) {
        Storage.set('Acao', 'favoritar');
        window.location = "#login";
    } else {
        window.location = "#favoritar";
        var objMotel = Storage.get('Motel');
        $.ajax({
            type: "POST",
            url: urlDados + "FavoriteCategory/GetFavoriteCategories",
            success: SucessoFavoritar,
            dataType: "json"
        });
    }
}

function SucessoFavoritar(dados) {
    var categorias = dados.FavoriteCategories;
    var usuarioObj = Storage.get('Usuario');
    var motelObj = Storage.get('Motel');
    Motel_E_Favorito(usuarioObj.Id, motelObj.Id, usuarioObj.Token)

    $('#favoritar-dados ul').empty();
    $.each(categorias, function (i, item) {
        if (motelObj.CategoriaId == item.CategoryId)
            $('#favoritar-dados ul').append("<li><input type='radio' name='categoria' Value='" + item.CategoryId + "' checked>" + "<label for='" + item.CategoryId + "'>" + item.CategoryName + "</label>" + "</li>");
        else
            $('#favoritar-dados ul').append("<li><input type='radio' name='categoria' Value='" + item.CategoryId + "' id='" + item.CategoryId + "'>" + "<label for='" + item.CategoryId + "'>" + item.CategoryName + "</label>" + "</li>");
    });
    $('#favoritar-dados ul').append("<li><textarea id='txtComentario' placeholder='Comentario'>" + motelObj.Comentario + "</textarea></li>");

    if (motelObj.CategoriaId == 0)
        $('#btnGravaFavorito').attr('onclick', "SalvarFavorito()");
    else
        $('#btnGravaFavorito').attr('onclick', "UpdateFavorito()");
}

function UpdateFavorito() {
    if ($('#hidRating').val() <= 0) {
        alert("Você precisa avaliar o motel com estrelinhas");
        return false;
    } else if ($('input[type="radio"][name=categoria]:checked').length == 0) {
        alert("Você precisa escolher uma categoria");
        return false;
    } else if ($('#txtComentario').val() == "") {
        alert("Você precisa escrever um comentário")
        return false;
    } else {
        var usuarioObj = Storage.get('Usuario');
        var motelObj = Storage.get('Motel');
        $('.loader').show();
        $('.mask').show();
        var param = {
            userId: usuarioObj.Id,
            favoriteMotelId: motelObj.FavoritoId,
            MotelId: $('#hidMoelId').val(),
            Token: usuarioObj.Token,
            CategoryId: $('input[type="radio"][name=categoria]:checked').val(),
            CommentText: $('#txtComentario').val().trim(),
            Rating: $('#hidRating').val()
        };

        $('.loader').hide();
        $('.mask').hide();
        $.ajax({
            type: "POST",
            url: urlDados + "FavoriteMotel/UpdateFavoriteMotel2",
            data: param,
            success: SucessoSalvarFavorito,
            dataType: "json"
        });
    }
}

function SalvarFavorito() {
    if ($('#hidRating').val() <= 0) {
        alert("Você precisa avaliar o motel com estrelinhas");
        return false;
    } else if ($('input[type="radio"][name=categoria]:checked').length == 0) {
        alert("Você precisa escolher uma categoria");
        return false;
    } else if ($('#txtComentario').val() == "") {
        alert("Você precisa escrever um comentário")
        return false;
    } else {
        var usuarioObj = Storage.get('Usuario');
        $('.loader').show();
        $('.mask').show();
        var param = {
            userId: usuarioObj.Id,
            MotelId: $('#hidMoelId').val(),
            Token: usuarioObj.Token,
            CategoryId: $('input[type="radio"][name=categoria]:checked').val(),
            CommentText: $('#txtComentario').val().trim(),
            Rating: $('#hidRating').val()
        };

        $('.loader').hide();
        $('.mask').hide();
        $.ajax({
            type: "POST",
            url: urlDados + "FavoriteMotel/AddFavoriteMotel2",
            data: param,
            success: SucessoSalvarFavorito,
            dataType: "json"
        });
    }
}

function SucessoSalvarFavorito(dados) {
    $('.loader').hide();
    $('.mask').hide();

    $('#det-star').removeClass("star-off").addClass("star-on");
    $('#hidRating').val("");
    window.location = "#detalhes";
}

function Motel_E_Favorito(usuarioId, motelId, token) {
    var param = {
        userId: usuarioId,
        motelId: motelId,
        token: token,
    };

    $.ajax({
        type: "POST",
        url: urlDados + "FavoriteMotel/MotelIsFavorite",
        data: param,
        success: SucessoMotelEFavorito,
        error: ErroMotelEFavorito,
        dataType: "json"
    });
}

function ErroMotelEFavorito(dados) {
    alert("erro");
}

function SucessoMotelEFavorito(dados) {
    var motelObj = Storage.get('Motel');
    motelObj.FavoritoId = dados.Id;
    motelObj.CategoriaId = dados.categoriaId;
    motelObj.Rating = dados.Rating;
    motelObj.Comentario = dados.comentario;
    Storage.remove('Motel');
    Storage.set('Motel', motelObj);
    Rating(dados.Rating);

    if (motelObj.FavoritoId > 0)
        $('#det-star').removeClass("star-off").addClass("star-on");
    else
        $('#det-star').removeClass("star-on").addClass("star-off");

}
//##############################################################

//Logout
function Logout() {
    Storage.remove('AcaoRedirect');
    Storage.remove('Usuario');
    Storage.remove('Acao');
    Storage.remove('Redirect');
    Storage.remove('CupomId');
    $('.menu-login').hide();
    $('.menu-logout').show();

    $('span.user-nome').text("");
    $('span.user-email').text("");
    $('#txtNome').val("");
    $('#txtEmail').val("");
    $('#txtEmail2').val("");
    $('#txtCpf').val("");
    $('#txtSenha').val("");
    $('input[name=cbxPromoAltera]').checked = false;
    $('input[name=cbxPubliAltera]').checked = false;
    $('input[name=cbxNews]').checked = false;
    $('input[name=cbxPubli]').checked = false;
    $('input[name="rdlSexo"]').removeAttr("checked");

    $().toastmessage('showWarningToast', 'Logout concluido!');

    window.location = "mobile.html";
}

//Login
function Login() {

    if ($('#txtEmail').val() == "") {
        $().toastmessage('showErrorToast', 'Digite o e-mail!');
        return false;
    } else if ($('#txtSenha').val() == "") {
        $().toastmessage('showErrorToast', 'Digite a senha!');
        return false;
    }

    var param = {
        email: $('#txtEmail').val(),
        password: $('#txtSenha').val()
    };

    $.ajax({
        type: "POST",
        url: urlDados + "UserLogin/Login",
        data: param,
        success: SucessoLogin,
        dataType: "json"
    });
}

function SucessoLogin(dados) {
    if (dados.UserId == 0) {
        $('#txtEmail').val(""); //Da tela de login
        $('#txtSenha').val(""); //Da tela de login
        $().toastmessage('showErrorToast', 'Verifique email e senha!');
    }
    else {
        //Gravando um objeto com dados do usuário em sessão
        $().toastmessage('showSuccessToast', 'Você se logou com sucesso!');
        var usuarioObj = {
            Id: dados.UserId,
            Nome: "",
            Sexo: "",
            DtNasc: "",
            Token: dados.Token,
            Email: $('#txtEmail').val(),
            Senha: $('#txtSenha').val(),
            Cep: "",
            News: "",
            Mailing: "",
            CPF: "",
            StatusCode: dados.StatusCode
        };

        Storage.set('Usuario', usuarioObj);
        $('#txtEmail').val(""); //Da tela de login
        $('#txtSenha').val(""); //Da tela de login
        $('.menu-login').show();
        $('.menu-logout').hide();

        //Pega o restante dos dados do usuário
        LoadDadosUsuario(function () {
            //Se o usuário foi logado, e se houver um Id de cuppm de
            //desconto para adicionar aos cupons digitais, adiciona
            if (Storage.get('Acao')) {
                if (Storage.get('Cupom')) {
                    var cupomObj = Storage.get('Cupom');
                    if (Storage.get('Acao') == "add-cupom-digital")
                        AddCupomDigital(cupomObj.CupomId);
                    else
                        SendByEmail(cupomObj.CupomId, cupomObj.Motel, cupomObj.Titulo);
                }
                else if (Storage.get('Acao') == "favoritar") {
                    Favoritar();
                }
            } else {
                Redireciona();
            }
        });
    }
}

function ReloadUsuario() {
    if (Storage.get('Usuario')) {
        var usuarioObj = Storage.get('Usuario');
        $('span.user-nome').text(usuarioObj.Nome);
        $('span.user-email').text(usuarioObj.Email);
        $('.menu-login').show();
        $('.menu-logout').hide();
    }
}
//## Login - fim ##################################################

//Load dados do usuário
function LoadDadosUsuario(callback) {
    var usuarioObj = Storage.get('Usuario');

    param = {
        userId: usuarioObj.Id,
        token: usuarioObj.Token
    };

    $.ajax({
        type: "POST",
        url: urlDados + "UserAccount/GetAccountInfo",
        data: param,
        success: SucessoLoadDadosUsuario,
        complete: callback,
        dataType: "json"
    });
}

function SucessoLoadDadosUsuario(dados) {
    var usuarioObj = Storage.get('Usuario');
    var dt1 = new Date(dados.User.BirthDateString);
    var dt2 = dt1.getFullYear() + "/" + (dt1.getMonth() + 1) + "/" + (dt1.getDate() + 1);
    usuarioObj.Nome = dados.User.FullName;
    usuarioObj.Sexo = dados.User.Gender;
    usuarioObj.DtNasc = dt2;
    usuarioObj.Cep = dados.User.ZipCode;
    usuarioObj.News = dados.User.NewsLetterAgreement;
    usuarioObj.Mailing = dados.User.UserMailling;
    usuarioObj.CPF = dados.User.SocialSecurityNumber;
    Storage.set('Usuario', usuarioObj);
    //Popula os campos
    $('span.user-nome').text(usuarioObj.Nome);
    $('span.user-email').text(usuarioObj.Email);
}


//Troca Senha
function TrocaSenha() {
    var usuarioObj = Storage.get('Usuario');
    if ($('#txtSenhaAtual').val() == "") {
        $().toastmessage('showErrorToast', 'Digite a Senha atual!');
        return false;
    } else if ($('#txtSenhaAtual').val() != usuarioObj.Senha) {
        $().toastmessage('showErrorToast', 'A senha atual não confere com a senha digitada');
        return false;
    } else if ($('#txtNovaSenha1').val() == "") {
        $().toastmessage('showErrorToast', 'Digite a nova senha!');
        return false;
    } else if ($('#txtNovaSenha2').val() == "") {
        $().toastmessage('showErrorToast', 'Digite a confirmação da nova senha!');
        return false;
    } else if ($('#txtNovaSenha1').val() != $('#txtNovaSenha2').val()) {
        $().toastmessage('showErrorToast', 'A nova senha e a confirmação da senha não são iguais!');
        return false;
    } else {
        var param = {
            userId: usuarioObj.Id,
            Token: usuarioObj.Token,
            ActualPassword: usuarioObj.Senha,
            NewPassword: $('#txtNovaSenha1').val()
        };

        $.ajax({
            type: "POST",
            url: urlDados + "UserAccount/ChangePassword2",
            data: param,
            success: SucessoTrocaSenha,
            dataType: "json"
        });
    }
}

function SucessoTrocaSenha(dados) {
    if (dados.StatusCode != 1) {
        var usuarioObj = Storage.get('Usuario');
        usuarioObj.Senha = $('#txtNovaSenha1').val();
        Storage.set('Usuario', usuarioObj);
        //Limpa os campos:
        $('#txtSenhaAtual').val("");
        $('#txtNovaSenha1').val("");
        $('#txtNovaSenha2').val("");

        window.location = "#home";
        $().toastmessage('showSuccessToast', 'Senha alterada com sucesso!');
    }
    else
        $().toastmessage('showErrorToast', 'Não foi possível adicionar o cupom. Tente novamente mais tarde. Erro: ' + dados.StatusCode);
}
//## Troca Senha - fim ##################################################

//Alterar Meus Dados
function AlterarMeusDados() {
    if (!Storage.get('Usuario')) {
        Storage.set('Acao', 'AlterarMeusDados');
        window.location = "#login";
    }
    else {
        var usuarioObj = Storage.get('Usuario');
        $('#cadastro h1').text("Alterar meus dados");
        $('#cadastro').find('form').find('h2').text("");
        $('#cadastro').removeClass('cadastro');
        $('#cadastro').addClass('alterardados');
        $('form').addClass('alterardados');
        $('.cbxNews').hide();
        $('.cbxPubli').hide();
        $('#txtNome').val(usuarioObj.Nome);
        $('#txtNome').attr("disabled", true)
        $('#txtEmail1').val(usuarioObj.Email);
        $('#txtEmail2').val(usuarioObj.Email);
        $('#txtCep').val(usuarioObj.Cep);
        $('#txtSenha').val(usuarioObj.Senha);
        $("#li_senha").hide(); //TODO:Ver se a para sumir sem usar  id de li. $('#txtSenha').parent().hide(); não funciona

        //Manipula dt nascimento
        //http://stackoverflow.com/questions/12346381/set-date-in-input-type-date
        var data = new Date(usuarioObj.DtNasc);
        var mes = data.getMonth() + 1;
        var dtString = data.getFullYear() + "-" + ("0" + mes).slice(-2) + "-" + ("0" + data.getDate()).slice(-2);
        $('#txtData').val(dtString);

        //Manipula radiobutton Sexoo
        var radioId = "sexo_" + usuarioObj.Sexo;
        document.getElementById(radioId).checked = true;
        $('#txtCpf').val(usuarioObj.CPF);
        if (usuarioObj.CPF != "" && usuarioObj.CPF != null)
            $('#txtCpf').attr("disabled", "disabled");

        if (usuarioObj.News)
            $('input[name=cbxNews]').attr('checked', true);
        if (usuarioObj.Mailing)
            $('input[name=cbxPubli]').attr('checked', true);

        $('#cadastro form h2').html("Alterar meus dados");
        $('input[name=btnGrava]').attr('value', 'Confirmar alteração');
        //window.location = "#cadastro";
    }
}

//Adiciona cupom digital
function AddCupomDigital(cupomId) {
    _gaq.push(['_trackEvent', 'Cupom', 'Digital']);
    if (!Storage.get('Usuario')) {
        Storage.set('Acao', 'add-cupom-digital');
        Storage.set('Redirect', '#');
        var CupomObj = {
            CupomId: cupomId.toString(),
            Motel: "",
            Titulo: ""
        };
        Storage.set('Cupom', CupomObj);
        window.location = "#login";
    }
    else {
        var usuarioObj = Storage.get('Usuario');
        var CupomObj = Storage.get('Cupom');
        if (usuarioObj.CPF != "" && usuarioObj.CPF != null) {
            var param = {
                userId: usuarioObj.Id.toString(),
                DiscountId: cupomId.toString(),//CupomObj.CupomId,
                Token: usuarioObj.Token.toString()
            };

            $.ajax({
                type: "POST",
                url: urlDados + "UserDiscount/AddUserDiscount2",
                data: param,
                success: SucessoAddCupomDigital,
                dataType: "json"
            });
        }
        else {
            $().toastmessage('showErrorToast', 'Antes de adicionar um cupom, favor atualizar seus dados informando o CPF!');
            window.location = "#cadastro";
            AlterarMeusDados();
            Storage.set('Cupom', CupomObj);
        }
    }
}

function AddCupomDigitalBC(cupomId) {
    _gaq.push(['_trackEvent', 'Cupom', 'Digital']);
    if (!Storage.get('Usuario')) {
        Storage.set('Acao', 'add-cupom-digital');
        Storage.set('Redirect', '#');
        var CupomObj = {
            CupomId: cupomId.toString(),
            Motel: "",
            Titulo: ""
        };
        Storage.set('Cupom', CupomObj);
        window.location = "#login";
    }
    else {
        var usuarioObj = Storage.get('Usuario');
        var CupomObj = Storage.get('Cupom');
        if (usuarioObj.CPF != "" && usuarioObj.CPF != null) {
            var param = {
                userId: usuarioObj.Id.toString(),
                DiscountId: cupomId.toString(),//CupomObj.CupomId,
                Token: usuarioObj.Token.toString()
            };

            $.ajax({
                type: "POST",
                url: urlDados + "UserDiscount/AddUserDiscount2",
                data: param,
                success: SucessoAddCupomDigital,
                dataType: "json"
            });
        }
        else {
            $().toastmessage('showErrorToast', 'Antes de adicionar um cupom, favor atualizar seus dados informando o CPF!');
            window.location = "#cadastro";
            AlterarMeusDados();
            Storage.set('Cupom', CupomObj);
        }
    }
}

//Cupom "impresso"
function SendByEmail(cupomId, motel, titulo) {
    _gaq.push(['_trackEvent', 'Cupom', 'Digital']);
    if (!Storage.get('Usuario')) {
        Storage.set('Acao', 'add-cupom-impresso');
        Storage.set('Redirect', '#');
        var CupomObj = {
            CupomId: cupomId.toString(),
            Motel: motel,
            Titulo: titulo
        };
        Storage.set('Cupom', CupomObj);
        window.location = "#login";
    }
    else {
        var usuarioObj = Storage.get('Usuario');
        var cupomObj = Storage.get('Cupom');
        if (cupomObj == null) {
            cupomObj = {
                CupomId: cupomId.toString(),
                Motel: motel,
                Titulo: titulo
            };
        }
        var param = {
            DiscountId: cupomObj.CupomId,
            Motel: cupomObj.Motel,
            Email: usuarioObj.Email,
            Titulo: cupomObj.Titulo,
            Token: usuarioObj.Token.toString()
        };

        $.ajax({
            type: "POST",
            url: urlDados + "UserDiscount/SendCupomByEmail",
            //url: "http://localhost:2236/UserDiscount/SendCupomByEmail",
            data: param,
            success: SucessoSendByEmail,
            dataType: "json"
        });
    }
}

function SucessoSendByEmail() {
    window.location = "#descontos";
    $().toastmessage('showSuccessToast', 'O cupom foi enviado para o seu e-mail!');
}

function SucessoAddCupomDigital(dados) {

    Storage.remove('Acao');
    Storage.remove('Redirect');
    Storage.remove('CupomId');

    if (dados.StatusCode == 100) {
        if (dados.Message == null || dados.Message == "") {
            $().toastmessage('showErrorToast', 'Não foi possível adicionar o cupom. Tente novamente mais tarde. Erro: ' + dados.StatusCode);
        } else {

            $("#msg").html(dados.Message);
            $('#continuarerrobc').unbind('click');
            $('#continuarerrobc').bind('click', function () {
                $('#errobc, .modalmask').hide();
                return false;
            });
            $('#errobc, .modalmask').show();
            GoBottom();
            //
        }
    }
    else if (dados.StatusCode == 0) {
        $('.btcontinuar').unbind('click');
        $('.btcontinuar').bind('click', function () {
            $('#modalcupom, .modalmask').hide();
            return false;
        });
        $('#modalcupom, .modalmask').show();
        window.location = "mobile.html#detalhes";
    }
}
//## Add cupom digital - fim ############################################

//Redireciona
function Redireciona() {
    if (!Storage.get('AcaoRedirect'))
        window.location = "#home";
    else
        window.location = Storage.get('AcaoRedirect');

    Storage.remove('Acao');
    Storage.remove('Redirect');
}
//## Redireciona - fim ##################################################

//Reenvio de senha
function ReenvioDeSenha() {
    var param = {
        EmailouCpf: $('#txtEmailOuCpf').val()
    }

    $.ajax({
        type: "POST",
        url: urlDados + "UserLogin/EsqueciSenha",
        //url: "http://localhost:2236/UserLogin/EsqueciSenha",
        data: param,
        success: SucessoReenvioDeSenha,
        dataType: "json"
    });
}

function SucessoReenvioDeSenha(dados) {
    if (dados == "OK") {
        $().toastmessage('showSuccessToast', 'Senha reenviada com sucesso!');
    }
    else {
        alert("Os dados informados não foram encontrados");
    }
}
//## Reenvio de senha - fim ###########################################

//Alterar recebimento de informativos
function LoadInformativo() {
    if (!Storage.get('Usuario')) {
        Storage.set('Acao', 'informativo-altera');
        Storage.set('Redirect', '#');
        window.location = "#login";
    }
    else {
        window.location = "#informativo-altera";
        var usuarioObj = Storage.get('Usuario');
        if (usuarioObj.News)
            $('input[name=cbxPromoAltera]').attr('checked', true);
        if (usuarioObj.Mailing)
            $('input[name=cbxPubliAltera]').attr('checked', true);
    }
}

function AlteraRecebimentoInformativo() {
    var usuarioObj = Storage.get('Usuario');
    usuarioObj.News = $("input[name='cbxPubliAltera']").is(':checked') ? true : false;
    usuarioObj.Mailing = $("input[name='cbxPubliAltera']").is(':checked') ? true : false;

    Storage.set('Usuario', usuarioObj);
    GravaDadosUsuario();
}

function ValidaDadosUsuario() {
    var userId = 0;
    var userNome = "";
    var oldData;
    if (Storage.get('Usuario')) {
        oldData = Storage.get('Usuario');
        userId = oldData.Id;
        userNome = oldData.Nome;
    }

    if ($('#txtNome').val() == "") {
        alert("Você precisa preencher o campo NOME");
        $('#txtNome').focus();
        return false;
    } else if (isValidDate($('#txtData').val())) {
        alert("DATA DE NASCIMENTO inválida!");
        $('#txtData').focus();
        return false;
    } else if (isNaN($('#txtCep').val())) {
        alert("O CEP deve ser preenchido apenas com números");
        $('#txtCep').focus();
        return false;
    } else if ($('#txtEmail1').val() == "") {
        alert("Você precisa preencher o campo E-MAIL");
        $('#txtEmail1').focus();
        return false;
    } else if ($('#txtEmail2').val() == "") {
        alert("Você precisa preencher o campo Confirmação de e-mail");
        $('#txtEmail2').focus();
        return false;
    } else if ($('#txtEmail1').val() != $('#txtEmail2').val()) {
        alert("Os campos E-MAIL e confirmação do E-MAIL devem ser iguais");
        $('#txtEmail2').focus();
        return false;
    } else if (isNaN($('#txtCpf').val())) {
        alert("O CPF deve ser preenchido apenas com números");
        $('#txtCpf').focus();
        return false;
    } else if (!ValidaCpf($('#txtCpf').val())) {
        alert("O CPF inválido!");
        $('#txtCpf').focus();
        return false;
    } else if ($('#txtSenhaCad').val() == "" && userId == 0) {
        alert("Você precisa preencher o campo SENHA");
        $('#txtSenha').focus();
        return false;
    } else { //Alteração
        if (userId > 0) { //Alteração
            usuarioObj = Storage.get('Usuario');
            usuarioObj.Nome = userNome;
            usuarioObj.Sexo = $('input[type="radio"][name=rdlSexo]:checked').val();
            usuarioObj.DtNasc = $('#txtData').val();
            usuarioObj.Email = $('#txtEmail1').val();
            usuarioObj.Cep = $('#txtCep').val().replace('-', '');
            usuarioObj.News = $("input[name='cbxNews']").is(':checked') ? true : false;
            usuarioObj.Mailing = $("input[name='cbxPubli']").is(':checked') ? true : false;
            usuarioObj.CPF = $('#txtCpf').val().replace('.', '').replace('-', '');
        } else { //Inclusão
            var usuarioObj = {
                Id: 0,
                Nome: $('#txtNome').val(),
                Sexo: $('input[type="radio"][name=rdlSexo]:checked').val(),
                DtNasc: $('#txtData').val(),
                Token: "",
                Email: $('#txtEmail1').val(),
                Senha: $('#txtSenhaCad').val(),
                Cep: $('#txtCep').val().replace('-', ''),
                News: $("input[name='cbxNews']").is(':checked') ? true : false,
                Mailing: $("input[name='cbxPubli']").is(':checked') ? true : false,
                CPF: $('#txtCpf').val().replace('.', '').replace('-', ''),
                StatusCode: 0
            };
        }
        Storage.set('Usuario', usuarioObj);
        GravaDadosUsuario();
    }
}

function GravaDadosUsuario() {
    var usuarioObj = Storage.get('Usuario');
    var param = {
        userId: usuarioObj.Id,
        Nome: usuarioObj.Nome,
        DtNasc: usuarioObj.DtNasc,
        Sexo: usuarioObj.Sexo,
        Email: usuarioObj.Email,
        Password: usuarioObj.Senha,
        Cep: usuarioObj.Cep,
        Cpf: usuarioObj.CPF,
        News: usuarioObj.News,
        Mailing: usuarioObj.Mailing,
        Origem: "W", //WebApp
        Token: usuarioObj.Token
    }

    //Update
    if (usuarioObj.Id > 0) {
        $.ajax({
            type: "POST",
            url: urlDados + "UserAccount/UpdateAccountInfo2",
            data: param,
            success: SucessoGravaDadosUsuario,
            dataType: "json"
        });
    } //Inclusão
    else {
        $.ajax({
            type: "POST",
            url: urlDados + "UserAccount/RegisterNewAccount2",
            data: param,
            success: SucessoGravaDadosUsuario,
            dataType: "json"
        });
    }
}

function SucessoGravaDadosUsuario(dados) {
    if (dados.StatusCode == 0) {
        _gaq.push(['_trackEvent', 'Cadastro', 'Efetuado']);
        //Scripts de Conversão do Google
        //$('#cadastro_adw_converion').load('cadastro_adw_conversion.html');
        //$("#cadastro_adw_converion").attr("src", "cadastro_adw_conversion.html");
        //@Fim
        if (Storage.get('Cupom')) {
            var cupomObj = Storage.get('Cupom');
            if (Storage.get('Acao') == "add-cupom-digital")
                AddCupomDigital(cupomObj.CupomId);
            else
                SendByEmail(cupomObj.CupomId, cupomObj.Motel, cupomObj.Titulo);
        }
        else {
            var usuarioObj = Storage.get('Usuario');
            usuarioObj.Id = dados.UserId;
            usuarioObj.Token = dados.Token;
            Storage.set('Usuario', usuarioObj);
            $().toastmessage('showSuccessToast', 'Dados alterados com sucesso!');
        }
    }
    else
        $().toastmessage('showErrorToast', 'Não foi possível alterar os dados. Tente novamente mais tarde. Erro: ' + dados.StatusCode);

}
//## Recebimento - fim ###########################################

//Cupons digitais
function LoadCuponsDigitais() {
    if (!Storage.get('Usuario')) {
        Storage.set('Acao', 'lista-cupom-digital');
        Storage.set('Redirect', '#cupons-digitais');
        window.location = "#login";
    }
    else {
        //window.location = "#cupons-digitais";
        var usuarioObj = Storage.get('Usuario');

        var param = {
            userId: usuarioObj.Id,
            token: usuarioObj.Token
        }

        $.ajax({
            type: "POST",
            url: urlDados + "UserDiscount/GetUserDiscounts",
            data: param,
            success: SucessoLoadCuponsDigitais,
            dataType: "json"
        });
    } //else
}


function SucessoLoadCuponsDigitais(dados) {
    var cupons = dados.UserDiscounts;
    var motelCupomId = "";
    var motelId = "";

    if (cupons.length > 0) {
        $('#meus-cupons').empty();
        $.each(cupons, function (i, cupom) {
            //Quebra
            if (motelId != cupom.MotelId) {
                motelId = cupom.MotelId;
                motelCupomId = "#motel_cupom_" + cupom.MotelId;
                var newMotel = $('.accord').clone();
                var motel_cupomId = "#motel_cupom_" + cupom.MotelId;
                newMotel.addClass("wrapper_cupom");
                newMotel.attr("id", "motel_cupom_" + cupom.MotelId);
                newMotel.find("a").html(cupom.MotelName);
                $('#meus-cupons').append(newMotel);
                $(motel_cupomId).removeClass('accord');
                $(motel_cupomId).removeAttr('style');

            }

            var newCupom = $('.cupom-dados').clone();
            var validade = cupom.ExpireDate; //+ " - " + cupom.ExpireDate.substring(8, 2) + "/" + cupom.ExpireDate.substring(5, 2) + "/" + cupom.ExpireDate.substring(0, 4);
            newCupom.find(".cupom-titulo").html(cupom.DiscountTitle);
            newCupom.find(".cupom-validade").html('Este cupom expira em: ' + validade);
            newCupom.find(".cupom-descricao").html(cupom.Description);
            newCupom.find(".cupom-remover").html("<a href='#' onclick='ExcluiCupom(" + cupom.DiscountId + ");' class='cupom-bt'>remover da lista</a>");
            $(motelCupomId).append(newCupom.html());
        });

        $(".cupom-dados-2").hide(); //Mostra todos os accordions fechados
        $(".cupom a").click(function () {
            $($(this).parent().parent()).find(".cupom-dados-2").toggle();
        });

        $(".cupom a").click(function () {

            if ($(this).hasClass('aberto')) {
                $(this).removeClass('aberto');
            } else {
                $(this).addClass('aberto');
            }
        });
    } else {
        $('#meus-cupons').html("Você não possui cupons digitais adicionados ao seu cadastro.");
    }
}
//Exclui cupom digital
function ExcluiCupom(cupomId) {
    var usuarioObj = Storage.get('Usuario');

    var param = {
        userId: usuarioObj.Id,
        discountId: cupomId,
        token: usuarioObj.Token
    }

    $.ajax({
        type: "POST",
        url: urlDados + "UserDiscount/DeleteUserDiscount",
        data: param,
        success: SucessoExcluiCupom,
        dataType: "json"
    });

}

function SucessoExcluiCupom(dados) {
    if (dados.StatusCode != 1) {
        LoadCuponsDigitais();
        $().toastmessage('showSuccessToast', 'Cupom excluido com sucesso!');
    }
    else
        $().toastmessage('showErrorToast', 'Não foi possível excluir o cupom. Tente novamente mais tarde. Erro: ' + dados.StatusCode);
}
//## Cupons digitais - fim ###########################################

//Motéis favoritos / MeusMoteis
function LoadMeusMoteis() {
    if (!Storage.get('Usuario')) {
        Storage.get('Acao', 'moteis-favoritos');
        Storage.get('Redirect', '#moteis-favoritos');
        window.location = "#login";
    }
    else {
        var usuarioObj = Storage.get('Usuario');
        var param = {
            userId: usuarioObj.Id,
            token: usuarioObj.Token
        }

        $.ajax({
            type: "POST",
            url: urlDados + "FavoriteMotel/GetFavoriteMotels",
            data: param,
            success: SucessoLoadMeusMoteis,
            dataType: "json"
        });
    }
}

function SucessoLoadMeusMoteis(dados) {
    var favoritos = dados.FavoriteMotels;
    var categNomeArray = ["Favoritos", "Sonho de Consumo", "Para uma Data Especial", "Perto de Casa", "Perto do Trabalho", "Perto da Casa Dele(a)", "Para o Dia-a-Dia", "Lista Negra"];
    var CategoriaId = "";

    if (favoritos.length > 0) {
        $('#meus-moteis .lista').empty();
        $.each(favoritos, function (i, favorito) {
            //Quebra
            if (CategoriaId != favorito.CategoryId) {
                CategoriaId = favorito.CategoryId;
                meuMotelId = "#meu_motel_" + favorito.MotelId;
                var newFavorito = $('.accord').clone();
                newFavorito.addClass("wrapper_cupom");
                newFavorito.attr("id", "meu_motel_" + favorito.MotelId);
                var index = parseInt(favorito.CategoryId);
                index--;
                newFavorito.find("a").html(categNomeArray[index]);
                $('#meus-moteis .lista').append(newFavorito);
                $(meuMotelId).removeClass('accord');
                $(meuMotelId).removeAttr('style');
            }

            var newFavorito = $('.meus-mts-dados').clone();
            newFavorito.find(".meus-mts-titulo").html("<a href='#detalhes' onclick='LoadDetalhesMotel(" + favorito.MotelId + ");' class=''>" + favorito.MotelName + "</a>");
            newFavorito.find(".meus-mts-endereco").html(favorito.Address);
            var newCss = "star" + favorito.Rating;
            newFavorito.find(".meus-mts-star-rating").removeClass("meus-mts-star-rating").addClass(newCss);
            newFavorito.find(".meus-mts-remover").html("<a href='#' onclick='ExcluiMeusMoteis(" + favorito.FavoriteMotelId + ");'>Remover</a>");
            $(meuMotelId).append(newFavorito.html());
        });

        $(".favoritos-dados").toggle(); //Mostra todos os accordions fechados
        $(".cupom a").click(function () {
            $($(this).parent().parent()).find(".favoritos-dados").toggle();
        });

        $(".cupom a").click(function () {

            if ($(this).hasClass('aberto')) {
                $(this).removeClass('aberto');
            } else {
                $(this).addClass('aberto');
            }
        });
    } else {
        $('#meus-moteis .lista').html("Você não possui nenhum motel adicionado à sua lista.");
    }
}

//Exclui Motel Favorito
function ExcluiMeusMoteis(motelId) {
    var usuarioObj = Storage.get('Usuario');

    var param = {
        userId: usuarioObj.Id,
        favoriteMotelId: motelId,
        token: usuarioObj.Token
    }

    $.ajax({
        type: "POST",
        url: urlDados + "FavoriteMotel/DeleteFavoriteMotel",
        data: param,
        success: SucessoExcluiMeusMoteis,
        dataType: "json"
    });
}

function SucessoExcluiMeusMoteis(dados) {
    if (dados.StatusCode != 1) {
        LoadMeusMoteis();
        $().toastmessage('showSuccessToast', 'Motel removido com sucesso!');
    }
    else
        $().toastmessage('showErrorToast', 'Não foi possível removido. Tente novamente mais tarde. Erro: ' + dados.StatusCode);
}
//## Cupons digitais - fim ###########################################

function BuscaPorNome(element) {
    var key = $(element).parent().find('.search').val();

    var geo = Storage.get('Geo');
    if (!geo)
        geo = geoDefault;

    if (key.trim() == "") {
        alert("O campo de busca não pode estar vazio");
        return false;
    }
    else if (key.trim().length < 2) {
        alert("Digite pelo menos 2 caracteres");
    }
    else {
        $('.loader').show();
        $('.mask').show();
        var param = {
            key: key,
            latitude: geo.Latitude,
            longitude: geo.Longitude
        }

        $.ajax({
            type: "POST",
            url: urlDados + "Motel/GetBuscaGenerica",
            //url: "http://localhost:2236/Motel/GetBuscaGenerica",
            data: param,
            success: SucessoBuscaPorNome,
            dataType: "json"
        });
    }
}

function SortByNomePlano(a, b) {
    var aName = a.Nome.toLowerCase();
    var bName = b.Nome.toLowerCase();
    return a.Plano - b.Plano;//&& ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function SucessoBuscaPorNome(dados) {
    if (dados.length == 0) {
        alert("Não foi encontrado nenhum resultado para sua busca");
    } else {

        window.location = "#buscaPorNome";
        var tipoArray = ["Motel", "Bairro", "Cidade"];
        var tipoAnt = "";
        var IdAnt = "";
        $('#pre-result').empty();

        dados = dados.sort(SortByNomePlano);

        $.each(dados, function (i, result) {
            //Quebra
            if (tipoAnt != result.Tipo) {
                tipoAnt = result.Tipo;
                var newTipo = $('.pre-result-sep').clone();
                newTipo.removeAttr('style');
                newTipo.removeAttr('class');
                newTipo.attr('class', 'sep');
                newTipo.attr("id", tipoArray[parseInt(result.Tipo)]);
                newTipo.html(tipoArray[parseInt(result.Tipo)])
                $('#pre-result').append(newTipo);
            }

            var newItem = $('#pre-result-item').clone();
            newItem.removeAttr('id');
            newItem.removeAttr('style');
            newItem.removeAttr('class');
            newItem.data('id', result.Id);
            newItem.find("a").html(result.Nome + " - " + result.Complemento.trim());
            if (result.Tipo == "0") {
                var texto = "<li id='motel-" + result.Id + "'" + "onclick='LoadDetalhesMotel(" + result.Id + ")'>";
                texto = texto + "<div class='premium-left'/><div class='formatLogoMotel'>";
                var logo = result.Logo.replace(new RegExp(/\\/g), '/');
                if (logo.trim() == "")
                    texto = texto + "<img src='" + urlImg + "imagens/logotipos/out.gif" + "'/>";
                else
                    texto = texto + "<img src='" + urlImg + logo.trim() + "'/>";
                texto = texto + "</div></div>";
                texto = texto + "<div class='premium-right'/>";
                texto = texto + "<span class='nome'>" + result.Nome + "</span>";
                texto = texto + "<span class='endereco'>" + result.Complemento + "</span>";
                texto = texto + "</div>";
                texto = texto + "</li>"
                $('#pre-result').append(texto);
            }
            else {
                if (IdAnt != result.Id) {
                    IdAnt = result.Id;
                    var valor = "LoadMoteisPorRegiao(" + result.Tipo + "," + result.Id + ")"
                    newItem.find("a").attr('href', '#buscaPorNome');
                    newItem.find("a").addClass('porregiao');
                    newItem.find("a").attr('onclick', valor);
                    $('#pre-result').append(newItem);
                }
            }
            /*
            if (result.Tipo == "0")
                $('#pre-result').append(texto);
            else
                $('#pre-result').append(newItem);
                */
        });
    }
    $('.loader').hide();
    $('.mask').hide();
}

function LoadMoteisPorRegiao(tipo, id) {
    var geo = Storage.get('Geo');
    if (!geo)
        geo = geoDefault;

    var param = {
        tipo: tipo,
        id: id,
        latitude: geo.Latitude,
        longitude: geo.Latitude,
        pagina: 0
    }

    $.ajax({
        type: "POST",
        url: urlDados + "Motel/GetPorRegiao",
        data: param,
        success: SucessoLoadMoteisPorRegiao,
        dataType: "json"
    });
}

function SucessoLoadMoteisPorRegiao(dados) {
    $("#pre-result").empty();
    $.each(dados.Motels, function (i, item) {
        var km = item.Distance.toString();
        var texto = "<li id='motel-" + item.MotelId + "'" + ">";
        texto = texto + "<a href='#detalhes' onclick='LoadDetalhesMotel(" + item.MotelId + ")' >";
        texto = texto + "<div class='premium-left'/><div class='formatLogoMotel'>";
        texto = texto + "<img src='" + item.Logo.replace(new RegExp(/\\/g), '/') + "'/>";
        texto = texto + "</div></div>";
        texto = texto + "<div class='premium-right'/>";
        texto = texto + "<span class='nome'>" + item.MotelName + "</span>";
        texto = texto + "<span class='endereco'>" + item.City + " - " + item.Uf + "</span>";
        texto = texto + "</div>";
        texto = texto + "</a></li>"
        $("#pre-result").append(texto);
    });
}

//Valida CPF
function ValidaCpf(cpf) {
    if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" ||
        cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" ||
        cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" ||
        cpf == "88888888888" || cpf == "99999999999")
        return false;

    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    else
        return true;
}
//Valida CPF - Fim ////////////////////////////////////////////////

//Valida Data
function isValidDate(date) {
    var valid = true;
    var date = date.replace("/-/g", "");
    var month = parseInt(date.substring(0, 2), 10);
    var day = parseInt(date.substring(2, 4), 10);
    var year = parseInt(date.substring(4, 8), 10);

    if ((month < 1) || (month > 12)) valid = false;
    else if ((day < 1) || (day > 31)) valid = false;
    else if (((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day > 30)) valid = false;
    else if ((month == 2) && (((year % 400) == 0) || ((year % 4) == 0)) && ((year % 100) != 0) && (day > 29)) valid = false;
    else if ((month == 2) && ((year % 100) == 0) && (day > 29)) valid = false;

    return valid;
}
//Valida Data - Fim /////////////////////////////////////////////////////

//Mapa
function MostraMapa() {
    $('.loader').show();
    $('.mask').show();
    if (!Storage.get('Motel')) {
        $('.loader').hide();
        $('.mask').hide();
        alert("Não foi possível determinar a localização do motel");
    }
    else {
        var Motel = Storage.get('Motel');
        initialLocation = new google.maps.LatLng(Motel.Latitude, Motel.Longitude);
        var myOptions = {
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("geo"), myOptions);
        map.setCenter(initialLocation);

        var marker = new google.maps.Marker({
            position: initialLocation,
            map: map,
            title: "<img src=" + Motel.Logo_p.replace(new RegExp(/\\/g), '/') + ">" + Motel.Nome + "<br>" + Motel.Endereco + Motel.Endereco + "<a href='#' onclick='TracarRotaGoogle();'>Como chegar</a>"
        });

        var infowindow = new google.maps.InfoWindow({
            content: "<img src=" + Motel.Logo_p.replace(new RegExp(/\\/g), '/') + " class='logo-mapa'>" + "<span class='nome-mapa'>" + Motel.Nome + "</span>" + "<span class='endereco-mapa'>" + Motel.Endereco + "</span>" + "<hr />" + "<a href='#' onclick='TracarRotaGoogle();' class='bt-rota'>Traçar Rota<span></span></a>"
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
        $('.loader').hide();
        $('.mask').hide();
    }//else
}

function TracarRotaGoogle() {
    var r = confirm("Deseja traçar rota?")
    if (r == true) {
        var Usuario = Storage.get('Geo');
        var Motel = Storage.get('Motel');
        //https://maps.google.com.br/maps?saddr=-23.594824,-46.692688&daddr=-23.508904,-46.626717
        window.location = "https://maps.google.com.br/maps?saddr=" + Usuario.Latitude + "," + Usuario.Longitude + "&daddr=" + Motel.Latitude + "," + Motel.Longitude;
    }
    else {
        return false;
    }
    var Usuario = Storage.get('Geo');
    var Motel = Storage.get('Motel');
    //        initialLocation = new google.maps.LatLng(Motel.Latitude, Motel.Longitude);
}
// Mapa - fim //////////////////////////////////////////////////////////////////////////////////////