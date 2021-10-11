# CMS
### Content
1. Starting project
2. Code style docs


### Starting project:
  From root folder:
  1. Update packages: **npm run update**
  2. Run project: **npm run app:dev**
	
#### Production url: http://bleatdomain.com/ 

### Code style docs
* Order of imports: 
1. Libraries
2. Hooks
3. Components
4. Utils


* Structure of components:
1. Hooks
2. Constants
3. Custom functions
4. useEffect

* Dont't use **{...props}** when taking component's props
* Dont't use **//eslint-disable-next-line**, except useEffect's dependencies
* Text should be wrapped in translate function (src/Utils/Helpers/Helpers.js **translateMessage**)
* Hooks should be created in src/Utils/hooks/use{hookname}.js, {hookname} - name of hook
* Helper functions should be in src/Utils/Helpers/Helpers.js

* Don't use return in one-string functions 

**BAD**
```
const translateMessage = string => {
  const res = i18n.t(string)
  return res 
}
```
**GOOD**
```
const translateMessage = (string) => i18n.t(string);
```

