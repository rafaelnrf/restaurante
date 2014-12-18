-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb2.1
-- http://www.phpmyadmin.net
--
-- Máquina: mysql01.penabola.com.br
-- Data de Criação: 09-Jul-2014 às 15:13
-- Versão do servidor: 5.1.54
-- versão do PHP: 5.3.3-7+squeeze18

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+0mani0:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de Dados: `penabola`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `chez_categoria`
--

CREATE TABLE IF NOT EXISTS `chez_categoria` (
  `categoriaId` int(11) DEFAULT NULL,
  `categoria` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `logo` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `flag` char(5) COLLATE latin1_general_ci DEFAULT NULL,
  `texto` varchar(200) COLLATE latin1_general_ci DEFAULT NULL,
  `propaganda` varchar(200) COLLATE latin1_general_ci DEFAULT NULL,
  `target` char(10) COLLATE latin1_general_ci DEFAULT NULL,
  `ordem` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

INSERT INTO `chez_categoria` (`categoriaId`, `categoria`, `logo`, `flag`, `texto`, propaganda,  target, ordem) VALUES
(1, 'A dois', 'ico_dois.png', 'S', '', 'thumb_2014-12-04-010639_logo_amma_choco.png', '', 10),
(2, 'Em família', 'ico_familia.png', 'S', '', 'thumb_2014-11-26-075828_logoentrecotepa.jpg', '', 20),
(3, 'Com amigos', 'ico_amigos.png', 'S', '', 'thumb_2014-11-26-081925_logo_cervejaria.jpg', '', 30),
(4, 'Business', 'ico_negocios.png', 'S', '', 'thumb_2014-12-02-075254_prop_cantaloup_.jpg', '', 40),
(5, 'Chefs', 'ico_chef.png', 'S', '', 'thumb_2014-11-26-073544_logo_icif_color.jpg', '', 50)

--
-- Estrutura da tabela `chez_cliententre
e`
--
--create database chezmenu
--use chezmenu
--DROP TABLE `chez_cliente`;
CREATE TABLE IF NOT EXISTS `chez_cliente` (
  `id` int(11) DEFAULT NULL,
  `categoria` int(11) COLLATE latin1_general_ci DEFAULT NULL,
  `cliente` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `descricao` varchar(200) COLLATE latin1_general_ci DEFAULT NULL,
  `imagem` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `logo` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `img_prato` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `endereco` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `bairro` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `cidade` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `estado` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `cep` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `telefone` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `contato` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `site` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `site_chezcroque` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `email` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `horario` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `culinaria` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `lugares` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `manobrista` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `rolha` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `informacoes` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `cartoes` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `lat` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `long` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `km` varchar(10) COLLATE latin1_general_ci DEFAULT NULL,
  `flag_ativo` char(5) COLLATE latin1_general_ci DEFAULT NULL,
  `flag_reserva` char(5) COLLATE latin1_general_ci DEFAULT NULL,
  `flag_desconto` char(5) COLLATE latin1_general_ci DEFAULT NULL,
  `flag_cortesia` char(5) COLLATE latin1_general_ci DEFAULT NULL,
  `planoredef` char(5) COLLATE latin1_general_ci DEFAULT NULL,
  `texto` varchar(200) COLLATE latin1_general_ci DEFAULT NULL,
  `target` char(10) COLLATE latin1_general_ci DEFAULT NULL,
  `ordem` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--delete from `chez_cliente`;
-- 2-Família
INSERT INTO `chez_cliente` VALUES
(10,1, 'Chou', 'Mezzes, porções com forte sotaque mediterrâneo, um lugar charmoso, aconchegante, ideal para DOIS.', 'chou.jpg', 'logo_chou.png', 'chou_prato.jpg',
'Rua Mateus Grou, 345', 'Pinheiros ', 'São Paulo', 'SP', '', '11 3083-6998',
 '', 'www.chou.com.br', 'www.chezcroque.com.br/chezprefere/1/16/CHOU',
 '', 'de Terça a Sábado a partir das 20h00',  'Variada', '35', 'R$ 13,00', 'R$ 35,00', 
 'Couvert:  R$ 9,00', 'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N', '0', 'Mezzes, porções com forte sotaque mediterrâneo, um lugar charmoso, aconchegante, ideal para DOIS.', '_self', 10),
(12,1, 'Bottega Bernacca', 'Descolado, Pequeno, Charmoso, Gostoso e Italianíssimo. Algumas opções de pratos, muitos sanduíches, aperitivos, vinhos e diversão. ', 'bottega.jpg', 'logo_bottega.jpg', 'bottega_prato.jpg', 
 'Rua Padre João Manuel, 826', 'Jardim Paulista', 'São Paulo', 'SP', '', '11 3586-7103',
  '', 'www.bottegabernacca.com.br', 'www.chezcroque.com.br/chezprefere/2/302/Bottega%20Bernacca', 
  'reservas@bottegabernacca.com.br', 
  '12h/0h00 ( fecha dom.)',  'Italiana', '0', 'R$ 0,00', 'R$ 0,00', 'infos', 
  'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N', '0', 'Descolado, Pequeno, Charmoso, Gostoso e Italianíssimo. Algumas opções de pratos, muitos sanduíches, aperitivos, vinhos e diversão. ', '_self', 12),
(14,1, 'Geiko San ', 'Os sushis transformam o momento da refeição em imenso prazer, cores e sabores para degustar a DOIS. ', 'geiko.jpg', 'logo_geiko.png', 'geiko_prato.jpg',
 'Rua Haddock Lobo, 1416', 'Jardim Paulista', 'São Paulo', 'SP', '', '11 3061-0150', '', '', 
 'www.chezcroque.com.br/chezprefere/2/305/Geiko%20San
', '', '19h30/0h (qui. a sáb até 0h30; fecha dom.)',  'Japonesa', '90', 'R$ 25,00', 'Não cobra',
  'infos', 'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N', '0', 'Os sushis transformam o momento da refeição em imenso prazer, cores e sabores para degustar a DOIS. ', '_self', 14),
(16,1, 'La Cocotte', 'Um francês elegante e renovado.  Pratos clássicos, sanduíches típicos, carta variada de vinhos. Sobremesas realmente especiais. ', 'lacocote.jpg', 'logo_lacocotte.jpg', 'lacocotte_prato.jpg',
 'Al. Ministro Rocha Azevedo, 1153', 'Jardim Paulista', 'São Paulo', 'SP', '01410-003', '11 3081-0568', '', '', 
 'www.chezcroque.com.br/chezprefere/2/330/La20Cocotte', '', 
'12h/15h e 19h/0h ( qui.e sex. até 1h00; sáb. almoço até 17h00 e jantar até 1h; dom só almoço até 17h)',  'Francesa', '58', 'R$ 20,00', 'R$ 60,00',
  'infos', 'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N', '0', 
  'Um francês elegante e renovado.  Pratos clássicos, sanduíches típicos, carta variada de vinhos. Sobremesas realmente especiais. ', '_self', 16),
(18,1, 'La Frontera', 'Gastronomia e cultura se fundem neste ambiente rústico e ao mesmo tempo delicado, da mais legítima comida portenã. ', 'frontera.jpg', 'logo_frontera.jpg', 'frontera_prato.jpg',
 'Rua Coronel Eusébio, 105', 'Higienópolis ', 'São Paulo', 'SP', '', '11 3159-1197', '', 'www.restaurantelafrontera.com.br', 
 'www.chezcroque.com.br/chezprefere/1/28/La%20Frontera', '', ' 12h00/15h00 e 19h30/0h00 (sex.até 1h00; sáb. 12h30/1h; dom.só 
almoço 12h30/17h30)',  'Variada', '66', 'R$ 10,00', 'R$ 40,00',
  'Couvert: grátis', 'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N', '0', 
  'Gastronomia e cultura se fundem neste ambiente rústico e ao mesmo tempo delicado, da mais legítima comida portenã. ', '_self', 18),
(19,1, 'Ici Bistrô', 'Uma visita à França, passando por Higienópolis. Clássicos da culinária francesa, com muito charme e elegância. ', 'ici.jpg', 'logo_ici.gif', 'ici_prato.jpg',
 'Rua Pará, 36', 'Higienópolis ', 'São Paulo', 'SP', '', '11 3257-4064', '', 'www.icibistro.com.br', 
 'www.chezcroque.com.br/chezprefere/2/80/Ici%20Bistr%C3%B4', '', ' 12h/15h e 19h/0h( sex.até 0h30; sáb.almoço 12h30/16h
e jantar 19h30/0h30; dom.só almoço 12h30/17h00 )',  'Francesa ', '50', 'R$ 14,00', 'R$ 50,00',
  'Couvert: R$ 8,90 ', 'todos', '-23.605292','-46.6929234', '', 'N', 'N', 'N', 'N', '0', 
  'Uma visita à França, passando por Higienópolis. Clássicos da culinária francesa, com muito charme e elegância. ', '_self', 19),

