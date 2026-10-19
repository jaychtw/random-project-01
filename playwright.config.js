import {existsSync} from 'node:fs';
import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests/browser',use:{baseURL:'http://127.0.0.1:5173',launchOptions:{executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']}},webServer:{command:'npm run dev -- --port 5173',url:'http://127.0.0.1:5173',reuseExistingServer:!process.env.CI},projects:[{name:'desktop',use:{viewport:{width:1440,height:1000}}},{name:'mobile',use:{viewport:{width:390,height:844},isMobile:true,hasTouch:true}}]});
