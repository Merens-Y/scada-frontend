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
	},
	performanceIndicator: {
		currentTime: 'Current',
		lastTime: 'Last',
		idealTime: 'Ideal',
		maximumTime: 'Maximum',
		legend: 'Cycle times',
	},
	machineHealthBar: {
		totalCycles: 'Total',
		idealCycles: 'Ideal',
		maximumCycles: 'Maximum',
		legend: 'Cycles since maintenance',
	},
	machineContextMenu: {
		details: 'Details',
		cycleHistory: 'Cycle history',
		renameMachine: 'Rename machine',
		deleteMachine: 'Delete machine',
	},
	machineCollapsibleTabs: {
		details: 'Details',
		recipe: 'Recipe',
	},
} satisfies BaseTranslation

export default en