(20,2, 'L''Entrecote Paris', 'Uma experiência inesquecível com a cozinha francesa para degustar com a família. ', 'entrecote.jpg', 'logo_entrecote.jpg', 'entrecote_prato.jpg', 
'Rua Pedroso Alvarenga, 1135', 'Itaim Bibi', 'São Paulo', 'SP', '05431-012', '11 3078-6942',
 '', 'www.lentrecotedeparis.com.br', 'www.chezcroque.com.br/chezprefere/2/21/L%C2%B4Entrec%C3%B4te%20de%20Paris', 
 'contato@lentrcotedeparis.com.br', ' 12h/15h e 19h30/0h (sex. e sáb sem intervalo até 1h; dom. só almoço  até 18h )',  'Francesa', '84', 'R$ 10,00', 'R$ 30,00', 
 'infos', 'todos', '-23.605292','-46.6929234', '',  'S', 'N', 'N', 'N',  '0',
 'Uma experiência inesquecível com a cozinha francesa para degustar com a família. ', '_self', 20),
(22,2, 'Tre Bicchieri', 'Cozinha italiana tradicional para toda a família. Requinte no Itaim Bibi.', 
'trebicchieri1.jpg', 'logo_trebicchieri.png',  'trebicchieri_prato.jpg', 
'Rua General Mena Barreto, 765', 'Itaim-Bibi', 'São Paulo', 
'SP', '', '11 3885-4004', '', 'http://www.trebicchieri.com.br/', 
'www.chezcroque.com.br/chezprefere/2/325/Tre%20BICCHIERI ', 'contato@trebicchieri.com.br/',
 '12h/15h e 19h30/23h30 (sex. almoço até 15h30 e jantar até 0h30; sáb. almoço até 16h e jantar até 0h30;
 dom. só almoço até 17h )',  'Italiana', '90', 'R$ 20,00', '', 'infos', 
 'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N',  '0',
 'Cozinha italiana tradicional para toda a família. Requinte no Itaim Bibi.', '_self', 22),
