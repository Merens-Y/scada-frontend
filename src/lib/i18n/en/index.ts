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
		disableMachine: 'Disable machine',
		deleteMachine: 'Delete machine',
	},
	machineCollapsibleTabs: {
		details: 'Details',
		recipe: 'Recipe',
	},
	moldTypeIndicator: {
		top: 'Top',
		bottom: 'Bottom',
	},
	auth: {
		register: 'Create an account',
		registerInstructions: 'Enter your name, email and password below to create your account',
		loginInstructions: 'Enter your registered email and password below to login with your account',
		login: 'Login',
		fieldName: 'Name',
		fieldDescriptionName: 'This is your public display name.',
		fieldEmail: 'Email',
		fieldDescriptionEmail: "Email address used for validation and notifications inside the application. It's preferred that you use your company email.",
		fieldPassword: 'Password',
		fieldDescriptionPassword: 'Ensure the password is at least 8 characters.',
		formSubmit: 'Submit',
	},
} satisfies BaseTranslation

export default en
