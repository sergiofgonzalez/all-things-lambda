# All Things Lambda &mdash; 000-template-project
> one-liner description of the project

## Description
Detailed description of the application

### Project Structure
All the project assumes this simple directory structure which can be customized as needed:

```
./xyz-project-name    <= the root folder of the project containing a single Lambda function
|
|-- /public           <= build resources for the project (source code, custom libs, files, config...)
|------/src           <= the source code for the main program of the Lambda
|---------- index.js  <= Hello world lambda source code
|-- /build            <= local build result (the result of running the build:local task)
|-- /dist             <= distribution build result (the result of running the build:dist task)
|-- .eslintrc.yml     <= ESLint quality rules for the JavaScript source code (assumes global install of ESLint)
|-- package.json      <= The package JSON containing the meta data for your project, the config and the build tasks
|-- README.md         <= A markdown document describing the Lambda
```

### Tasks
The project uses *NPM* for the build tasks:
+ `npm start` &mdash; runs the entry point for the application/module
+ `npm lint` &mdash; runs the linter on the source code of your project
+ `npm clean:local` &mdash; cleans the `build/` directory
+ `npm clean:dist` &mdash; cleans the *dist* directory according to the configuration
+ `npm clean` &mdash; cleans both the local and the *dist* directory
+ `npm build:local` &mdash; performs the local build which consists in linting the source code and copying the sources to the `build/` directory.
 + `npm build:dist` &mdash; performs the distribution build which consists in linting the source code and creating a zip in the configured *dist* directory which can be uploaded to AWS Lambda service.
+ `npm debug` &mdash; starts the debugger with the version that is found in the `build` directory 
+ `npm dev` &mdash; Continuous Development mode. It is assumes that nodemon is installed globally 

### Customization 

There are a couple of interesting points in the `package.json`:
+ It contains a `config` section that lets you customize certain parameters of the build tasks
+ The build tasks reference data from the `package.json` itself
```json
...
  "config" : { 
    "dist" : "./dist" 
  },
  "scripts": {
    "start": "node build/index.js",
    "lint": "eslint public/src/",
    "clean": "rm -rf build/",
    "copy": "cp -r public/src/ build/",
    "build:local": "npm run lint",
    "prebuild:local": "npm run clean",
    "postbuild:local": "npm run copy",
    "debug": "node --inspect --debug-brk build/index.js",
    "dev": "nodemon --ext js,json,yml --watch public/src --watch .eslintrc.yml --exec 'npm run build --silent && npm start --silent'",
    "prebuild:dist": "mkdir -p $npm_package_config_dist",
    "build:dist": "npm run lint",
    "postbuild:dist": "cd public/src && zip --verbose --recurse-paths --filesync $npm_package_config_dist/$npm_package_name-$npm_package_version.zip *"
  }  
...
```
As you can see, the keys from the config object as referenced using `$npm_package_config_*`, and the other values from the `package.json` follow the same pattern (e.g. `$npm_package_version` to obtain the package version).
However, there's a difference between the config and non-config values &mdash; the former can be overridden to suit your needs using `npm config set` so that you can customize the value of the `dist` directory:
```bash
npm config set 000-lambda-template-project:dist /media/sf_my-shared-folder
```
You can check the config values currently in effect by typing:
```bash
npm config ls
```

You can remove entries you no longer want by modifying the contents of the `~/.npmrc` file.

**NOTE** 
As the value from the `dist` key is concatenated with other values you should not include the trailing `/` in the directory specification.