(24,2, 'Tappo Trattoria', 'Serviço exemplar e a melhor cozinha italiana, com receitas classicas para toda a família. ', 'tappo.jpg', 'logo_tappo.jpg',  'tappo_prato.jpg', 
'Rua da Consolação, 2967', 'Cerqueira Cesar', 'São Paulo', 
'SP', '', '11 3063-4864', '',  'www.tappo.com.br/', 'www.chezcroque.com.br/chezprefere/2/333/Tappo20Trattoria', '',
 '12h/15h e 19h/0h ( sex. jantar 19h30/0h30; sáb.12h30/16h e jantar 19h30/0h30; dom. só almoço 12h30/17h; fecha segunda )',  'Italiana', '', 'R$ 20,00', 'R$ 0,00', 'infos', 
 'todos', '-23.605292','-46.6929234', '',  'S', 'N', 'N', 'N',  '0',
 'Serviço exemplar e a melhor cozinha italiana, com receitas classicas para toda a família. ', '_self', 24),
(26,2, 'Tasca do Zé e <BR> da Maria', 'Bonito, agradável, e uma excelente comida portuguesa de altíssimo padrão para encantar as famílias.', 'tasca.jpg', 'logo_tasca.jpg',  'tasca_prato.jpg', 
'Rua dos Pinheiros, 434', 'Pinheiros', 'São Paulo', 
'SP', '05422-000', '11 3062-5722', '', 'www.tascadozeedamaria.com.br', 
'www.chezcroque.com.br/chezprefere/2/250/Tasca%20do%20Z%C3%A9%20e%20da%20Maria', '',
 '12h/15h e 19 h/23h30 ( sex. até 0h30; sáb sem intervalo até 0h30; dom. só almoço até 18 h )',  'Portuguesa', '50', 'R$ 15,00', 'R$ 50,00', 'infos', 
 'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N',  '0',
 'Bonito, agradável, e uma excelente comida portuguesa de altíssimo padrão para encantar as famílias.', '_self', 26),
(27,2, 'Zucco', 'Um espaço charmoso, gostoso e aconchegante, para a família desfrutar da excelente cozinha italiana. ', 'zucco.jpg', 'logo_zucco.png',  'zucco_prato.jpg', 
'Rua Haddock Lobo, 1416', 'Jardim Paulista', 'São Paulo', 
'SP', '01414-002', '11 3897-0666', '', 'www.zuccorestaurante.com.br', 
'www.chezcroque.com.br/chezprefere/1/266/Zucco', '',
 ' 12h/0h ( sex.e sáb até 1h30; dom. até 23 h )',  'Italiana', '85', 'R$ 20,00', 'R$ 40,00', 'infos', 
 'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N',  '0',
 'Um espaço charmoso, gostoso e aconchegante, para a família desfrutar da excelente cozinha italiana. ', '_self', 27),
