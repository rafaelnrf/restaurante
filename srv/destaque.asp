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
sql = "select * from chez_destaque  where flag = 'S' and inicio <= now() and fim >= now()"
SELECT * FROM `chez_destaque` WHERE inicio <= now() and fim >= now()
response.write QueryToJSON(conn,sql).flush
conn.close
%>