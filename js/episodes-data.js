/** Rutas de medios relativas a la raíz. captions acepta un WebVTT real cuando esté disponible. */
export const episodes = {
  pandillaje: {
  "title": "El precio del dinero fácil",
  "provisionalTitle": false,
  "media": {
    "src": "assets/videos/pandillaje.mp4",
    "poster": "assets/episodios/pandillaje/portada-pandillaje.png",
    "captions": "",
    "transcript": ""
  },
  "questions": [
    {
      "id": "familia",
      "prompt": "¿Por qué Manzana considera aceptar la propuesta de Piña?",
      "options": [
        "Porque busca ayudar a su familia ante las dificultades económicas.",
        "Porque quiere abandonar a su madre.",
        "Porque su escuela se lo exige."
      ],
      "correct": 0,
      "explanation": "Manzana quiere ayudar a su familia. Pedir orientación puede ayudar a encontrar opciones seguras ante las dificultades económicas."
    },
    {
      "id": "dinero",
      "prompt": "¿Qué descubre Manzana sobre el dinero fácil?",
      "options": [
        "Que siempre es una solución segura.",
        "Que puede implicar actividades incorrectas y riesgos.",
        "Que no requiere tomar decisiones."
      ],
      "correct": 1,
      "explanation": "Manzana descubre los riesgos detrás de la propuesta. Reconocerlos y poner límites es un paso para cuidarse y cuidar a los demás."
    },
    {
      "id": "educacion",
      "prompt": "¿Qué camino decide seguir Manzana al final?",
      "options": [
        "Continuar con las actividades incorrectas.",
        "Abandonar sus estudios.",
        "Alejarse de esas actividades y continuar su educación."
      ],
      "correct": 2,
      "explanation": "Manzana se aleja de esas actividades y continúa sus estudios. La educación y las redes de apoyo pueden abrir nuevas posibilidades."
    }
  ]
},
  'fast-fashion': {
    title: 'Detrás de la etiqueta',
    heroTitle: '¿Sabes qué hay detrás de lo que vistes?',
    provisionalTitle: true,
    media: { src: 'assets/videos/fast-fashion-web.mp4', poster: 'assets/episodios/fast-fashion/portada-fast-fashion-web.webp', captions: '', transcript: '' },
    questions: [
      {
        id: 'tendencias', prompt: '¿Por qué Fresa compraba ropa constantemente?',
        options: ['Porque necesitaba reemplazar toda su ropa.', 'Porque quería seguir las últimas tendencias.', 'Porque Don Limón se lo exigía.'],
        correct: 1,
        explanation: 'Fresa compra ropa constantemente para seguir las tendencias. La historia invita a distinguir entre una necesidad y el deseo de tener lo último.'
      },
      {
        id: 'descubrimiento', prompt: '¿Qué descubre Mora?',
        options: ['Que el fast fashion puede causar daños ambientales.', 'Que Fresa ya no quiere comprar ropa.', 'Que Plátano es dueño de la tienda.'],
        correct: 0,
        explanation: 'Mora descubre que el fast fashion puede causar daños ambientales y decide revelar la situación. Informarnos permite cuestionar nuestros hábitos de consumo.'
      },
      {
        id: 'alternativas', prompt: '¿Qué deciden hacer Fresa y Plátano?',
        options: ['Continuar comprando ropa cada semana.', 'Dejar de interesarse por la ropa.', 'Apoyar alternativas sostenibles como reparar, reutilizar e intercambiar prendas.'],
        correct: 2,
        explanation: 'Fresa y Plátano deciden apoyar alternativas sostenibles. Reparar, reutilizar e intercambiar prendas son maneras de prolongar su uso y evitar compras innecesarias.'
      }
    ]
  },
  ciberacoso: {
  "title": "Detrás de cada pantalla",
  "provisionalTitle": false,
  "media": {
    "src": "assets/videos/ciberacoso.mp4",
    "poster": "assets/episodios/ciberacoso/portada-ciberacoso.png",
    "captions": "",
    "transcript": ""
  },
  "questions": [
    {
      "id": "permiso",
      "prompt": "¿Qué hizo Uva que perjudicó a Fresa?",
      "options": [
        "La ayudó a proteger su cuenta.",
        "Publicó imágenes de ella sin permiso para burlarse.",
        "Le enseñó a editar fotografías."
      ],
      "correct": 1,
      "explanation": "Uva publicó imágenes sin consentimiento para burlarse. Pedir permiso y respetar la privacidad ayuda a cuidar a otras personas."
    },
    {
      "id": "acompanar",
      "prompt": "¿Cómo ayuda Plátano a Fresa?",
      "options": [
        "La escucha, consuela y apoya.",
        "Comparte las fotografías para que más personas las vean.",
        "Ignora lo ocurrido."
      ],
      "correct": 0,
      "explanation": "Plátano escucha y acompaña a Fresa. Dar apoyo y evitar compartir las burlas puede ayudar a quien está pasando por una situación de acoso."
    },
    {
      "id": "respeto",
      "prompt": "¿Qué enseñanza transmite la historia?",
      "options": [
        "Que todo lo publicado en internet es inofensivo.",
        "Que las burlas digitales siempre son divertidas.",
        "Que debemos respetar la privacidad y dignidad de otras personas."
      ],
      "correct": 2,
      "explanation": "Detrás de cada pantalla hay una persona que merece respeto. Cuidar la privacidad y la dignidad hace posible una mejor convivencia digital."
    }
  ]
}
};