(28,2, 'Casa Europa', 'A família pode fazer suas refeições em um delicioso espaço de culinária italiana e excelentes vinhos. ', 'europa.jpg', 'logo_europa.jpg',  'europa_prato.jpg', 
'Alameda Gabriel Monteiro da Silva, 726', 'Jardim Paulistano', 'São Paulo', 
'SP', ' 01420-000', '11 3063-5577', '', 'ww.casaeuropa.com.br', 
'www.chezcroque.com.br/chezprefere/2/309/Casa%20Europa', '',
 '12h/15h e 19h/0h ( sex. almoço até 16h; sáb. sem intervalo até 22h; seg. até 23h )',  'Italiana', '96', 'R$ 20,00', 'R$ 50,00', 'infos', 
 'todos', '-23.605292','-46.6929234', '', 'N', 'N', 'N', 'N',  '0',
 'A família pode fazer suas refeições em um delicioso espaço de culinária italiana e excelentes vinhos. ', '_self', 28),
(29,2, 'Girarrosto', 'Bar, Restaurante e Ateliê de Pães. Massas da Toscana, cardápio variado e um forno a lenha. Um momento que pode ser único.', 'girarrosto.jpg', 'logo_girarrosto.jpg', 'girarrosto_prato.jpg',
 'Avenida Cidade Jardim, 56', 'Jardim Europa', 'São Paulo', 'SP', '04543-010', '11 3062-6000', '', 'www.girarrosto.com.br', 
 'www.chezcroque.com.br/chezprefere/1/271/Girarrosto', '', 'Segunda à quinta - 12h às 15h e 19h à 0h
Sexta - 12h às 15h e 19h à 1h
Sábado - 12h às 17h e 19h à 1h
Domingo - 12h às 17h e 19h à 0h',  'Italiana', '295', 'R$ 18,00', 'R$ 68,00',
  'infos', 'todos', '-23.605292','-46.6929234', '', 'N', 'N', 'N', 'N', '0', 
  'Bar, Restaurante e Ateliê de Pães. Massas da Toscana, cardápio variado e um forno a lenha. Um momento que pode ser único.', '_self', 29),

(40,4, 'Cantaloup', 'Um dos restaurantes mais bonitos da cidade e uma cozinha contemporânea da melhor qualidade, com serviço impecável.', 'cantaloup.jpg', 'logo_cantaloup.jpg',  'cantaloup_prato.jpg', 
'Rua Manoel Guedes, 474', 'Itaim Bibi', 'São Paulo', 'SP', '', '11 3078-3445', 
'', 'www.cantaloup.com.br', 'www.chezcroque.com.br/chezprefere/1/173/Cantaloup',
'', '12h/15h e 19h30/0h
(sex .até 1h ;sáb. só jantar até 1h ;dom. só almoço )',  'Contemporâneo', '150', 'R$ 13,00 / R$ 15,00', 'R$ 80,00', 'Couvert: R$ 13,00 almoço de segunda a sexta e R$ 15,00 nos demais horários',
 'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N', '0', 'Um dos restaurantes mais bonitos da cidade e uma cozinha contemporânea da melhor qualidade, com serviço impecável.', '_self', 40),
(42,4, 'A Bela Sintra', 'Inaugurado em 2004,  o restaurante A Bela Sintra, comandado por Carlos Bettencourt, é referência quando o assunto é culinária portuguesa.', 'bela_sintra.jpg', 'logo_bela_sintra.jpg',  'bela_sintra_prato.jpg', 
'Rua Bela Cintra, 2325', 'Jardim Paulista', 'São Paulo', 'SP', '', '11 3891-0740', '', 'www.abelasintra.com.br', 
'www.chezcroque.com.br/chezprefere/2/336/Bela%20Sintra', '', '12h/15h30 e 19h/1h 
( sáb. sem intervalo; dom. sem intervalo até 23 h )',  'Portuguesa', '72', 'R$ 25,00', 'R$ 0,00', '- Ar condicionado
- Acesso para deficiente
- Wi-fi
- Aceita reservas
Sommelier: Augusto Monteiro
Chef: Valderi Gomes', 'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N', '0', 
'Inaugurado em 2004,  o restaurante A Bela Sintra, comandado por Carlos Bettencourt, é referência quando o assunto é culinária portuguesa.', '_self', 42),
(44,4, 'Figueira Rubaiyat', 'Roteiro obrigatório do turismo de negócios paulistano. Cozinha contemporânea e multicultural.', 'rubaiyat.jpg', 'logo_figueira.png',  'figueira_prato.jpg', 
'Rua Haddock Lobo, 1738', 'Jardim Paulista', 'São Paulo', 
'SP', '', '11 3087-1399', '', 'www.rubaiyat.com.br', 'contato@ig.com.br',
'www.chezcroque.com.br/chezprefere/1/153/A%20Figueira%20Rubaiyat',  '12h00 /0h30<BR>
(sex. e sáb. até 1h00 ;dom. até 0h00)',  'Variada', '350', 'R$ 15,00', 'Não cobra', 'Couvert: R$ 23,50', 
 'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N',  '0',
 'Roteiro obrigatório do turismo de negócios paulistano. Cozinha contemporânea e multicultural.', '_self', 44),
