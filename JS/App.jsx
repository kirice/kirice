
const { useState, useEffect } = React;

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const [authFormData, setAuthFormData] = useState({
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  phone: ''
});

  // Пользователи
  const [users, setUsers] = useState([]);
  // Компоненты (лак, доска, ступень)
  const [components, setComponents] = useState({ lac: [], board: [], step: [] });

  // Для формы добавления
  const [componentType, setComponentType] = useState('lac');
  const [componentName, setComponentName] = useState('');
  const [componentPrice, setComponentPrice] = useState('');
  const [componentDescription, setComponentDescription] = useState('');
 


  // Для калькулятора ЛКМ
  const [selectedLac, setSelectedLac] = useState('Лак прозрачный');
  const [stepWidth, setStepWidth] = useState('');
  const [stepLength, setStepLength] = useState('');
  const [numSteps, setNumSteps] = useState('');
  const [layers, setLayers] = useState('');
  const [consumption, setConsumption] = useState('');
  const [price, setPrice] = useState('');
  const [result, setResult] = useState(null);

  

  // Иконки в виде SVG
const icons = {
  wood: React.createElement('svg', {
    className: "w-8 h-8 text-green-600 mb-3",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  },
    React.createElement('path', {
      d: "M5 3v4M3 5h4M6 17v4m-2-2l2-2m2 2l2-2m3-8a9 9 0 11-18 0 9 9 0 0118 0z",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }),
    React.createElement('path', {
      d: "M12 8v8m-4-4h8",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  ),
  lacquer: React.createElement('svg', {
    className: "w-8 h-8 text-indigo-600 mb-3",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  },
    React.createElement('path', {
      d: "M13 10V3L4 14h7v7l9-11h-7z",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }),
    React.createElement('path', {
      d: "M17 18H7a2 2 0 01-2-2V4a2 2 0 012-2h5l7 7v10a2 2 0 01-2 2z",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  ),
  fasteners: React.createElement('svg', {
    className: "w-8 h-8 text-yellow-600 mb-3",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  },
    React.createElement('path', {
      d: "M13 10V3L4 14h7v7l9-11h-7z",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }),
    React.createElement('path', {
      d: "M17 18H7a2 2 0 01-2-2V4a2 2 0 012-2h5l7 7v10a2 2 0 01-2 2z",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  ),
  pdf: React.createElement('svg', {
    className: "w-8 h-8 text-red-600 mb-3",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  },
    React.createElement('path', {
      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }),
    React.createElement('path', {
      d: "M15 3v6a2 2 0 002 2h6",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  ),
  database: React.createElement('svg', {
    className: "w-8 h-8 text-blue-600 mb-3",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  },
    React.createElement('rect', {
      x: "3",
      y: "3",
      width: "18",
      height: "18",
      rx: "2",
      ry: "2",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }),
    React.createElement('path', {
      d: "M3 9h18M3 15h18M12 3v18",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  )
};


  const renderFeatures = () => (
  React.createElement('div', {
    className: "mb-10"
  },
    // Заголовок
    React.createElement('h2', {
      className: "text-xl font-semibold text-gray-800 mb-6 flex items-center"
    },
      React.createElement('svg', {
        className: "w-5 h-5 mr-2 text-indigo-600",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      },
        React.createElement('path', {
          d: "M9 12l2 2 4-4m5.586 5.586a2 2 0 01-2.828 0L7 12m0 0l-2-2m2 2l2 2M7 12h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2z",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        })
      ),
      React.createElement('span', null, "Основные функции")
    ),

    // Боксы
    React.createElement('div', {
       className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    }, [
        // Функция 1: Расчёт древесины
        React.createElement('div', {
          key: 'wood',
          className: "bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-green-500"
        },
          icons.wood,
          React.createElement('h3', {
            className: "text-lg font-semibold text-gray-800 mb-2"
          }, "Расчёт древесины"),
          React.createElement('p', {
            className: "text-gray-600 text-sm"
          }, "Автоматический расчёт объёмов древесины с учётом толщины ступеней, количества и коэффициента запаса.")
        ),

       // Функция 2: Расчёт ЛКМ
        React.createElement('div', {
          key: 'lacquer',
          className: "bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-indigo-500"
        },
          icons.lacquer,
          React.createElement('h3', {
            className: "text-lg font-semibold text-gray-800 mb-2"
          }, "Расчёт ЛКМ"),
          React.createElement('p', {
            className: "text-gray-600 text-sm"
          }, "Точный расчёт лакокрасочных материалов с учётом площади покрытия, количества слоёв и нормы расхода.")
        ),

        // Функция 3: Расчёт крепежа
        React.createElement('div', {
          key: 'fasteners',
          className: "bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-yellow-500"
        },
          icons.fasteners,
          React.createElement('h3', {
            className: "text-lg font-semibold text-gray-800 mb-2"
          }, "Расчёт крепежа"),
          React.createElement('p', {
            className: "text-gray-600 text-sm"
          }, "Определение количества саморезов, уголков и других крепёжных элементов.")
        ),

        // Функция 4: Экспорт сметы
        React.createElement('div', {
          key: 'pdf',
          className: "bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-red-500"
        },
          icons.pdf,
          React.createElement('h3', {
            className: "text-lg font-semibold text-gray-800 mb-2"
          }, "Экспорт сметы"),
          React.createElement('p', {
            className: "text-gray-600 text-sm"
          }, "Формирование и экспорт сметы в форматах PDF и Excel для согласования с клиентом.")
        ),

        // Функция 5: Централизованная база
        React.createElement('div', {
          key: 'database',
          className: "bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500"
        },
          icons.database,
          React.createElement('h3', {
            className: "text-lg font-semibold text-gray-800 mb-2"
          }, "Централизованная база"),
          React.createElement('p', {
            className: "text-gray-600 text-sm"
          }, "Хранение актуальных цен, норм расхода и типов материалов в единой системе.")
        ),

        // Функция 6: Разграничение прав
        React.createElement('div', {
          key: 'permissions',
          className: "bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-purple-500"
        },
          React.createElement('svg', {
            className: "w-8 h-8 text-purple-600 mb-3",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24"
          },
            React.createElement('path', {
              d: "M9 12l2 2 4-4m5.586 5.586a2 2 0 01-2.828 0L7 12m0 0l-2-2m2 2l2 2M9 12l2 2 4-4",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })
          ),
          React.createElement('h3', {
            className: "text-lg font-semibold text-gray-800 mb-2"
          }, "Разграничение прав"),
          React.createElement('p', {
            className: "text-gray-600 text-sm"
          }, "Клиенты — только просмотр, менеджеры — редактирование материалов и цен.")
        )
      ]
    )
  )
);


//Экспорт в ПДФ
  const exportToPDF = () => {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Используем встроенный шрифт
    doc.setFont('times', 'normal');
    doc.setFontSize(14);

    doc.text("Paint Calculation Result", 16, 20);
    doc.text(`Material Type: ${result.lacName}`, 14, 35);
    doc.text(`Step Width: ${result.stepWidth} m`, 14, 45);
    doc.text(`Step Length: ${result.stepLength} m`, 14, 55);
    doc.text(`Number of Steps: ${result.numSteps} pcs`, 14, 65);
    doc.text(`Number of Layers: ${result.layers}`, 14, 75);
    doc.text(`Consumption Rate: ${result.consumption} L/m²`, 14, 85);
    doc.text(`Price per Liter: ${result.price} RUB`, 14, 95);
    doc.text(`Total Coverage Area: ${result.totalArea} m²`, 14, 110);
    doc.text(`Required Paint Volume: ${result.totalVolume} L`, 14, 120);
    doc.text(`Estimated Cost: ${result.totalPrice} RUB`, 14, 130);

    doc.save("расчёт_лкм.pdf");
  } catch (error) {
    console.error("Ошибка при экспорте в PDF:", error);
    alert("Произошла ошибка при создании PDF. Проверьте консоль для деталей.");
  }
};

  useEffect(() => {
  setAuthFormData({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
}, [authMode]);

useEffect(() => {
  if (currentPage !== 'lkmCalculator') {
    setResult(null);
  }
}, [currentPage]);

  // Загрузка данных с сервера
  useEffect(() => {
  fetch('http://localhost:5000/api/components')
    .then(res => res.json())
    .then(data => {
      setComponents({
        lac: data.filter(c => c.type === 'lac'),
        board: data.filter(c => c.type === 'board'),
        step: data.filter(c => c.type === 'step'),
      });
    })
    .catch(err => console.error('Ошибка:', err));
}, []);

  // Проверка авторизации
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      setIsLoggedIn(true);
      setIsAdmin(role === 'admin');
      // Дополнительно можно проверить роль
    }
  }, []);

  // Обновление цены лака при выборе
  useEffect(() => {
    const selected = components.lac.find(l => l.name === selectedLac);
    if (selected && selected.price) setPrice(selected.price);
  }, [selectedLac, components.lac]);

  // Авторизация
  const handleAuth = async (e) => {
    e.preventDefault();
    const { username, password } = authFormData;

    if (!username || !password) {
      alert('Заполните все поля');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: authFormData.username,
          password: authFormData.password
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || 'Ошибка входа');
        return;
      }

      const data = await res.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        showToast('Вход выполнен успешно! 👋', 'success');
        setCurrentPage('home');

        const decoded = jwt_decode(data.token); // Обратите внимание на НИЖНЕЕ ПОДЧЁРКИВАНИЕ!
        setIsAdmin(decoded.role === 'admin');
        localStorage.setItem('role', decoded.role);
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка при входе');
    }
  };

  //Регистрация пользователя
  //Регистрация пользователя
  const handleRegister = async (e) => {
  e.preventDefault();
  const { username, password, firstName, lastName, phone } = authFormData;

  console.log('Отправляемые данные:', {
    username,
    password,
    firstName,
    lastName,
    phone
  });
  console.log('Отправляемые данные:', authFormData); // Логируем данные
  try {
    const res = await fetch('http://localhost:5000/api/users/register', { // Убедитесь, что порт и путь верны
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, firstName, lastName, phone })
    });
    if (!res.ok) {
      const errorData = await res.json(); // 👈 Получаем точное сообщение об ошибке
      alert(errorData.error || 'Ошибка регистрации');
      return;
    }
    const data = await res.json();
    
    if (res.ok) {
      localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        setAuthMode('login');
        showToast('Успешная регистрация! 🎉', 'success');
    } else {
      alert(data.error || 'Ошибка регистрации');
    }
  } catch (err) {
    console.error(err);
    alert('Ошибка подключения к серверу');
  }
};

  // Выход
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentPage('home');
  };

  // Добавление компонента
  const handleAddComponent = async () => {
  if (!componentName.trim()) return alert('Введите название');

  const newComponent = {
     type: componentType,
     name: componentName
    };

  if (componentPrice) newComponent.price = componentPrice;
  if (componentDescription) newComponent.description = componentDescription;

  try {
    const res = await fetch('http://localhost:5000/api/components/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComponent)
    });

    if (!res.ok) throw new Error('Ошибка добавления');

    const data = await res.json();
    showToast('Компонент добавлен!', 'success');

    // Сброс формы
    setComponentName('');
    setComponentPrice('');
    setComponentDescription('');


    // Обновление списка
    const updated = await fetch('http://localhost:5000/api/components');
    const updatedData = await updated.json();
    setComponents({
      lac: updatedData.filter(c => c.type === 'lac'),
      board: updatedData.filter(c => c.type === 'board'),
      step: updatedData.filter(c => c.type === 'step'),
    });
  } catch (err) {
    console.error(err);
    alert('Ошибка при добавлении компонента');
  }
};

  // Удаление компонента
  const handleRemoveComponent = async (type, id) => {
    await fetch(`http://localhost:5000/api/components/${id}`, {
      method: 'DELETE'
    });

    fetch('http://localhost:5000/api/components')
      .then(res => res.json())
      .then(data => {
        setComponents({
          lac: data.filter(c => c.type === 'lac'),
          board: data.filter(c => c.type === 'board'),
          step: data.filter(c => c.type === 'step'),
        });
      });
      showToast('Компонент удалён!', 'success');
  };

  // Расчёт ЛКМ
  const calculateLKM = () => {
  setResult(null); // Сбрасываем предыдущий результат

  const width = parseFloat(stepWidth);
  const length = parseFloat(stepLength);
  const steps = parseInt(numSteps);

  if (!width || !length || !steps) {
    showToast('Параметры лестницы не указаны!', 'falls');
    return;
  }

  // Расчёт площади
  const areaPerStep = width * length;
  const totalArea = areaPerStep * steps;

  // Расчёт объёма
  const totalVolume = totalArea * consumption * layers;

  // Безопасное преобразование цены
  const numericPrice = Number(price) || 0;

  // Расчёт стоимости
  const totalPrice = totalVolume * numericPrice;

  // Сохраняем результат с округлением
  setResult({
    lacName: selectedLac,
    stepWidth: width.toFixed(2),
    stepLength: length.toFixed(2),
    numSteps: steps,
    layers,
    consumption: consumption.toFixed(2),
    price: numericPrice.toFixed(2),
    areaPerStep: areaPerStep.toFixed(2),
    totalArea: totalArea.toFixed(2),
    totalVolume: totalVolume.toFixed(2),
    totalPrice: totalPrice.toFixed(2)
  });

  // Очищаем форму
  setStepWidth('');
  setStepLength('');
  setNumSteps('');
  setLayers('');
  setConsumption('');
  setPrice('');
};



const renderSettings = () => {
  const typeLabels = {
    lac: 'Лаки',
    board: 'Древесина',
    step: 'Крепёжные материалы'
  };

  const typeIcons = {
    lac: 'https://img.icons8.com/fluency/48/paint-brush.png', 
    board: 'https://img.icons8.com/fluency/48/logs.png', 
    step: 'https://img.icons8.com/fluency/48/screw.png' 
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Управление компонентами</h2>

      {/* Форма добавления */}
      <div className="bg-indigo-50 rounded-lg p-6 mb-10 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-indigo-700">Добавить новый компонент</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select
            value={componentType}
            onChange={e => setComponentType(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="lac">Лаки</option>
            <option value="board">Древесина</option>
            <option value="step">Крепёжные материалы</option>
          </select>
          <input
            value={componentName}
            onChange={e => setComponentName(e.target.value)}
            placeholder="Название"
            className="border px-3 py-2 rounded"
          />
          <input
            value={componentPrice}
            onChange={e => setComponentPrice(e.target.value)}
            placeholder="Цена (руб.)"
            type="number"
            className="border px-3 py-2 rounded"
          />
          <input
            value={componentDescription}
            onChange={e => setComponentDescription(e.target.value)}
            placeholder="Описание компонента"
            className="border px-3 py-2 rounded col-span-1 md:col-span-3"
          />
        </div>
        <button
          onClick={handleAddComponent}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          ➕ Добавить компонент
        </button>
      </div>

      {/* Списки компонентов */}
      <div className="space-y-10">
        {Object.entries(components).map(([type, list]) => (
          <div key={type}>
            <div className="flex items-center mb-4">
              <img src={typeIcons[type]} alt={type} className="w-6 h-6 mr-2" />
              <h3 className="text-xl font-bold text-gray-700">{typeLabels[type]}</h3>
            </div>
            {list.length === 0 ? (
              <p className="text-gray-500">Нет добавленных компонентов.</p>
            ) : (
              <ul className="space-y-4">
                {list.map((item) => (
                  <li
                    key={item.id}
                    className="bg-gray-50 border px-4 py-3 rounded flex flex-col shadow-sm hover:bg-gray-100 transition-all duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-medium">{item.name}</span>
                      <button
                        onClick={() => handleRemoveComponent(type, item.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Удалить
                      </button>
                    </div>

                    {/* Цена */}
                    {item.price && (
                      <div className="mt-1 text-sm text-indigo-700">
                        Цена: <strong>{item.price} руб.</strong>
                      </div>
                    )}

                    {/* Описание */}
                    {item.description && (
                      <div className="mt-2 text-sm text-gray-600 italic">
                        <strong>Описание:</strong> {item.description}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 text-right">
        <button
          onClick={() => setCurrentPage('home')}
          className="text-blue-600 hover:underline text-sm"
        >
          ← Назад на главную
        </button>
      </div>
    </div>
  );
};
// Состояние для управления открытым элементом
const [expandedItemId, setExpandedItemId] = useState(null);

// Страницы компонентов
const renderComponents = () => {
  const componentDetails = {
    'Виды лака': {
      page: 'lacPage',
      icon: 'https://img.icons8.com/color/96/paint-brush.png' 
    },
    'Виды древесины': {
      page: 'boardsPage',
      icon: 'https://img.icons8.com/fluency/96/logs.png' 
    },
    'Виды крепежных материалов': {
      page: 'stepsPage',
      icon: 'https://img.icons8.com/fluency/96/nail.png' 
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Основной блок */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Заголовок и описание */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Каталог материалов</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Выберите категорию материалов, чтобы посмотреть актуальный ассортимент и цены. Все материалы хранятся в централизованной базе данных.
          </p>
        </div>

        {/* Кнопки выбора */}
        <div className="flex flex-col gap-6">
          {Object.entries(componentDetails).map(([name, { page, icon }]) => (
            <div
              key={name}
              onClick={() => setCurrentPage(page)}
              className="bg-indigo-50 hover:bg-indigo-100 cursor-pointer rounded-xl shadow-md transition-all duration-300 p-4 flex items-center"
            >
              <img src={icon} alt={name} className="w-20 h-20 object-contain mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-500">Актуальные цены и характеристики</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Лаки с описанием
const renderLacPage = () => (
  <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Виды лака</h2>

    {components.lac.length > 0 ? (
      <ul className="space-y-2">
        {components.lac.map((lac) => (
          <li key={lac.id}>
            {/* Блок с названием и ценой */}
            <div
              className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg shadow-sm flex items-center justify-between hover:bg-indigo-100 cursor-pointer transition-all duration-300"
              onClick={() => setExpandedItemId(expandedItemId === lac.id ? null : lac.id)}
            >
              <span className="text-lg font-medium text-gray-800">{lac.name}</span>
              <div className="flex items-center space-x-4">
                <span className="text-indigo-700 font-semibold">
                  {lac.price ? `${lac.price} руб.` : 'Цена не указана'}
                </span>
                <span
                  className={`transform transition-transform duration-300 ${
                    expandedItemId === lac.id ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </div>
            </div>

            {/* Раскрытая информация */}
            {expandedItemId === lac.id && lac.description && (
              <div className="mt-2 p-4 bg-gray-50 border-l-4 border-indigo-500 rounded-r text-gray-700 animate-fadeIn">
                <strong>Описание:</strong> {lac.description}
              </div>
            )}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">Нет доступных материалов</p>
    )}

    <div className="text-right mt-6">
      <button
        onClick={() => setCurrentPage('components')}
        className="text-blue-600 hover:underline text-sm"
      >
        ← Назад к компонентам
      </button>
    </div>
  </div>
);

// Древесина с описанием
const renderBoardsPage = () => (
  <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Виды древесины</h2>

    {components.board.length > 0 ? (
      <ul className="space-y-2">
        {components.board.map((board) => (
          <li key={board.id}>
            {/* Блок с названием и ценой */}
            <div
              className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg shadow-sm flex items-center justify-between hover:bg-indigo-100 cursor-pointer transition-all duration-300"
              onClick={() => setExpandedItemId(expandedItemId === board.id ? null : board.id)}
            >
              <span className="text-lg font-medium text-gray-800">{board.name}</span>
              <div className="flex items-center space-x-4">
                <span className="text-indigo-700 font-semibold">
                  {board.price ? `${board.price} руб.` : 'Цена не указана'}
                </span>
                <span
                  className={`transform transition-transform duration-300 ${
                    expandedItemId === board.id ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </div>
            </div>

            {/* Раскрытая информация */}
            {expandedItemId === board.id && board.description && (
              <div className="mt-2 p-4 bg-gray-50 border-l-4 border-indigo-500 rounded-r text-gray-700 animate-fadeIn">
                <strong>Описание:</strong> {board.description}
              </div>
            )}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">Нет доступных материалов</p>
    )}

    <div className="text-right mt-6">
      <button
        onClick={() => setCurrentPage('components')}
        className="text-blue-600 hover:underline text-sm"
      >
        ← Назад к компонентам
      </button>
    </div>
  </div>
);

// Крепёж без описания (пример)
const renderStepsPage = () => (
  <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Крепежные материалы</h2>

    {components.step.length > 0 ? (
      <ul className="space-y-2">
        {components.step.map((step) => (
          <li key={step.id}>
            {/* Блок с названием и ценой */}
            <div
              className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg shadow-sm flex items-center justify-between hover:bg-indigo-100 cursor-pointer transition-all duration-300"
              onClick={() => setExpandedItemId(expandedItemId === step.id ? null : step.id)}
            >
              <span className="text-lg font-medium text-gray-800">{step.name}</span>
              <div className="flex items-center space-x-4">
                <span className="text-indigo-700 font-semibold">
                  {step.price ? `${step.price} руб.` : 'Цена не указана'}
                </span>
                <span
                  className={`transform transition-transform duration-300 ${
                    expandedItemId === step.id ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </div>
            </div>

            {/* Раскрытая информация */}
            {expandedItemId === step.id && step.description && (
              <div className="mt-2 p-4 bg-gray-50 border-l-4 border-indigo-500 rounded-r text-gray-700 animate-fadeIn">
                <strong>Описание:</strong> {step.description}
              </div>
            )}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">Нет доступных материалов</p>
    )}

    <div className="text-right mt-6">
      <button
        onClick={() => setCurrentPage('components')}
        className="text-blue-600 hover:underline text-sm"
      >
        ← Назад к компонентам
      </button>
    </div>
  </div>
);


  const handleChange = (e) => {
  const { name, value } = e.target;
  setAuthFormData({
    ...authFormData,
    [name]: value
  });
};
  
  const renderAuth = () => (
  <div className="mt-12 p-8 max-w-md mx-auto bg-white rounded shadow">
    <h2 className="text-xl font-bold mb-4">{authMode === 'login' ? 'Вход' : 'Регистрация'}</h2>
    <form onSubmit={authMode === 'login' ? handleAuth : handleRegister} className="space-y-4">
      {authMode === 'register' && (
        <>
          <input
            name="firstName"
            placeholder="Имя"
            value={authFormData.firstName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            name="lastName"
            placeholder="Фамилия"
            value={authFormData.lastName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            name="phone"
            placeholder="Номер телефона"
            value={authFormData.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </>
      )}
      <input
        name="username"
        placeholder="Email"
        type="email"
        value={authFormData.username}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        name="password"
        placeholder="Пароль"
        type="password"
        value={authFormData.password}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded w-full">
        {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
      </button>
    </form>

    <div className="mt-4 text-center text-sm">
      {authMode === 'login' ? (
        <>Нет аккаунта? <button onClick={() => setAuthMode('register')} className="text-blue-600 underline">Регистрация</button></>
      ) : (
        <>Есть аккаунт? <button onClick={() => setAuthMode('login')} className="text-blue-600 underline">Войти</button></>
      )}
    </div>
  </div>
);

 const renderHome = () => (
  React.createElement('div', {
    className: "max-w-5xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg transition-all duration-300"
  },
    // Заголовок
    React.createElement('div', {
      className: "flex items-center gap-3 mb-6"
    },
      React.createElement('svg', {
        className: "w-6 h-6 text-indigo-600",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24"
      },
        React.createElement('path', {
          d: "M9 12l2 2 4-4m5.586 5.586a2 2 0 01-2.828 0L7 12m0 0l-2-2m2 2l2 2M7 12h10a2 2 0 11-4 0 2 2 0 014 0z",
          strokeWidth: 2,
          strokeLinecap: "round",
          strokeLinejoin: "round"
        })
      ),
      React.createElement('h1', {
        className: "text-2xl md:text-3xl font-bold text-gray-800"
      }, "Назначение?")
    ),

    // Введение
    React.createElement('p', {
      className: "text-gray-600 mb-6 leading-relaxed"
    }, "Этот инструмент позволяет автоматически рассчитать объём и стоимость материалов для изготовления лестничных конструкций. Поддерживает маршевые, винтовые и лестницы на тетивах/косоурах. Введите параметры и получите точный результат за считанные секунды."),

    // Преимущества
    React.createElement('div', {
      className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
    },
      // Точность
      React.createElement('div', {
        className: "bg-indigo-50 p-5 rounded-xl flex flex-col items-center text-center shadow hover:shadow-xl transition-shadow"
      },
        React.createElement('svg', {
          className: "w-8 h-8 text-green-600 mb-3",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24"
        },
          React.createElement('path', {
            d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })
        ),
        React.createElement('p', { className: "font-semibold text-indigo-700 mb-2" }, "Точность"),
        React.createElement('p', { className: "text-sm text-gray-600" }, "Автоматический расчёт с учётом всех параметров, включая коэффициент запаса.")
      ),
      // Скорость
      React.createElement('div', {
        className: "bg-indigo-50 p-5 rounded-xl flex flex-col items-center text-center shadow hover:shadow-xl transition-shadow"
      },
        React.createElement('svg', {
          className: "w-8 h-8 text-blue-600 mb-3",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24"
        },
          React.createElement('path', {
            d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })
        ),
        React.createElement('p', { className: "font-semibold text-indigo-700 mb-2" }, "Скорость"),
        React.createElement('p', { className: "text-sm text-gray-600" }, "Результат за 5 секунд вместо 2 дней ручного труда.")
      ),
      // Гибкость
      React.createElement('div', {
        className: "bg-indigo-50 p-5 rounded-xl flex flex-col items-center text-center shadow hover:shadow-xl transition-shadow"
      },
        React.createElement('svg', {
          className: "w-8 h-8 text-purple-600 mb-3",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24"
        },
          React.createElement('path', {
            d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9h0M4 11v3h.582m15.356 0a8.001 8.001 0 00-15.918 0M12 12a3 3 0 110-6 3 3 0 010 6z",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })
        ),
        React.createElement('p', { className: "font-semibold text-indigo-700 mb-2" }, "Гибкость"),
        React.createElement('p', { className: "text-sm text-gray-600" }, "Изменение параметров в реальном времени.")
      )
    ),

    // Основные функции
    renderFeatures(),

    // Рекомендации
    React.createElement('div', {
      className: "mb-8"
    },
      React.createElement('h2', {
        className: "text-xl font-semibold text-gray-800 mb-4 flex items-center"
      },
        React.createElement('svg', {
          className: "w-5 h-5 mr-2 text-indigo-600",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24"
        },
          React.createElement('path', {
            d: "M13 10V3L4 14h7v7l9-11h-7z",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })
        ),
        React.createElement('span', null, "Рекомендации по использованию")
      ),
      React.createElement('ul', {
        className: "space-y-2 text-gray-600 pl-5"
      },
        React.createElement('li', null,
          React.createElement('span', { className: "font-medium text-gray-800" }, "Для клиентов:"), " Используйте калькулятор для понимания стоимости проекта."
        ),
        React.createElement('li', null,
          React.createElement('span', { className: "font-medium text-gray-800" }, "Для менеджеров:"), " Редактируйте цены и нормы расхода материалов."
        ),
        React.createElement('li', null,
          React.createElement('span', { className: "font-medium text-gray-800" }, "Выбор материалов:"), " Обращайте внимание на плотность древесины и норму расхода ЛКМ."
        ),
        React.createElement('li', null,
          React.createElement('span', { className: "font-medium text-gray-800" }, "Коэффициент запаса:"), " Рекомендуется 10–15% для древесины и 10% для ЛКМ."
        )
      )
    ),

    // Кнопка перехода
    React.createElement('div', {
      className: "text-center mt-6"
    },
      React.createElement('button', {
        className: "px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-full hover:from-indigo-700 hover:to-blue-600 shadow-md hover:shadow-lg transition-all duration-300 transform ",
        onClick: () => setCurrentPage('calculator')
      }, "Перейти к расчётам")
    )
  )
);

  const renderCalculatorCard = () => {
  const calculators = [
    {
      name: 'Лакокрасочные материалы',
      slug: 'lkmCalculator',
      description: 'Рассчитайте объём и стоимость лакокрасочных материалов',
      icon: 'https://img.icons8.com/color/96/paint-brush.png' 
    },
    {
      name: 'Древесина',
      slug: 'boardsCalculator',
      description: 'Рассчитайте объём и стоимость древесины',
      icon: 'https://img.icons8.com/fluency/96/logs.png' 
    },
    {
      name: 'Крепежные элементы',
      slug: 'fastenersCalculator',
      description: 'Рассчитайте количество и стоимость крепежей',
      icon: 'https://img.icons8.com/fluency/96/nail.png' 
    }
  ];

  return (
    <div className=" max-w-5xl mx-auto px-6 py-12">
      {/* Основной блок с белым фоном и тенью */}
      <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
        {/* Заголовок и описание */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Выберите калькулятор</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Выберите нужный калькулятор для расчёта материалов. Система автоматически вычислит объём и стоимость, исходя из введённых параметров лестницы и выбранных материалов.
          </p>
        </div>

        {/* Калькуляторы в сетке */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {calculators.map((calc) => (
            <div
              key={calc.slug}
              onClick={() => setCurrentPage(calc.slug)}
              className="bg-indigo-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer w-full max-w-xs h-64 flex flex-col items-center justify-center text-center p-4 transform hover:scale-105"
              style={{ backfaceVisibility: 'hidden', perspective: '1000px' }}
            >
              <img 
                src={calc.icon} 
                alt={calc.name} 
                className="w-16 h-16 object-contain mb-3"
              />
              <h3 className="text-lg font-semibold mb-1">{calc.name}</h3>
              <p className="text-sm text-gray-500 min-h-[2.5rem] h-[2.5rem] flex items-center justify-center">
                {calc.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// Установить первый лак по умолчанию
  useEffect(() => {
    if (components.lac.length > 0 && !selectedLac) {
      const firstLac = components.lac[0];
      setSelectedLac(firstLac.name);
      setPrice(firstLac.price || '');
    }
  }, [components.lac, selectedLac]);


const renderLKMCalculator = () => (
  <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Калькулятор ЛКМ</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Лак */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Тип лака</label>
        <select
          value={selectedLac}
          onChange={(e) => {
            const lacName = e.target.value;
            setSelectedLac(lacName);
            const selected = components.lac.find(l => l.name === lacName);
            if (selected) {
              setPrice(selected.price || '');
            }
          }}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          {components.lac.map((lac) => (
            <option key={lac.id} value={lac.name}>
              {lac.name} — {lac.price ? `${lac.price} руб./л` : 'Цена не указана'}
            </option>
          ))}
        </select>
      </div>

      {/* Цена за литр */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Цена за литр (руб.)</label>
        <input
          type="number"
          placeholder="Например: 400"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2"
          step="any"
          min="0"
        />
      </div>

      {/* Ширина */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ширина ступени (м)</label>
        <input
          type="number"
          placeholder="0.3"
          value={stepWidth}
          onChange={(e) => setStepWidth(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          min="0"
          step="0.1"
        />
      </div>

      {/* Длина */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Длина ступени (м)</label>
        <input
          type="number"
          placeholder="1.0"
          value={stepLength}
          onChange={(e) => setStepLength(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          min="0"
          step="0.1"
        />
      </div>

      {/* Количество */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Количество ступеней</label>
        <input
          type="number"
          placeholder="10"
          value={numSteps}
          onChange={(e) => setNumSteps(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          min="1"
        />
      </div>

      {/* Слои */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Количество слоёв</label>
        <input
          type="number"
          placeholder="2"
          value={layers}
          onChange={(e) => setLayers(parseInt(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2"
          min="1"
          max="5"
        />
      </div>

      {/* Расход */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Расход (л/м²)</label>
        <input
          type="number"
          placeholder="0.1"
          value={consumption}
          onChange={(e) => setConsumption(parseFloat(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2"
          step="0.1"
          min="0"
        />
      </div>
    </div>

    <button
      onClick={calculateLKM}
      type="button"
      className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded transition"
    >
      Рассчитать
    </button>

    {/* Результат */}
    {result && (
      <div className="mt-8 bg-gray-50 p-6 rounded-xl border-l-4 border-indigo-500 animate-fade-in">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Результаты расчёта</h3>

        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p><strong>Тип:</strong> {result.lacName}</p>
            <p><strong>Ширина:</strong> {result.stepWidth} м</p>
            <p><strong>Длина:</strong> {result.stepLength} м</p>
            <p><strong>Ступеней:</strong> {result.numSteps}</p>
            <p><strong>Слои:</strong> {result.layers}</p>
          </div>
          <div>
            <p><strong>Площадь одной ступени:</strong> {result.areaPerStep} м²</p>
            <p><strong>Общая площадь:</strong> {result.totalArea} м²</p>
            <p><strong>Объём ЛКМ:</strong> {result.totalVolume} л</p>
            <p><strong>Стоимость:</strong> {result.totalPrice} руб.</p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-indigo-100 rounded text-indigo-800 text-sm font-semibold">
          Итого: {result.totalPrice} руб.
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={exportToPDF}
            type="button"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
          >
            Экспорт в PDF
          </button>
          <button
            onClick={() => setCurrentPage('calculator')}
            className="text-sm text-blue-600 underline"
          >
            ← Назад к калькуляторам
          </button>
        </div>
      </div>
    )}
  </div>
);


  const renderBoardsCalculator = () => (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-4">Калькулятор древесины</h2>
      <p>Функционал находится в разработке</p>
      <div className="mt-4">
        <button onClick={() => setCurrentPage('calculator')} className="text-sm text-blue-600 underline">← Назад к калькуляторам</button>
      </div>
    </div>
  );
  
  const renderStepsCalculator = () => (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-4">Калькулятор крепежных элементов</h2>
      <p>Функционал находится в разработке</p>
      <div className="mt-4">
        <button onClick={() => setCurrentPage('calculator')} className="text-sm text-blue-600 underline">← Назад к калькуляторам</button>
      </div>
    </div>
  );

  return (
  <div className="min-h-screen relative">
    {/* Фоновое изображение */}
    <img
      src="pattern.svg"
      alt="Фоновый узор"
      className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0"
      style={{ opacity: 0.4 }} // можно регулировать прозрачность
    />

    {/* Основной контент поверх фона */}
    <div className="relative z-10">
      {/* Навигация */}
      <nav className="bg-white p-4 shadow flex items-center justify-between">
        {/* Центрированное меню */}
        <div className="flex-1 flex justify-center">
          <div className="space-x-20">
            <button onClick={() => setCurrentPage('home')} className="font-medium text-indigo-700 relative group">
              Главная
              <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 transition-all duration-300"></span>
            </button>
            <button onClick={() => setCurrentPage('calculator')} className="font-medium text-indigo-700 relative group">
              Калькуляторы
            <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 transition-all duration-300"></span>
            </button>
            <button onClick={() => setCurrentPage('components')} className="font-medium text-indigo-700 relative group">
              Компоненты
            <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 transition-all duration-300"></span>
            </button>
            {isAdmin && (
              <button onClick={() => setCurrentPage('settings')} className="font-medium text-indigo-700 relative group">Настройки
              <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 transition-all duration-300"></span>
              </button>
            )}
          </div>
        </div>

        {/* Кнопка входа/выхода */}
        <div className="flex-shrink-0">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-red-500 font-medium relative group">Выйти<span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-red-400 to-red-600 transition-all duration-300"></span></button>
          ) : (
            <button onClick={() => setCurrentPage('login')} className="text-blue-500 font-medium relative group">Войти<span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 transition-all duration-300"></span></button>
          )}
        </div>
      </nav>

      {/* Основное содержимое */}
      <main className="p-4">
        {currentPage === 'login' && renderAuth()}
        {currentPage === 'home' && renderHome()}
        {currentPage === 'calculator' && renderCalculatorCard()}
        {currentPage === 'components' && renderComponents()}
        {currentPage === 'lkmCalculator' && renderLKMCalculator()}
        {currentPage === 'boardsCalculator' && renderBoardsCalculator()}
        {currentPage === 'fastenersCalculator' && renderStepsCalculator()}
        {currentPage === 'lacPage' && renderLacPage()}
        {currentPage === 'boardsPage' && renderBoardsPage()}
        {currentPage === 'stepsPage' && renderStepsPage()}
        {currentPage === 'settings' && renderSettings()}
      </main>
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* О проекте */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M9 12l2 2 4-4m5.586 5.586a2 2 0 01-2.828 0L7 12m0 0l-2-2m2 2l2 2M7 12H5" />
                </svg>
                Строительный калькулятор
              </h3>
              <p className="text-gray-400 text-sm">
                Онлайн-инструмент для расчёта стоимости материалов и сметы.
                Подходит как для профессионалов, так и для домашних мастеров.
              </p>
            </div>

            {/* Быстрые ссылки */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button onClick={() => setCurrentPage('home')} className="hover:text-indigo-400 transition">Главная</button></li>
                <li><button onClick={() => setCurrentPage('components')} className="hover:text-indigo-400 transition">Компоненты</button></li>
                <li><button onClick={() => setCurrentPage('calculator')} className="hover:text-indigo-400 transition">Калькуляторы</button></li>
                <li><button onClick={() => setCurrentPage('lkmCalculator')} className="hover:text-indigo-400 transition">Калькулятор ЛКМ</button></li>
              </ul>
            </div>

            {/* Контакты */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@example.com
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +7 (999) 123-45-67
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Москва, Россия
                </li>
              </ul>
            </div>
          </div>

          {/* Нижний бар */}
          <div className="mt-10 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Строительный калькулятор. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  </div>
);

}
const showToast = (message, type = 'success') => {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.style.cssText = `
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: ${type === 'success' ? '#4caf50' : '#f44336'};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
    font-family: sans-serif;
    animation: fadeInOut 3s ease forwards;
  `;

  toast.innerHTML = `
    <span style="font-size: 18px;">${type === 'success' ? '✅' : '❌'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
};

// Монтируем приложение
//  (React 18)
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);