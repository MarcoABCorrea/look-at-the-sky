// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  API_KEY: '11998770b8b4aa7242b99aa88688ca78',

  BASE_URL: 'https://api.openweathermap.org/data/2.5/weather',

  ICON_URL: 'http://openweathermap.org/img/wn/',

  ICON_APPEND: '@2x.png'
};