(46,4, 'Kaá', 'Gastronomia franco-italiana, arquitetura deslumbrante, excepcional para fazer negócios. ', 'kaa.jpg', 'logo_kaa.png', 'kaa_prato.jpg', 
 'Av. Presidente Jucelino Kubitscheck, 279', 'Itaim Bibi', 'São Paulo', 'SP', '',
  '11 3045-0043', '', 'www.kaarestaurante.com.br', 
  'www.chezcroque.com.br/chezprefere/1/108/KA%C3%81', '', '
  12h/15h e 19h/0h (sex. até 1h;sáb.almoço até 17h).',  
  'Franco/Italiano', '182', 'R$ 13,00 e R$ 15,00', 'R$ 80,00', 'Couvert: R$ 13,00 ', 
  'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N', '0', 
  'Gastronomia franco-italiana, arquitetura deslumbrante, excepcional para fazer negócios. ', '_self', 46),
(48,4, 'NB Steak', 'A NB Steak Kubitschek é uma evolução, uma visão renovada do churrasco, um olhar contemporâneo sobre cada detalhe.', 'nb_steak.jpg', 'logo_nb_steak.gif',  'nb_steak_prato.jpg', 
'Avenida Juscelino Kubitschek, 816', 'Itaim Bibi', 'São Paulo', 'SP', '', '11 3031-1204', 
'', 'www.nbsteak.com.br', 'www.chezcroque.com.br/chezprefere/2/331/NB%20Steak', 
'', ' 12h/16h e 19h/0h
( sáb. e dom. 12h/0h)',  'Steak House', '', 'R$ 20,00', '', '',
 'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N', '0', 
 'A NB Steak Kubitschek é uma evolução, uma visão renovada do churrasco, um olhar contemporâneo sobre cada detalhe.', '_self', 48),

(31,3, 'Adega Santiago', 'Carta de vinhos completa, especialidades da Espanha e de Portugal, tapas, sanduíches, frutos do mar e os amigos. ', 'adega.jpg', 'logo_adega.jpg',  'adega_prato.jpg', 
'Rua Sampaio Vidal, 1072', 'Jardim Paulistano', 'São Paulo', 'SP', '', '11 3081-5211', 
'', 'www.adegasantiago.com.br', 'www.chezcroque.com.br/chezprefere/2/76/Adega%20Santiago',
'contato@ig.com.br', '12h/15h e 19h/0h ( sex. e sáb. sem intervalo; dom. sem intervalo até 22h; seg até 23 h)', 
 'Ibérica', '60', 'R$ 19,00', 'R$ 0,00', 'infos', 'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N', '0', 
 'Carta de vinhos completa, especialidades da Espanha e de Portugal, tapas, sanduíches, frutos do mar e os amigos. ', '_self', 31),
(33,3, 'Brera', 'O momento de estar com os amigos, bebericar, antipasti, i panini, i taglieri, i nostri piatti. ', 'brera.jpg', 'logo_brera.png',  'brera_prato.jpg', 
'Rua Ministro Rocha Azevedo, 1068', 'Jardim América', 'São Paulo', 'SP', '01410-002',
 '11 3804-7755', '', 'www.brerapanini.com.br', 
'www.chezcroque.com.br/chezprefere/2/281/Brera',  '', ' 12h/23h30 ( sex. e sáb. até 0h )', 
  'Italiana', '67', 'R$ 20,00', 'R$ 0,00', 'infos', 'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N', '0', 
  'O momento de estar com os amigos, bebericar, antipasti, i panini, i taglieri, i nostri piatti. ', '_self', 33),
