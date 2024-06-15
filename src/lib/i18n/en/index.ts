import type { BaseTranslation } from '../i18n-types'

const en = {
	HI: 'Hi {name:string}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n',
	// Navbar buttons
	navbar: {
		machines: 'Machines',
		database: 'Database',
		userManual: 'User Manual',
		configuration: 'Configuration',
		toggleNotifications: 'Toggle Notifications',
	},
	darkModeSelector: {
		switchMode: 'Switch Mode',
		darkMode: 'Dark Mode',
		lightMode: 'Light Mode',
		sameAsSystem: 'Same as System',
	},
	userNav: {
		profile: 'Profile',
		logout: 'Logout',
		userSettings: 'User Settings',
		toggleSpan: 'Toggle user menu',
	},
	statusTag: {
		automatic: 'Automatic',
		manual: 'Manual',
		auto: 'Auto',
		man: 'Man',
	}

} satisfies BaseTranslation

export default en
