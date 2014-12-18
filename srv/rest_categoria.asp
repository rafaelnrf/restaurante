<%
' Conexão com MySQL
Response.AddHeader "Access-Control-Allow-Origin", "*"
set conn = server.CreateObject("ADODB.CONNECTION")
'strconn = "Driver={SQL Server};Server=ABQM11\sqlexpress;Database=eventos;Uid=sa;Pwd=sacpd;"
conn.connectionTimeout = 2
conn.Open("DRIVER={MySQL ODBC 5.1 Driver};SERVER=mysql01.penabola.com.br;PORT=3306;DATABASE=penabola;USER=penabola;PASSWORD=bilong1;OPTION=3;")
'conn.open strConn
conn.CommandTimeout = 60
%>
<!--#include file="JSON_2.0.4.asp"-->
<!--#include file="JSON_UTIL_0.1.1.asp"-->
<%
response.ContentType = "application/json; charset=utf-8"
'sql = "select * from chez_cliente where flag_ativo = 'S' and categoria = " + request("categoria_id")
sql = "select  chez_cliente.* , chez_categoria.propaganda from chez_cliente, chez_categoria where chez_categoria.categoriaId = chez_cliente.categoria and flag_ativo = 'S' and chez_cliente.categoria = " + request("categoria_id") + " order by chez_cliente.ordem"
response.write QueryToJSON(conn,sql).flush
conn.close
%>