(34,3, 'Insalata', 'Para estar com os amigos e degustar aromas, texturas e sabores, nas saladas e nos pratos. ', 'insalata.jpg', 'logo_insalata.jpg', 'insalata_prato.jpg', 
 'Alameda Campinas, 1478', 'Jardins', 'São Paulo', 'SP', '01404-002', '11 2308-9153', 
 '', 'www.insalata.com.br', 'www.chezcroque.com.br/chezprefere/2/242/Insalata',
 '', ' 12h/0h (sex. e sáb. atë 0h/30; dom. até 23h30 )',  'Variada', '100', 'R$ 0,00', 'R$ 0,00',
  'Contato para delivery (11) 3885-1514
Horário de atendimento:
Seg à Sex das 11h30 - 16h e 19h - 23h
Sáb, Dom e Feriados das 12h - 16h e 19h - 23h', 'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N', '0', 
'Para estar com os amigos e degustar aromas, texturas e sabores, nas saladas e nos pratos. ', '_self', 34),
(35,3, 'Le Maison est<BR>Tombée', 'Restaurante e bar com sotaque francês, muito bom humor, decoração típica, e drinques especiais criados por um grande mixologista. ', 'le_maison.jpg', 'logo_maison.jpg', 'maison_prato.jpg', 
'Rua Jerônimo da Veiga, 358', 'Itaim Bibi', 'São Paulo', 'SP', '04536-001',
 '11 3071-2926', '', 'www.maisontombe.com.br', 
'www.chezcroque.com.br/chezprefere/2/279/La%20Maison%20est%20Tomb%C3%A9e',  '', '12h/1 ( dom. e seg. até 0h )',  
 'Francesa / Variada', '140', 'R$ 18,00', 'R$ 0,00', 'infos', 'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N', '0', 
 'Restaurante e bar com sotaque francês, muito bom humor, decoração típica, e drinques especiais criados por um grande mixologista. ', '_self', 35),
(36,3, 'Hamburgueria<BR>Nacional', 'Definitivamente o Hambúrguer Perfeito existe: a qualidade dos ingredientes e do preparo, um ambiente super aconchegante e um serviço adequado.', 'hamburgueria.jpg', 'logo_hamburgueria.jpg', 'hamburgueria_prato.jpg',
 'Rua Leopoldo Couto Magalhães Junior, 822', 'Itaim Bibi', 'São Paulo', 'SP', '04542-000', '11 3073-0428', '', 'www.hamburguerianacional.com.br', 
 'www.chezcroque.com.br/chezprefere/1/123/Hamburgeria%20Nacional', '', ' 11h30/0h (sex. até 1h; sáb. 12h/1h; dom. 12h/0h',  'Hamburgueria', '200', 'R$ 13,00', 'Não cobra',
  'infos', 'todos', '-23.605292','-46.6929234', '', 'N', 'N', 'N', 'N', '0', 
  'Definitivamente o Hambúrguer Perfeito existe: a qualidade dos ingredientes e do preparo, um ambiente super aconchegante e um serviço adequado.', '_self', 36),
(38,3, 'Riviera', 'Bar e Restaurante, ambiente retrô, pratos e lanches deliciosos, música e charme com os amigos.  ', 'riviera.jpg', 'logo_riviera.jpg',  'riviera_prato.jpg', 
'Av Paulista, 2584', 'Paulista', 'São Paulo', 'SP', '01310-300', '11 3258-1268', '', 'www.rivierabar.com.br',
'www.chezcroque.com.br/chezprefere/1/312/Riviera', 
 '', ' 12h/0h ( qui. até 1h; sex. e sáb. até 2h )',  'Variada', '0', 'R$ 15,00', 'R$ 0,00', 'infos',
  'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N', '0', 
  'Bar e Restaurante, ambiente retrô, pratos e lanches deliciosos, música e charme com os amigos.  ', '_self', 38),

