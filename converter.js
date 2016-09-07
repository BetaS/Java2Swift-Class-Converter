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
	
	// Ŭ���� �̸� ã��
	var class_name = "";
	pattern = regex("class\\s+(.+?)\\s+\\{");
	match = pattern.exec(source);
	class_name = match[1];
	
	// package ���� ����
	pattern = regex("package\\s+(.*);\\s*");
	source = source.replace(pattern, "");
	
	// import ����
	pattern = regex("import\\s+(.*);\\s*");
	source = source.replace(pattern, "");
	
	// this -> self ����
	pattern = regex("this\\.");
	source = source.replace(pattern, "self.");
	
	// null -> nil ����
	pattern = regex("null");
	source = source.replace(pattern, "nil");
	
	// ���� ���� ����
		// ���Խ� �ִ°�
	pattern = regex("private\\s+(.+?)\\s+(.+?)\\s*\\=\\s*(.+?);");
	source = source.replace(pattern,  function(all, type, name, expr){
		return 'var '+name+": "+type_format(type)+" = "+expr+";";
	});
	
		// ���Խ� ���°�
	pattern = regex("private\\s+(.+?)\\s+(.+?)\\s*;");
	source = source.replace(pattern,  function(all, type, name){
		return "var "+name+": "+type_format(type)+" = "+type_expr(type)+";";
	});
		
	// ������ ����
	pattern = regex("(public\\s+|private\\s+|protected\\s+|)"+class_name+"\\((.*?)\\)\\s*{");
	source = source.replace(pattern,  function(all, t, params){
		return "init("+type_params(params)+") {";
	});
	
	// �Լ� �Ķ���� ����
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