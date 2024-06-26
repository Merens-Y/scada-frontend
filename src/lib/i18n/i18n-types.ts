// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'
	| 'es'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	/**
	 * H​i​ ​{​n​a​m​e​}​!​ ​P​l​e​a​s​e​ ​l​e​a​v​e​ ​a​ ​s​t​a​r​ ​i​f​ ​y​o​u​ ​l​i​k​e​ ​t​h​i​s​ ​p​r​o​j​e​c​t​:​ ​h​t​t​p​s​:​/​/​g​i​t​h​u​b​.​c​o​m​/​i​v​a​n​h​o​f​e​r​/​t​y​p​e​s​a​f​e​-​i​1​8​n
	 * @param {string} name
	 */
	HI: RequiredParams<'name'>
	navbar: {
		/**
		 * M​a​c​h​i​n​e​s
		 */
		machines: string
		/**
		 * D​a​t​a​b​a​s​e
		 */
		database: string
		/**
		 * U​s​e​r​ ​M​a​n​u​a​l
		 */
		userManual: string
		/**
		 * C​o​n​f​i​g​u​r​a​t​i​o​n
		 */
		configuration: string
		/**
		 * T​o​g​g​l​e​ ​N​o​t​i​f​i​c​a​t​i​o​n​s
		 */
		toggleNotifications: string
	}
	darkModeSelector: {
		/**
		 * S​w​i​t​c​h​ ​M​o​d​e
		 */
		switchMode: string
		/**
		 * D​a​r​k​ ​M​o​d​e
		 */
		darkMode: string
		/**
		 * L​i​g​h​t​ ​M​o​d​e
		 */
		lightMode: string
		/**
		 * S​a​m​e​ ​a​s​ ​S​y​s​t​e​m
		 */
		sameAsSystem: string
	}
	userNav: {
		/**
		 * P​r​o​f​i​l​e
		 */
		profile: string
		/**
		 * L​o​g​o​u​t
		 */
		logout: string
		/**
		 * U​s​e​r​ ​S​e​t​t​i​n​g​s
		 */
		userSettings: string
		/**
		 * T​o​g​g​l​e​ ​u​s​e​r​ ​m​e​n​u
		 */
		toggleSpan: string
	}
	statusTag: {
		/**
		 * A​u​t​o​m​a​t​i​c
		 */
		automatic: string
		/**
		 * M​a​n​u​a​l
		 */
		manual: string
		/**
		 * A​u​t​o
		 */
		auto: string
		/**
		 * M​a​n
		 */
		man: string
	}
	performanceIndicator: {
		/**
		 * C​u​r​r​e​n​t
		 */
		currentTime: string
		/**
		 * L​a​s​t
		 */
		lastTime: string
		/**
		 * I​d​e​a​l
		 */
		idealTime: string
		/**
		 * M​a​x​i​m​u​m
		 */
		maximumTime: string
		/**
		 * C​y​c​l​e​ ​t​i​m​e​s
		 */
		legend: string
	}
	machineHealthBar: {
		/**
		 * T​o​t​a​l
		 */
		totalCycles: string
		/**
		 * I​d​e​a​l
		 */
		idealCycles: string
		/**
		 * M​a​x​i​m​u​m
		 */
		maximumCycles: string
		/**
		 * C​y​c​l​e​s​ ​s​i​n​c​e​ ​m​a​i​n​t​e​n​a​n​c​e
		 */
		legend: string
	}
	machineContextMenu: {
		/**
		 * D​e​t​a​i​l​s
		 */
		details: string
		/**
		 * C​y​c​l​e​ ​h​i​s​t​o​r​y
		 */
		cycleHistory: string
		/**
		 * R​e​n​a​m​e​ ​m​a​c​h​i​n​e
		 */
		renameMachine: string
		/**
		 * D​e​l​e​t​e​ ​m​a​c​h​i​n​e
		 */
		deleteMachine: string
	}
	machineCollapsibleTabs: {
		/**
		 * D​e​t​a​i​l​s
		 */
		details: string
		/**
		 * R​e​c​i​p​e
		 */
		recipe: string
	}
}

export type TranslationFunctions = {
	/**
	 * Hi {name}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n
	 */
	HI: (arg: { name: string }) => LocalizedString
	navbar: {
		/**
		 * Machines
		 */
		machines: () => LocalizedString
		/**
		 * Database
		 */
		database: () => LocalizedString
		/**
		 * User Manual
		 */
		userManual: () => LocalizedString
		/**
		 * Configuration
		 */
		configuration: () => LocalizedString
		/**
		 * Toggle Notifications
		 */
		toggleNotifications: () => LocalizedString
	}
	darkModeSelector: {
		/**
		 * Switch Mode
		 */
		switchMode: () => LocalizedString
		/**
		 * Dark Mode
		 */
		darkMode: () => LocalizedString
		/**
		 * Light Mode
		 */
		lightMode: () => LocalizedString
		/**
		 * Same as System
		 */
		sameAsSystem: () => LocalizedString
	}
	userNav: {
		/**
		 * Profile
		 */
		profile: () => LocalizedString
		/**
		 * Logout
		 */
		logout: () => LocalizedString
		/**
		 * User Settings
		 */
		userSettings: () => LocalizedString
		/**
		 * Toggle user menu
		 */
		toggleSpan: () => LocalizedString
	}
	statusTag: {
		/**
		 * Automatic
		 */
		automatic: () => LocalizedString
		/**
		 * Manual
		 */
		manual: () => LocalizedString
		/**
		 * Auto
		 */
		auto: () => LocalizedString
		/**
		 * Man
		 */
		man: () => LocalizedString
	}
	performanceIndicator: {
		/**
		 * Current
		 */
		currentTime: () => LocalizedString
		/**
		 * Last
		 */
		lastTime: () => LocalizedString
		/**
		 * Ideal
		 */
		idealTime: () => LocalizedString
		/**
		 * Maximum
		 */
		maximumTime: () => LocalizedString
		/**
		 * Cycle times
		 */
		legend: () => LocalizedString
	}
	machineHealthBar: {
		/**
		 * Total
		 */
		totalCycles: () => LocalizedString
		/**
		 * Ideal
		 */
		idealCycles: () => LocalizedString
		/**
		 * Maximum
		 */
		maximumCycles: () => LocalizedString
		/**
		 * Cycles since maintenance
		 */
		legend: () => LocalizedString
	}
	machineContextMenu: {
		/**
		 * Details
		 */
		details: () => LocalizedString
		/**
		 * Cycle history
		 */
		cycleHistory: () => LocalizedString
		/**
		 * Rename machine
		 */
		renameMachine: () => LocalizedString
		/**
		 * Delete machine
		 */
		deleteMachine: () => LocalizedString
	}
	machineCollapsibleTabs: {
		/**
		 * Details
		 */
		details: () => LocalizedString
		/**
		 * Recipe
		 */
		recipe: () => LocalizedString
	}
}

export type Formatters = {}