(50,5, 'Attimo', 'O interior de São Paulo, sob forte inspiração italiana. O Chef. Jefferson Rueda imprimiu sua personalidade. ', 'attimo.jpg', 'logo_attimo.png',  'attimo_prato.jpg', 
'Rua Diogo Jácome, 341', 'Vila Nova Conceição', 'São Paulo', 'SP', '04512-001', 
'11 5054-9999', '', 'www.attimorestaurante.com.br', 
'www.chezcroque.com.br/chezprefere/1/306/Attimo', '', ' 12h/15h e  19h30/23h30 (sex. até 0h; sáb. almoço até 16h e jantar até 0h; dom. só almoço até 17h; fecha seg. )',  
'Italiano', '60', 'R$ 25,00', 'R$ 89,00', 'infos', 'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N', '0', 
'O interior de São Paulo, sob forte inspiração italiana. O Chef. Jefferson Rueda imprimiu sua personalidade.', '_self', 50),
(52,5, 'Loi Ristorantino', 'A mais sofisticada comida italiana, ingredientes maravilhosos e cardápio impecável, do Chef Salvatori Loi.', 'loi.jpg', 'logo_loi.jpg',  'loi_prato.jpg', 
'Rua Mello Alves, 674', 'Jardim Paulista', 'São Paulo', 'SP', '', '11 3063-0977', 
'', '', 'www.chezcroque.com.br/chezprefere/1/314/Loi', '', '12h/15h e 19h/0h ( sex. almoço até 16h e jantar até 1h; sáb. almoço até 17h e jantar até 1h; dom. só almoço até 17h )',  
'Italiana', '80', 'R$ 20,00', 'R$ 0,00', 'infos', 'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N', '0', 
'A mais sofisticada comida italiana, ingredientes maravilhosos e cardápio impecável, do Chef Salvatori Loi.', '_self', 52),
(54,5, 'Jun Sakamoto', 'Exclusividade, elegância, sabor esmerado, criatividade e muito mais... Extraordinária vivência na melhor culinária japonesa.', 'jun.jpg', 'logo_jun.jpg', 'jun_prato.jpg',
 'Rua Lisboa, 55', 'Pinheiros', 'São Paulo', 'SP', '05413-000', '11 3088-6019', '', '', 
 'www.chezcroque.com.br/chezprefere/1/180/Jun%20Sakamoto', '', '19h/0h ( sex. e sáb até 1h; fecha dom.)', 
  'Japonesa', '36', 'R$ 15,00', 'R$ 30,00',
  'infos', 'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N', '0', 
  'Exclusividade, elegância, sabor esmerado, criatividade e muito mais... Extraordinária vivência na melhor culinária japonesa.', '_self', 54),
(56,5, 'Italy', '"mangia, che te fa bene!”. O norte da Itália servido com capricho e profissionalismo. Massas, queijos, antepastos e conservas feitos na própria casa. ', 'italy.jpg', 'logo_italy.png', 'italy_prato.jpg',
 'Rua Oscar Freire, 450', 'Jardim Paulista', 'São Paulo', 'SP', '01411-000', '11 3168-0833', '', 'www.italyrestaurante.com.br', 
 'www.chezcroque.com.br/chezprefere/1/206/Italy', '', ' 12h/15h30 e 19h/0h ( sex. até 1h : sáb. sem intervalo até 1h; dom. sem intervalo até 22h )',  'Italiana', '180', 'R$ 14,00', 'R$ 48,00',
  'infos', 'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N', '0', 
  '"mangia, che te fa bene!”. O norte da Itália servido com capricho e profissionalismo. Massas, queijos, antepastos e conservas feitos na própria casa. ', '_self', 56),
(57,5, 'Kinoshita', 'O Chef. Tsuyoshi Murakami imprime um tom ousado ao tradicional. Considerado o melhor japonês de São Paulo.   ', 'kinoshita.jpg', 'logo_kinoshita.jpg', 'kinoshita_prato.jpg', 
 'Rua Jacques Felix, 405', 'Vila Nova Conceição', 'São Paulo', 'SP', '', 
 '11 3849-6940', '', 'www.restaurantekinoshita.com.br', 
 'www.chezcroque.com.br/chezprefere/2/74/Kinoshita', '', '12h/15h e 19h/0h ( sáb. almoço até 16 h; fecha dom.)',  'Japonesa', '70', 'R$ 15,00', 'R$ 70,00', 'Couvert: R$ 12,00', 
 'todos', '-23.605292','-46.6929234', '', 'S', 'N', 'N', 'N', '0', 'O Chef. Tsuyoshi Murakami imprime um tom ousado ao tradicional. Considerado o melhor japonês de São Paulo.  ', '_self', 57),
