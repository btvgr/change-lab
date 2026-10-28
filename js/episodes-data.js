/** Rutas de medios relativas a la raíz del proyecto, sin barra inicial. */
export const episodes = {
  pandillaje: {
    title: 'Decisiones que marcan',
    provisionalTitle: true,
    media: { src: '', poster: '', captions: '', transcript: '' },
    questions: [
      {
        id: 'riesgo',
        prompt: '¿Cuál de estas situaciones puede aumentar el riesgo de involucrarse en conductas violentas?',
        options: [
          'Contar con adultos de confianza.',
          'Sentir presión de un grupo para actuar contra los propios valores.',
          'Participar en actividades recreativas seguras.'
        ],
        correct: 1,
        explanation: 'La presión para actuar contra los propios valores puede aumentar el riesgo. Contar con personas de confianza y actividades seguras puede ofrecer apoyo.'
      },
      {
        id: 'apoyo',
        prompt: '¿Qué puede hacer una persona si siente presión para participar en una actividad peligrosa?',
        options: [
          'Buscar apoyo en una persona adulta de confianza.',
          'Aceptar para no perder amistades.',
          'Ignorar siempre sus propias preocupaciones.'
        ],
        correct: 0,
        explanation: 'Buscar una persona adulta de confianza puede ayudar a expresar preocupaciones y encontrar alternativas seguras. No es necesario afrontar la presión a solas.'
      },
      {
        id: 'prevencion',
        prompt: '¿Qué ayuda a prevenir la violencia juvenil?',
        options: [
          'Estigmatizar a los jóvenes de ciertos barrios.',
          'Excluir a quienes tienen dificultades.',
          'Crear oportunidades educativas y espacios de apoyo.'
        ],
        correct: 2,
        explanation: 'Las oportunidades educativas y las redes de apoyo contribuyen a la prevención. Estigmatizar o excluir dificulta la convivencia y el acceso al apoyo.'
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
    title: 'Detrás de la pantalla',
    heroTitle: 'Lo que sucede en internet también importa.',
    provisionalTitle: true,
    media: { src: '', poster: '', captions: '', transcript: '' },
    questions: [
      {
        id: 'conductas', prompt: '¿Cuál de estas acciones puede constituir ciberacoso?',
        options: ['Enviar un mensaje amable.', 'Humillar repetidamente a alguien mediante una plataforma digital.', 'Compartir material educativo.'],
        correct: 1,
        explanation: 'Humillar de forma repetida mediante una plataforma digital puede constituir ciberacoso. La convivencia digital requiere respeto.'
      },
      {
        id: 'testigos', prompt: '¿Qué es recomendable hacer si presencias ciberacoso?',
        options: ['Compartir el contenido ofensivo.', 'Sumarte a las burlas.', 'No difundirlo y buscar apoyo o reportarlo.'],
        correct: 2,
        explanation: 'No difundir el contenido evita amplificar el daño. Buscar apoyo o utilizar las herramientas de denuncia puede ayudar a actuar con responsabilidad.'
      },
      {
        id: 'convivencia', prompt: '¿Qué contribuye a una convivencia digital saludable?',
        options: ['Respetar a otras personas y su privacidad.', 'Compartir información personal sin permiso.', 'Difundir rumores.'],
        correct: 0,
        explanation: 'Respetar a las personas y su privacidad contribuye a una convivencia digital más segura. Compartir datos sin permiso o difundir rumores puede perjudicar a otros.'
      }
    ]
  }
};

