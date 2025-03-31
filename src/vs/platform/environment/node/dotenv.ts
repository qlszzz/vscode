/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * Simple utility to load environment variables from a .env file
 * @param envPath Path to the .env file
 */
export function loadEnv(envPath: string): Record<string, string> {
	const result: Record<string, string> = {};
	
	if (!fs.existsSync(envPath)) {
		return result;
	}
	
	const content = fs.readFileSync(envPath, 'utf8');
	const lines = content.split('\n');
	
	for (const line of lines) {
		const trimmedLine = line.trim();
		
		if (!trimmedLine || trimmedLine.startsWith('#')) {
			continue;
		}
		
		const equalSignIndex = trimmedLine.indexOf('=');
		if (equalSignIndex !== -1) {
			const key = trimmedLine.substring(0, equalSignIndex).trim();
			let value = trimmedLine.substring(equalSignIndex + 1).trim();
			
			if ((value.startsWith('"') && value.endsWith('"')) || 
				(value.startsWith("'") && value.endsWith("'"))) {
				value = value.substring(1, value.length - 1);
			}
			
			result[key] = value;
		}
	}
	
	return result;
}

/**
 * Load environment variables from a .env file
 * @param rootPath Root path of the application
 * @returns Record of environment variables loaded from .env file
 */
export function loadDotEnvFile(rootPath: string): Record<string, string> {
	const envPath = path.join(rootPath, '.env');
	return loadEnv(envPath);
}
