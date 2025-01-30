import * as Setting from "../models/setting";

import createLogger from "../utils/logger";

import { store } from "Utils/store";

const logger = createLogger("setting_service");

/**
 * Get all settings.
 */
export async function getSettings() {
  return Setting.fetchAll();
}

/**
 * Update a setting.
 * @param {Object} data
 */
export async function updateSetting(data: any) {
  logger(`Updating settings for key: ${data.key}`);

  return Setting.updateByName(data);
}
