function regex(str) {
	return new RegExp(str, 'gm');
}

function type_format(type) {
	var format = {"int": "Int", "double": "Double", "float": "Float", "boolean": "Bool", "long": "Long"};
	if(type in format) {
		return format[type];
	}
	return type;
}
function type_expr(type) {
	var format = {"int": "0", "double": "0.0", "float": "0.0", "boolean": "false", "long": "0", "String": "\"\""};
	return format[type];
}

function type_params(params) {
	var pattern = regex("(.*)\\s+(.*)");
	var params = params.split(',');
	params.forEach(function (item, idx) {
		item = item.trim();
		params[idx] = item.replace(pattern,  function(all, type, name){
			return name+": "+type_format(type);
		});
	});
	return params.join(", ");
}

function convert() {
	var from = document.getElementById("from");
	var to = document.getElementById("to");
	
	var source = from.innerHTML;
	var pattern;
	
	// 클래스 이름 찾기
	var class_name = "";
	pattern = regex("class\\s+(.+?)\\s+\\{");
	match = pattern.exec(source);
	class_name = match[1];
	
	// package 정의 삭제
	pattern = regex("package\\s+(.*);\\s*");
	source = source.replace(pattern, "");
	
	// import 삭제
	pattern = regex("import\\s+(.*);\\s*");
	source = source.replace(pattern, "");
	
	// this -> self 변경
	pattern = regex("this\\.");
	source = source.replace(pattern, "self.");
	
	// null -> nil 변경
	pattern = regex("null");
	source = source.replace(pattern, "nil");
	
	// 변수 선언 변경
		// 대입식 있는것
	pattern = regex("private\\s+(.+?)\\s+(.+?)\\s*\\=\\s*(.+?);");
	source = source.replace(pattern,  function(all, type, name, expr){
		return 'var '+name+": "+type_format(type)+" = "+expr+";";
	});
	
		// 대입식 없는것
	pattern = regex("private\\s+(.+?)\\s+(.+?)\\s*;");
	source = source.replace(pattern,  function(all, type, name){
		return "var "+name+": "+type_format(type)+" = "+type_expr(type)+";";
	});
		
	// 생성자 변경
	pattern = regex("(public\\s+|private\\s+|protected\\s+|)"+class_name+"\\((.*?)\\)\\s*{");
	source = source.replace(pattern,  function(all, t, params){
		return "init("+type_params(params)+") {";
	});
	
	// 함수 파라미터 변경
	pattern = regex("(public\\s+|private\\s+|protected\\s+)(.*?)\\s+(.*?)\\((.*?)\\)\\s*{");
	source = source.replace(pattern,  function(all, t, type, name, params){
		var rtn_type = "";
		if(type != 'void') {
			rtn_type = " -> "+type_format(type);
		}
		return "func "+name+"("+type_params(params)+")"+rtn_type+" {";
	});
	
	
	to.innerHTML = source.trim();
}