(58,5, 'Momotaro ', 'Total respeito dos admiradores da culinária japonesa. O Chef. Adriano Kanashiro é autor de combinações de sabor e beleza.  ', 'momotaro.jpg', 'logo_momotaro.jpg',  'momotaro_prato.jpg', 
'Rua Diogo Jácome, 591', 'Vila Nova Conceição', 'São Paulo', 'SP', '04512-001', 
'11 3842-5590', '', 'www.restaurantemomotaro.com.br', 'www.chezcroque.com.br/chezprefere/1/230/Momotaro', '',
 '12h/15h e 19h/0h (sex. até 0h30; sáb. almoço até 16h e jantar até 0h30; dom. almoço até 17h e jantar até 
23h30; fecha seg )', 
 'Japonesa', '0', 'R$ 0,00', 'R$ 0,00', 'infos', 'todos', '-23.605292','-46.6929234', '', 'N', 'N', 'N', 'N', '0', 
 'Total respeito dos admiradores da culinária japonesa. O Chef. Adriano Kanashiro é autor de combinações de sabor e beleza.  ', '_self', 58),
(59,5, 'Maní', 'Os Chefs. Helena Rizzo e Daniel Redondo têm influências catalãs e um toque de cozinha moderna. ', 'mani.png', 'logo_mani.gif', 'mani_prato.jpg', 
'Rua Joaquim Antunes, 210', 'Jardim Paulistano', 'São Paulo', 'SP', '', '11 3085-4148', 
'', 'www.restaurantemani.com.br', 'www.chezcroque.com.br/chezprefere/1/88/Man%C3%AD', '',
 '12h/15h e 20h/23h30 ( sex. jantar 20h30/0h; sáb. almoço 13h/16h e jantar 20h30/0h; dom. só almoço
13h/16h; fecha seg )',  
'Contemporânea ', '70', 'R$ 12,00 - Almoço e R$ 15,00 - Jantar', 'R$ 50,00', 'Couvert Almoço: R$ 11,00
Couvert Jantar: R$ 13,00 ', 'todos', '-23.605292','-46.6929234', '', 'N', 'N', 'N', 'N', '0',
'Os Chefs. Helena Rizzo e Daniel Redondo têm influências catalãs e um toque de cozinha moderna. ', '_self', 59)


--
-- Estrutura da tabela `chez_destaque`
--

CREATE TABLE IF NOT EXISTS `chez_destaque` (
  `Id` int(11) DEFAULT NULL,
  `Titulo` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `Descricao` varchar(200) COLLATE latin1_general_ci DEFAULT NULL,
  `Imagem` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `Url` varchar(50) COLLATE latin1_general_ci DEFAULT NULL,
  `Inicio` datetime DEFAULT NULL,
  `Fim` datetime DEFAULT NULL,
  `Flag` char(5) COLLATE latin1_general_ci DEFAULT NULL,
  `Texto` varchar(200) COLLATE latin1_general_ci DEFAULT NULL,
  `Target` char(10) COLLATE latin1_general_ci DEFAULT NULL,
  `ordem` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Extraindo dados da tabela `chez_destaque`
--

INSERT INTO `chez_destaque` (`Id`, `Titulo`, `Descricao`, `Imagem`, `Url`, `Inicio`, `Fim`, `Flag`, `Texto`, `Target`, ordem) VALUES
(1, 'Le Maison Tombé', '', 'maison_prato.jpg', '', '2014-11-01 00:00:00', '2014-12-30 00:00:00', 'S', 'Com localização privilegiada.', '_self', 1),
(2, 'Kinoshita', '', 'kinoshita_prato.jpg', '', '2014-11-01 00:00:00', '2014-12-30 00:00:00', 'S', 'Com localização privilegiada.', '_self', 5),
(3, 'Chou', '', 'chou_prato.jpg', '', '2014-11-01 00:00:00', '2014-12-30 00:00:00', 'S', 'Com localização privilegiada.', '_self', 10),
(4, 'L''Entrecote Paris', '', 'entrecote_prato.jpg', '', '2014-11-01 00:00:00', '2014-12-30 00:00:00', 'S', 'Com localização privilegiada, o Kaa situa-se na Rua Tal.', '_self', 15),
(5, 'Cantaloup', '', 'cantaloup_prato.jpg', '', '2014-11-01 00:00:00', '2014-12-30 00:00:00', 'S', 'Com localização privilegiada, o Kaa situa-se na Rua Tal.', '_self', 20);

 
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- Google maps
http://maps.googleapis.com/maps/api/geocode/json?latlng=-23.605292,-46.6929234&sensor=true_or_false
http://maps.googleapis.com/maps/api/geocode/xml?address=975+Avenida%20Engenheiro%20Lu%C3%ADs%20Carlos%20Berrini,+%20975-977&sensor=true_or_false

/*
SELECT chez_categoria.categoria, cliente, imagem, chez_cliente.logo, img_prato
FROM  `chez_cliente` , chez_categoria
WHERE chez_cliente.categoria = categoriaId
ORDER BY categoria
*/
