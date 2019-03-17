<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
<h2>Hello Worldsdfsdfsdfdfsf!</h2>
<form action="lctr" method="post">
		id：<input type="text" name="id"  value="活动id"><br />
		标题：<input type="text" name="title"  value="测试标题"><br />
		 地址：<input type="text" name="address" value="这是地址"><br />
		手机：<input type="text" name="phone" value="13612345678"><br />
		活动开始时间：<input type="text" name="s" value="2017-09-27 22:24"><br />
		活动结束时间：<input type="text" name="e" value="2017-10-27 22:24"><br />
		 报名开始时间：<input type="text" name="ps" value="2017-09-13 00:00"><br />
		报名结束时间：<input type="text" name="pe" value="2017-10-27 22:24"><br />
		活动海报：<input type="text" name="placard" value="http:www.sdfsdf"><br />
		活动人数：<input type="text" name="plimit" value="123"><br />
		活动简述：<input type="text" name="describe" value="这是简述内容"><br />
		活动内容：<input type="text" name="content" value="这是活动内容"><br />
		提示信息：<input type="text" name="rm" value="这是提示内容"><br />
		
		活动标签：<br />
       <input type="checkbox" name="tags1" value="1" />tags1_1<br />
       <input type="checkbox" name="tags1" value="2" />tags1_2<br />
        <hr>
        人群标签：<br />
        <input type="checkbox" name="tags2" value="1" />tags2_1<br />
        <input type="checkbox" name="tags2" value="2" />tags2_2<br />
        <input type="checkbox" name="tags2" value="3" />tags2_3<br />
        
        <input type="submit"/>
</form>

<hr />

<form action="user/login" method="post">
		user：<input type="text" name="user"  value="testuid"><br />
		pwd：<input type="text" name="pwd"  value="123456"><br />
		
        
        <input type="submit"/>
</form>

</body>
</html>
