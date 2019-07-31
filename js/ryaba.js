const dataURL = "https://api.myjson.com/bins/jcmhn";

let vars = document.getElementsByClassName('form-control'), // массив инпутов var1...var6 
	speach = document.getElementById('speach'); // инпут speach

// Запрос данных по dataURL и вывод текстовых данных
function handleData() {	
	$.getJSON(dataURL,function(data){
		let text = data.text + "";	// преобразование текстовых данных в строку
		$("#result").text(text);	// вывод text в элементе с id = 'result'
	});
}

// Функция замены элементов текста, взятого из dataURL
function handleButton() {
	$.getJSON(dataURL,function(data){
		let newText = data.text + "";	// преобразование текстовых данных в строку

			while(newText.search(/{var/g) != -1){	// метод search ищет первое вхождение подстроки {var, если нашел то = 1, если нет то = -1   
				for (let i = 0; i < vars.length; i++) { // перебор массива vars
					let j = i+1; // для индексов var в тексте, т.к. они начинаются с 1
					newText = newText.replace(`{var${j}}`, vars[i].value);	// метод replace заменяет первую найденную подстроку {var${j}} на значение инпута var[i]
					newText = newText.replace("{speach}", `"${speach.value}"`);	// метод replace заменяет первую найденную подстроку {speach} на значение инпута {speach} взятого в кавычки
				}
			}
			$("#result").text(newText);	// вывод newText в элементе с id = 'result'
	});
}

function init() {
	handleData();
	$("#button-fetch").click(handleButton); // вызов функиции handleButton по событию click на элементе с id = 'button-fetch'
}

$(document).ready(init);
