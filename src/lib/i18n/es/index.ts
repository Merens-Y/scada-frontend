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
	},
	performanceIndicator: {
		currentTime: 'Actual',
		lastTime: 'Pasado',
		idealTime: 'Ideal',
		maximumTime: 'Máximo',
		legend: 'Tiempos de ciclo',
	},
	machineHealthBar: {
		totalCycles: 'Total',
		idealCycles: 'Ideal',
		maximumCycles: 'Máximo',
		legend: 'Ciclos desde mantenimiento',
	},
	machineContextMenu: {
		details: 'Detalles',
		cycleHistory: 'Historial de ciclos',
		renameMachine: 'Renombrar máquina',
		deleteMachine: 'Borrar máquina',
	},
	machineCollapsibleTabs: {
		details: 'Detalles',
		recipe: 'Receta',
	},
	moldTypeIndicator: {
		top: 'Tapa',
		bottom: 'Fondo',
	},
	auth: {
		register: 'Crear una cuenta',
		registerInstructions: 'Ingrese su nombre, correo electrónico y contraseña a continuación para crear su cuenta',
		loginInstructions: 'Ingrese su correo electrónico y contraseña registrados a continuación para iniciar sesión con su cuenta',
		login: 'Iniciar sesión',
		fieldName: 'Nombre',
		fieldDescriptionName: 'Este será su nombre de usuario dentro de la aplicación.',
		fieldEmail: 'Correo electrónico',
		fieldDescriptionEmail: 'Dirección de correo electrónico utilizada para validación y notificaciones dentro de la aplicación. Se prefiere que utilice su correo organizacional.',
		fieldPassword: 'Contraseña',
		fieldDescriptionPassword: 'Asegúrese de que la contraseña tenga al menos 8 caracteres.',
		formSubmit: 'Ingresar',
	},
} satisfies Translation;

export default es;
