#压缩代码
压缩自己小项目的代码。

##项目结构

	index.html	
	---script
	---style
	---image
	
##项目输出目录
	
	/dest
		index.html
		---js
		------main.min.js
		---css
		------main.min.css
		---img

##处理

	对js代码进行 合并，压缩，加密.
	对css进行 合并，压缩.

##运行命令
	
	node index.js --path="c://code//" (windows)
	node index.js --path="/home/code" (*unix)