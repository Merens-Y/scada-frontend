import type { Translation } from '../i18n-types';

const es = {
	// this is an example Translation, just rename or delete this folder if you want
	HI: 'Hola {name}! Por favor, deja una estrella si te gusta este proyecto: https://github.com/ivanhofer/typesafe-i18n',
	// Translations are going to be handled in a component by component basis.
	navbar: {
		machines: 'Máquinas',
		database: 'Base de datos',
		userManual: 'Manual del usuario',
		configuration: 'Configuración',
		toggleNotifications: 'Alternar notificaciones',
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
		userSettings: 'Ajustes de usuario',
		toggleSpan: 'Alternar menu de usuario'
	},
	statusTag: {
		automatic: 'Automático',
		manual: 'Manual',
		auto: 'Auto',
		man: 'Man'
	}
} satisfies Translation;

export default es;
