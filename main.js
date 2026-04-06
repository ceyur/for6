let properties = {};
let routes = {};
let defaultRoute = null;
const content = document.querySelector("#content");
fetch('./properties.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Ошибка загрузки');
    }
    return response.json();
  })
  .then(data => {
		properties = data;
    	console.log(data);
		initRouter();
		console.log("ïnitRouter");
  });

const close = document.querySelector(".close");
close.addEventListener("click", () => {
	const path = "/u";
	console.log("close.click");
	// Переход по маршруту
	history.pushState({}, "", path);
	handleRoute();
});

var button = document.querySelector(".button");
if (pageYOffset > window.innerHeight) {
	button.style.display = "flex";
}
else {
	button.style.display = "none";
}
window.addEventListener("scroll", () => {
	if (pageYOffset > window.innerHeight) {
		button.style.display = "flex";
	}
	else {
		button.style.display = "none";
	}
});
/*document.querySelector(".button").style.display=pageYOffset>window.innerHeight?"flex":"none";
window.addEventListener('scroll',()=>{document.querySelector(".button").style.display=pageYOffset>window.innerHeight?"flex":"none"});*/

// Инициализация маршрутов
function initRouter() {
	// Определяем маршруты и их обработчики
	routes = {
		"/for6": () => {
			Object.values(properties.text).forEach((e) => {
				p = document.createElement("p");
				p.innerHTML = "<b>" + e.name + "</b>: " + e.attribute + "; – " + e.description +"<br><i>" + e.name + ": " + e.example + ";" + "</i> " + "(" + e.default + ")";
				content.append(p);
			});
		}
	};

	defaultRoute = "/for6";

	// Слушаем изменения URL (кнопки браузера)
	window.addEventListener("popstate", handleRoute);

	// Инициализация маршрута при загрузке
	handleRoute();
}

// Обработка маршрута
function handleRoute() {
	console.log("window.location.pathname: ", window.location.pathname);
	const path = window.location.pathname;
	const route = routes[path] ? path : defaultRoute;
	routes[route]();
}
