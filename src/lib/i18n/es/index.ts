import type { Translation } from '../i18n-types';

const es = {
	// this is an example Translation, just rename or delete this folder if you want
	HI: 'Hola {name}! Por favor, deja una estrella si te gusta este proyecto: https://github.com/ivanhofer/typesafe-i18n',
	navbar: {
		machines: 'Máquinas',
		database: 'Base de datos',
		userManual: 'Manual del usuario',
		configuration: 'Configuración'
	},
	darkModeSelector: {
		switchMode: 'Cambiar tema',
		darkMode: 'Tema oscuro',
		lightMode: 'Tema claro',
		sameAsSystem: 'Sistema'
	},
	userNav: {
		profile: 'Perfil',
		logout: 'Cerrar Sesión',
		userSettings: 'Ajustes de usuario'
	}
} satisfies Translation;

export default es;
