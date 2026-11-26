import { defineConfig, devices } from '@playwright/test';

const live = process.env.BASE_URL;
const exec = process.env.PW_EXEC ? { executablePath: process.env.PW_EXEC } : {};
export default defineConfig({
  testDir: 'tests',
  timeout: 45_000,
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: live ?? 'http://localhost:4330/kuskusi-kouture-website-concept/',
    launchOptions: exec,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 }, launchOptions: exec } },
    { name: 'mobile', use: { ...devices['Pixel 7'], viewport: { width: 375, height: 812 }, launchOptions: exec } },
  ],
  webServer: live
    ? undefined
    : { command: 'node scripts/serve.mjs', url: 'http://localhost:4330/kuskusi-kouture-website-concept/', reuseExistingServer: true, timeout: 60_000 },
});
