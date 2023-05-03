let cont = document.querySelector('.container');
let input = document.querySelector('.input');
let textarea = document.querySelector('.textarea');
let button = document.querySelector('.button');

let contHTML = "";
let article = {};
let articles = [];
let _title = [], _text = []; 

// Обробка кліку на контейнері зі статтями
cont.addEventListener('click', (ev) => {
	let idNum = ev.target.id.slice(5);
	if (idNum) {
		for (let i=0; i<_text.length; i++) {
			_text[i].style.display = 'none';
		}
		_text[idNum].style.display = 'block';
	}	
});

// відображення заголовків і статей
const render = () => {
  // cont.removeEventListener('click', listener);
	contHTML = "";
	for (let i=0; i<articles.length; i++) {
		contHTML += `<p class="title" id="title${i}">${articles[i].title}</p>
					<p class="text" id="text${i}">${articles[i].text}</p>`;		
	}
	cont.innerHTML = contHTML;
	_title = cont.querySelectorAll('.title');
	_text = cont.querySelectorAll('.text');	
};

// запит існуючих статей на сервері і відображення заголовків
const getArticles = async () => {
	const result = await axios.get('/article');
    articles = result.data.slice();
	render();
  };

  getArticles();

 
// відправка нової статті на сервер, отримання і відображення оновленого масиву
const sendArticle = async () =>  {
	try {
	  const result = await axios.post('/add', article);
	  articles = result.data.slice(); // Дані, які повернув сервер
	  console.log(result.data); 
      render();
	} catch (error) {
	  console.error(error); // Обробка помилок
	}
  };

// обробка натискання кнопки для відправки статті
  button.addEventListener('click', (ev) => {
	let z = input.value;
	let t = textarea.value; 
	if (z && t) {
		article = {};
		article.title = z;
		article.text = t;
		input.value = '';
		textarea.value = '';
		sendArticle();		
	}
  }
  );

  
