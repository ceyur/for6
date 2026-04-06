let properties = {};
const defaultRoute = "/for6";
const content = document.querySelector("#content");
const close = document.querySelector(".close");
const button = document.querySelector(".button");
const information = document.querySelector("#information");
const button_info = document.querySelector("#button_info");
const routes = {
	"/for6": () => {
		Object.values(properties.text).forEach((e) => {
			p = document.createElement("p");
			p.innerHTML = "<b>" + e.name + "</b>: " + e.value + "; – " + e.description +"<br><i>" + e.name + ": " + e.example + ";" + "</i> " + "(" + e.default + ")";
			content.append(p);
		});
	}
};

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

close.onclick = () => {
	const path = "/for6";
	console.log("close.click");
	information.style.display = "none";
	document.querySelector("#information+a").style.display = "none";
	// Переход по маршруту
	history.pushState({}, "", path);
	handleRoute();
};
button_info.onclick = () => {
	information.style.display = "block";
	document.querySelector("#information+a").style.display = "block";
	document.querySelector("#information+a+*").style.position = "relative";
	document.querySelector("#information+a+*").style.width = "auto";
};

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

// Инициализация маршрутов
function initRouter() {
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
