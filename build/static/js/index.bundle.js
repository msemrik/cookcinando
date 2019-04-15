/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([102,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(6);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js + 1 modules
var possibleConstructorReturn = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(3);

// EXTERNAL MODULE: ./src/pages/App.css
var pages_App = __webpack_require__(66);

// CONCATENATED MODULE: ./src/enum/pages.js
var pages={RECIPES:'recipes',CONFIGURATION:'configuration'};/* harmony default export */ var enum_pages = (pages);
// CONCATENATED MODULE: ./src/components/DefaultLayout.js
var DefaultLayout_DefaultLayout=/*#__PURE__*/function(_React$Component){Object(inherits["a" /* default */])(DefaultLayout,_React$Component);function DefaultLayout(props){var _this;Object(classCallCheck["a" /* default */])(this,DefaultLayout);_this=Object(possibleConstructorReturn["a" /* default */])(this,Object(getPrototypeOf["a" /* default */])(DefaultLayout).call(this,props));_this.state={height:"50px"};_this.logOutApplication=_this.logOutApplication.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));_this.resize=_this.resize.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));return _this;}Object(createClass["a" /* default */])(DefaultLayout,[{key:"componentDidMount",value:function componentDidMount(){window.addEventListener('resize',this.resize);this.resize();}},{key:"resize",value:function resize(){if(window.innerWidth<768){var headerTopNavHeight=this.headerTopNav.clientHeight;var headerHeight=this.headerElement.clientHeight;this.setState({topNavHeight:headerTopNavHeight+10+"px",headerHeight:headerHeight+headerTopNavHeight+10});}else{var _headerHeight=this.headerElement.clientHeight;this.setState({headerHeight:_headerHeight+"px",topNavHeight:0/*, contentHeight: window.innerHeight - headerHeight*/});}}},{key:"render",value:function render(){var _this2=this;return react_default.a.createElement("div",null,react_default.a.createElement("div",{className:"header",ref:function ref(headerElement){return _this2.headerElement=headerElement;},style:{marginTop:this.state.topNavHeight}},react_default.a.createElement("div",{className:"header-title"},react_default.a.createElement("h1",null,"Cookcinando App"),react_default.a.createElement("p",null,"Select your favourites recipes and get your complete shopping list!")),react_default.a.createElement("hr",{className:"headerSplitter"}),react_default.a.createElement("div",{className:"header-topnav",ref:function ref(headerTopNav){return _this2.headerTopNav=headerTopNav;}},react_default.a.createElement("div",{className:"header-topnav-buttons"},react_default.a.createElement("div",null,react_default.a.createElement("a",{href:"#",className:this.setClassName(enum_pages.RECIPES),onClick:function onClick(){return _this2.props.onChange(enum_pages.RECIPES);}},"Go To My Recipes"),this.props.isSpotifyUserLogged?react_default.a.createElement("a",{href:"#",onClick:this.logOutApplication},"Logout"):undefined,react_default.a.createElement("a",{href:"#",className:this.setClassName(enum_pages.CONFIGURATION),onClick:function onClick(){return _this2.props.onChange(enum_pages.CONFIGURATION);}},this.props.isSpotifyUserLogged?"Spotify Account Info":"Log in to Spotify"))))),react_default.a.createElement("div",{style:{top:this.state.headerHeight},ref:function ref(contentElement){return _this2.contentElement=contentElement;},className:"content"},react_default.a.createElement("div",{className:"content-view-port"},this.props.children)),react_default.a.createElement("div",{className:"footer"},react_default.a.createElement("p",null,"Recommend to your friends ;)")));}},{key:"setClassName",value:function setClassName(page){if(page===this.props.actualPage){return"selected";}}},{key:"logOutApplication",value:function logOutApplication(){window.location.replace("/logout");}}]);return DefaultLayout;}(react_default.a.Component);/* harmony default export */ var components_DefaultLayout = (DefaultLayout_DefaultLayout);
// CONCATENATED MODULE: ./src/components/common/AlertDismissable.js
var Alert=__webpack_require__(20).Alert;var Button=__webpack_require__(20).Button;var AlertDismissable_AlertDismissable=/*#__PURE__*/function(_React$Component){Object(inherits["a" /* default */])(AlertDismissable,_React$Component);function AlertDismissable(props){var _this;Object(classCallCheck["a" /* default */])(this,AlertDismissable);_this=Object(possibleConstructorReturn["a" /* default */])(this,Object(getPrototypeOf["a" /* default */])(AlertDismissable).call(this,props));_this.handleHide=function(){_this.props.resetAlert();};_this.state={alert:_this.props.alert};return _this;}Object(createClass["a" /* default */])(AlertDismissable,[{key:"componentWillReceiveProps",value:function componentWillReceiveProps(nextProps){if(this.props.showLoadingModal===true&&nextProps.showLoadingModal===true){this.state={alert:{error:{},message:{}}};}else{this.state={alert:this.props.alert};}// if(nextProps.alert.error.toShow === false && nextProps.alert.message.toShow === false){
//     this.setState({alert: nextProps.alert});
// } else if(){
//     this.setState({alert: nextProps.alert});
// }
}},{key:"render",value:function render(){return react_default.a.createElement(react_default.a.Fragment,null,this.state.alert.error.toShow&&react_default.a.createElement("div",{className:"alert-dismisable-container"},react_default.a.createElement(Alert,{show:this.state.show,variant:"danger"},react_default.a.createElement(Alert.Heading,null,"Oops! We found an error"),react_default.a.createElement("p",null,this.state.alert.error.text),react_default.a.createElement("hr",null),react_default.a.createElement("div",{className:"d-flex justify-content-end"},react_default.a.createElement(Button,{onClick:this.handleHide,variant:"outline-danger"},"Close :\xB4(")))),this.state.alert.message.toShow&&react_default.a.createElement("div",{className:"alert-dismisable-container"},react_default.a.createElement(Alert,{show:this.state.show,variant:"success"},react_default.a.createElement(Alert.Heading,null,"Hey you!"),react_default.a.createElement("p",null,this.state.alert.message.text),react_default.a.createElement("hr",null),react_default.a.createElement("div",{className:"d-flex justify-content-end"},react_default.a.createElement(Button,{onClick:this.handleHide,variant:"outline-success"},"Close :)")))));}}]);return AlertDismissable;}(react_default.a.Component);/* harmony default export */ var common_AlertDismissable = (AlertDismissable_AlertDismissable);
// CONCATENATED MODULE: ./src/components/RecipePageComponents/ListItem.js
var React=__webpack_require__(0);var ListItem_ListItem=/*#__PURE__*/function(_React$Component){Object(inherits["a" /* default */])(ListItem,_React$Component);function ListItem(){Object(classCallCheck["a" /* default */])(this,ListItem);return Object(possibleConstructorReturn["a" /* default */])(this,Object(getPrototypeOf["a" /* default */])(ListItem).apply(this,arguments));}Object(createClass["a" /* default */])(ListItem,[{key:"render",value:function render(){var _this=this;return React.createElement("tr",{id:this.props.item.name,className:this.props.isSelected?"playlist-list-item-row selected":"playlist-list-item-row",onClick:function onClick(){return _this.props.clickAction(_this.props.item);}},React.createElement("td",{className:"playlist-list-item-image-column"},React.createElement("img",{className:"playlist-list-item-image-image",alt:"",src:this.props.item.images?this.props.item.images[2].url:"/noplaylistimage.png"})),React.createElement("td",{className:this.props.isSelected?"playlist-list-item-name-column selected":"playlist-list-item-name-column"},React.createElement("strong",null,this.props.item.name),React.createElement("br",null)),this.props.itemRightOption?this.props.itemRightOption:undefined);}}]);return ListItem;}(React.Component);/* harmony default export */ var RecipePageComponents_ListItem = (ListItem_ListItem);
// EXTERNAL MODULE: ./src/components/RecipePageComponents/NewDialog.css
var RecipePageComponents_NewDialog = __webpack_require__(93);

// CONCATENATED MODULE: ./src/components/RecipePageComponents/NewDialog.js
var NewDialog_React=__webpack_require__(0);var ButtonToolbar=__webpack_require__(20).ButtonToolbar;var NewDialog_Button=__webpack_require__(20).Button;var Modal=__webpack_require__(20).Modal;var NewDialog_NewDialog=/*#__PURE__*/function(_React$Component){Object(inherits["a" /* default */])(NewDialog,_React$Component);function NewDialog(props,context){var _this;Object(classCallCheck["a" /* default */])(this,NewDialog);_this=Object(possibleConstructorReturn["a" /* default */])(this,Object(getPrototypeOf["a" /* default */])(NewDialog).call(this,props,context));_this.lgClose=function(){return _this.setState({lgShow:false,name:''});};_this.state={lgShow:false,name:''};_this.handleNameChange=_this.handleNameChange.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));_this.handleClick=_this.handleClick.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));return _this;}Object(createClass["a" /* default */])(NewDialog,[{key:"handleClick",value:function handleClick(){this.lgClose();this.props.action(this.state.name,this.props.item);}},{key:"handleNameChange",value:function handleNameChange(event){this.setState({name:event.target.value});}},{key:"render",value:function render(){var _this2=this;return NewDialog_React.createElement(ButtonToolbar,null,NewDialog_React.createElement(NewDialog_Button,{className:"playlist-list-button-div-button",onClick:function onClick(){return _this2.setState({lgShow:true});}},this.props.buttonText),NewDialog_React.createElement(Modal,{size:"lg",show:this.state.lgShow,onHide:this.lgClose},NewDialog_React.createElement("div",{className:"modal-div"},NewDialog_React.createElement("h3",{className:"modal-div-title"},this.props.dialogTitle),NewDialog_React.createElement("form",{className:"modal-div-form"},this.props.dialogInputLabel?NewDialog_React.createElement("div",{className:"modal-div-form-item-group"},NewDialog_React.createElement("div",{className:"input-group mb-3"},NewDialog_React.createElement("div",{className:"input-group-prepend"},NewDialog_React.createElement("span",{className:"input-group-text modal-div-form-item-group-input",id:"basic-addon1"},this.props.dialogInputLabel)),NewDialog_React.createElement("input",{type:"text",className:"form-control","aria-describedby":"basic-addon1",value:this.state.name,onChange:this.handleNameChange}))):undefined,NewDialog_React.createElement("div",{className:"modal-div-form-item-group button-item-group"},NewDialog_React.createElement(NewDialog_Button,{className:"playlist-add-playlist-cancel-button",onClick:this.lgClose},this.props.closeButtonText?this.props.okButtonText:"Close"),NewDialog_React.createElement(NewDialog_Button,{className:"playlist-add-playlist-create-button",onClick:this.handleClick},this.props.okButtonText))))));}}]);return NewDialog;}(NewDialog_React.Component);/* harmony default export */ var components_RecipePageComponents_NewDialog = (NewDialog_NewDialog);
// CONCATENATED MODULE: ./src/components/RecipePageComponents/RecipePageList.js
var RecipePageList_Button=__webpack_require__(20).Button;var RecipePageList_RecipePageList=/*#__PURE__*/function(_React$Component){Object(inherits["a" /* default */])(RecipePageList,_React$Component);function RecipePageList(props){var _this;Object(classCallCheck["a" /* default */])(this,RecipePageList);_this=Object(possibleConstructorReturn["a" /* default */])(this,Object(getPrototypeOf["a" /* default */])(RecipePageList).call(this,props));_this.state={selectedConfiguredPlaylist:''};return _this;}Object(createClass["a" /* default */])(RecipePageList,[{key:"getDefaultProps",value:function getDefaultProps(){return{itemsToShow:[]};}},{key:"componentWillReceiveProps",value:function componentWillReceiveProps(nextProps){if(nextProps.selectedConfiguredPlaylist!==this.props.selectedConfiguredPlaylist)this.setState({selectedConfiguredPlaylist:nextProps.selectedConfiguredPlaylist});}},{key:"render",value:function render(){var _this2=this;return react_default.a.createElement("section",{className:"playlist-list-section"},react_default.a.createElement("div",{className:"playlist-list-title-div"},react_default.a.createElement("h1",{className:"playlist-list-title-text"},this.props.listTitle),react_default.a.createElement("div",{className:"playlist-list-button-div"},this.props.listButton)),react_default.a.createElement("div",{className:"playlist-list-div"},react_default.a.createElement("table",{className:"playlist-list-div-table"},react_default.a.createElement("tbody",{className:"playlist-list-div-table-tbody"},this.props.itemsToShow?this.props.itemsToShow.length===0?react_default.a.createElement("h1",{className:"playlist-list-title-text"},react_default.a.createElement("br",null),"You do not have any recipe. Start by Clicking on Create Recipe ;)"):this.props.itemsToShow.map(function(item){return react_default.a.createElement(RecipePageComponents_ListItem,_this2.getRecipeItem(item));}).reduce(function(prev,curr){return[prev,' ',curr];},''):undefined))));}},{key:"getRecipeItem",value:function getRecipeItem(item){var _this3=this;return{// isConfiguredPlaylist: this.props.isConfiguredPlaylist,
// isSelected: playlist.id === this.state.selectedConfiguredPlaylist.id ? true : false,
item:item,itemRightOption:this.props.itemRightButtons(item),clickAction:function clickAction(playlist){return _this3.props.itemActionOnClick(playlist);}};}}]);return RecipePageList;}(react_default.a.Component);/* harmony default export */ var RecipePageComponents_RecipePageList = (RecipePageList_RecipePageList);
// EXTERNAL MODULE: ./src/components/AppPages/RecipesPage.css
var AppPages_RecipesPage = __webpack_require__(94);

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__(95);

// CONCATENATED MODULE: ./src/components/AppPages/RecipesPage.js
var RecipesPage_Button=__webpack_require__(20).Button;var RecipesPage_RecipesPage=/*#__PURE__*/function(_React$Component){Object(inherits["a" /* default */])(RecipesPage,_React$Component);function RecipesPage(props){var _this;Object(classCallCheck["a" /* default */])(this,RecipesPage);_this=Object(possibleConstructorReturn["a" /* default */])(this,Object(getPrototypeOf["a" /* default */])(RecipesPage).call(this,props));_this.state={userRecipes:[],recipesToBeShown:''};_this.getUserRecipes=_this.getUserRecipes.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));_this.createRecipe=_this.createRecipe.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));// this.savePlaylistsConfiguration = this.savePlaylistsConfiguration.bind(this);
return _this;}Object(createClass["a" /* default */])(RecipesPage,[{key:"componentDidMount",value:function componentDidMount(){if(this.props.isSpotifyUserLogged)this.getUserRecipes();}},{key:"componentWillReceiveProps",value:function componentWillReceiveProps(nextProps){if(nextProps.isSpotifyUserLogged!==this.props.isSpotifyUserLogged&&nextProps.isSpotifyUserLogged===true)this.getUserRecipes();}},{key:"getUserRecipes",value:function getUserRecipes(){var _this2=this;this.props.showLoadingModal();fetch('/recipes',{method:'POST',headers:{"Content-Type":"application/json"}}).then(function(result){var state=_this2;if(result.ok){result.json().then(function(response){state.setState({userRecipes:response.recipes});state.props.hideLoadingModal();});}else{result.json().then(function(error){state.props.handleResponse(error);state.props.hideLoadingModal();});}});}},{key:"render",value:function render(){return react_default.a.createElement("div",null,this.props.isSpotifyUserLogged?this.showAppRecipeApp():react_default.a.createElement("div",null,react_default.a.createElement("div",{className:"playlist-page-title-div"},react_default.a.createElement("h1",{className:"playlist-page-title-text"},"You're not logged in. Please go to 'Configure' option."))));}},{key:"showAppRecipeApp",value:function showAppRecipeApp(){return react_default.a.createElement("div",{className:"playlist-page-content"},react_default.a.createElement("div",{className:this.state.selectedConfiguredPlaylist?"playlist-page-configured-playlist":"playlist-page-configured-playlist playlist-page-configured-playlist-full-width"},react_default.a.createElement(RecipePageComponents_RecipePageList,this.prepareRecipeList())));}},{key:"prepareRecipeList",value:function prepareRecipeList(){var _this3=this;return{listTitle:"Your recipes",listButton:react_default.a.createElement(components_RecipePageComponents_NewDialog,this.getNewRecipeDialog()),// isConfiguredPlaylist: true,
itemsToShow:this.state.userRecipes,// selectedConfiguredPlaylist: this.state.selectedConfiguredPlaylist,
itemActionOnClick:function itemActionOnClick(recipe){return _this3.updateSpotifyPlaylistsSelectedStatus(recipe);},itemRightButtons:function itemRightButtons(item){return _this3.getRecipeItemRightButtons(item);}// itemRemoveAction: (recipe) => this.removeRecipe(recipe),
// itemRenameAction: (recipe) => this.renameRecipe(recipe),
};}},{key:"getNewRecipeDialog",value:function getNewRecipeDialog(){return{buttonText:"Create Recipe",dialogTitle:"Create Recipe",dialogInputLabel:"Recipe Name",action:this.createRecipe,okButtonText:"Create New Recipe"};}},{key:"getRecipeItemRightButtons",value:function getRecipeItemRightButtons(item){return react_default.a.createElement("div",null,react_default.a.createElement(components_RecipePageComponents_NewDialog,this.getRemoveRecipeDialog(item)),react_default.a.createElement(components_RecipePageComponents_NewDialog,this.getRenameRecipeDialog(item)));}// <NewDialog {...this.getNewRecipeDialog()} />
// <NewDialog {...this.getNewRecipeDialog()} />
},{key:"getRemoveRecipeDialog",value:function getRemoveRecipeDialog(item){var _this4=this;return{item:item,buttonText:"Remove Recipe",dialogTitle:"Are you sure you want to remove "+item.name+" ?",// dialogInputLabel: "Recipe Name",
action:function action(name,item){return _this4.removeRecipe(name,item);},okButtonText:"Remove Recipe"};}},{key:"getRenameRecipeDialog",value:function getRenameRecipeDialog(item){var _this5=this;return{item:item,buttonText:"Rename Recipe",dialogTitle:"Rename Recipe "+item.name,dialogInputLabel:"Recipe Name",action:function action(name,item){return _this5.renameRecipe(name,item);},okButtonText:"Rename Recipe"};}//
// prepareSpotifyPlaylistsList() {
//     return {
//         playlistPageTitle: "Your spotify playlists",
//         playlistPageButton: <Button className={"playlist-list-button-div-button"}
//                                     onClick={(playlist) => this.savePlaylistsConfiguration(playlist)}>
//             Save Changes
//         </Button>,
//         isConfiguredPlaylist: false,
//         playlistsToShow: this.state.spotifyPlaylistsToBeShown,
//         itemActionOnClick: (playlist) => this.changePlaylistChecked(playlist)
//     }
// }
//
// updateSpotifyPlaylistsSelectedStatus(playlist) {
//     this.setState({
//         selectedConfiguredPlaylist: playlist,
//         spotifyPlaylistsToBeShown: this.state.userPlaylists.spotifyPlaylists.map((spotifyPlaylist) => {
//             spotifyPlaylist.selected = _.find(playlist.includedPlaylists, {"playlistId": spotifyPlaylist.id}) ? true : false;
//             return spotifyPlaylist;
//         })
//     })
// }
//
// changePlaylistChecked(playlist) {
//     _.find(this.state.spotifyPlaylistsToBeShown, {id: playlist.id}).selected = !playlist.selected;
//     this.setState({
//         spotifyPlaylistsToBeShown: this.state.spotifyPlaylistsToBeShown
//     })
// }
//
},{key:"createRecipe",value:function createRecipe(name){var _this6=this;this.props.showLoadingModal();fetch('/createrecipe',{method:'POST',headers:{'Content-Type':"application/json"},body:JSON.stringify({name:name}),redirect:'manual'}).then(function(result){var state=_this6;if(result.ok){_this6.getUserRecipes();state.props.handleResponse({messageToShow:"Recipe Successfully created =D"});}else{result.json().then(function(error){state.props.handleResponse(error);state.props.hideLoadingModal();});}});}},{key:"removeRecipe",value:function removeRecipe(name,item){var _this7=this;this.props.showLoadingModal();fetch('/removerecipe',{method:'POST',headers:{'Content-Type':"application/json"},body:JSON.stringify({item:item}),redirect:'manual'}).then(function(result){var state=_this7;if(result.ok){_this7.getUserRecipes();state.props.handleResponse({messageToShow:"Recipe Successfully removed"});}else{result.json().then(function(error){state.props.handleResponse(error);state.props.hideLoadingModal();});}});}},{key:"renameRecipe",value:function renameRecipe(name,item){var _this8=this;this.props.showLoadingModal();fetch('/updaterecipe',{method:'POST',headers:{'Content-Type':"application/json"},body:JSON.stringify({item:item,name:name}),redirect:'manual'}).then(function(result){var state=_this8;if(result.ok){_this8.getUserRecipes();state.props.handleResponse({messageToShow:"Recipe Successfully updated"});}else{result.json().then(function(error){state.props.handleResponse(error);state.props.hideLoadingModal();});}});}//
// savePlaylistsConfiguration() {
//     this.props.showLoadingModal();
//     var playlistToUpdate = this.state.selectedConfiguredPlaylist;
//     playlistToUpdate.includedPlaylists = [];
//     this.state.spotifyPlaylistsToBeShown.filter((playlist) => playlist.selected).forEach(playlist => {
//         playlistToUpdate.includedPlaylists.push(playlist.id);
//     });
//
//     fetch('/updateplaylist', {
//         method: 'POST',
//         headers: {'Content-Type': "application/json"},
//         body: JSON.stringify({playlistToUpdate: playlistToUpdate})
//     }).then((result) => {
//             var state = this;
//             if (result.ok) {
//                 this.getUserPlaylists();
//                 state.props.handleResponse({messageToShow: "Playlist Successfully updated =D"});
//                 state.props.hideLoadingModal();
//             } else {
//                 result.json().then(function (error) {
//                     state.props.handleResponse(error);
//                     state.props.hideLoadingModal();
//                 });
//             }
//
//             // if (result.ok) {
//             //         console.log('success updatedplaylist');
//             //         alert('success updatedplaylist');
//             //         this.getUserPlaylists();
//             //     } else {
//             //         // isSpotifyLogged: false
//             //         result.json().then((error) => {
//             //             this.props.handleError(error, (error) => {
//             //                 if (error.errorType === "dbError") {
//             //                     alert("Internal errors occurred, Please try later. Error desc: " + error.errorMessage);
//             //                 } else if (error.errorType === "spotifyError") {
//             //                     alert("Changes were saved, but was not able to update Spotify playlsit, try saving later. Error desc: " + error.errorMessage);
//             //                 }
//             //             });
//             //         });
//             //     }
//             }
//         );
//     console.log(playlistToUpdate);
// }
}]);return RecipesPage;}(react_default.a.Component);/* harmony default export */ var components_AppPages_RecipesPage = (RecipesPage_RecipesPage);
// EXTERNAL MODULE: ./src/components/AppPages/ConfigurePage.css
var AppPages_ConfigurePage = __webpack_require__(97);

// EXTERNAL MODULE: ./node_modules/react-bootstrap/Button.js
var react_bootstrap_Button = __webpack_require__(45);
var Button_default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_Button);

// CONCATENATED MODULE: ./src/components/AppPages/ConfigurePage.js
var ConfigurePage_ConfigurePage=/*#__PURE__*/function(_React$Component){Object(inherits["a" /* default */])(ConfigurePage,_React$Component);function ConfigurePage(){Object(classCallCheck["a" /* default */])(this,ConfigurePage);return Object(possibleConstructorReturn["a" /* default */])(this,Object(getPrototypeOf["a" /* default */])(ConfigurePage).apply(this,arguments));}Object(createClass["a" /* default */])(ConfigurePage,[{key:"render",value:function render(){return react_default.a.createElement("div",null,this.props.isSpotifyUserLogged?this.showUserLoggedInformation():react_default.a.createElement("div",{className:"button-div"},react_default.a.createElement(Button_default.a,{className:"configure-page-login-logout-button",onClick:this.logInToSpotify.bind(this)},"Here we'll be some configuration stuff")));}},{key:"showUserLoggedInformation",value:function showUserLoggedInformation(){return react_default.a.createElement("div",{className:"configure-page-content"},react_default.a.createElement("div",{className:"configure-page-user-logged-div"},react_default.a.createElement("h3",{className:"configure-page-user-logged-div-title"},"Profile"),react_default.a.createElement("form",{className:"configure-page-user-logged-div-form"},react_default.a.createElement("div",{className:"configure-page-user-logged-div-form-item-group"},react_default.a.createElement("label",{className:"configure-page-user-logged-div-form-item-group-title"},"Name"),react_default.a.createElement("p",{className:"configure-page-user-logged-div-form-item-group-value"},this.props.spotifyUserLoggedInfo.display_name)),react_default.a.createElement("div",{className:"configure-page-user-logged-div-form-item-group"},react_default.a.createElement("label",{className:"configure-page-user-logged-div-form-item-group-title"},"Country"),react_default.a.createElement("p",{className:"configure-page-user-logged-div-form-item-group-value"},this.props.spotifyUserLoggedInfo.country)),react_default.a.createElement("div",{className:"configure-page-user-logged-div-form-item-group"},react_default.a.createElement("label",{className:"configure-page-user-logged-div-form-item-group-title"},"Email"),react_default.a.createElement("p",{className:"configure-page-user-logged-div-form-item-group-value"},this.props.spotifyUserLoggedInfo.email)))),react_default.a.createElement("div",{className:"configure-page-logout-button-div"},react_default.a.createElement(Button_default.a,{className:"configure-page-login-logout-button",onClick:this.logOutSpotify.bind(this)},"Log Out SPOTIFY")));}},{key:"logInToSpotify",value:function logInToSpotify(){this.props.showLoadingModal();// window.location.replace("/spotify/login");
}},{key:"logOutSpotify",value:function logOutSpotify(){this.props.showLoadingModal();window.location.replace("/logout");}}]);return ConfigurePage;}(react_default.a.Component);/* harmony default export */ var components_AppPages_ConfigurePage = (ConfigurePage_ConfigurePage);
// EXTERNAL MODULE: ./src/components/common/LoadingModal.css
var common_LoadingModal = __webpack_require__(101);

// CONCATENATED MODULE: ./src/components/common/LoadingModal.js
var LoadingModal_React=__webpack_require__(0);var LoadingModal_ButtonToolbar=__webpack_require__(20).ButtonToolbar;var LoadingModal_Modal=__webpack_require__(20).Modal;var lastTimeOpened;var LoadingModal_LoadingModal=/*#__PURE__*/function(_React$Component){Object(inherits["a" /* default */])(LoadingModal,_React$Component);function LoadingModal(props,context){var _this;Object(classCallCheck["a" /* default */])(this,LoadingModal);_this=Object(possibleConstructorReturn["a" /* default */])(this,Object(getPrototypeOf["a" /* default */])(LoadingModal).call(this,props,context));_this.lgClose=function(){return _this.setState({lgShow:false,name:''});};_this.state={lgShow:_this.props.showLoadingModal,name:''};_this.handleNameChange=_this.handleNameChange.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));_this.handleClick=_this.handleClick.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));return _this;}Object(createClass["a" /* default */])(LoadingModal,[{key:"componentWillReceiveProps",value:function componentWillReceiveProps(nextProps){var _this2=this;if(nextProps.showLoadingModal!==this.props.showLoadingModal)if(nextProps.showLoadingModal){lastTimeOpened=new Date();this.setState({lgShow:nextProps.showLoadingModal});}else{var timeElapsed=new Date()-lastTimeOpened;if(Math.floor(timeElapsed/1000)<3){setTimeout(function(){return _this2.setState({lgShow:nextProps.showLoadingModal});},3000-timeElapsed);}else{this.setState({lgShow:nextProps.showLoadingModal});}}}},{key:"handleClick",value:function handleClick(){this.lgClose();this.props.action(this.state.name);}},{key:"handleNameChange",value:function handleNameChange(event){this.setState({name:event.target.value});}},{key:"render",value:function render(){return LoadingModal_React.createElement(LoadingModal_ButtonToolbar,null,LoadingModal_React.createElement(LoadingModal_Modal,{size:"lg",show:this.state.lgShow// onHide={this.lgClose}
},LoadingModal_React.createElement("div",{className:"modal-loading-div"},LoadingModal_React.createElement("img",{alt:"",className:"modal-loading-div-gif",src:"loading.gif"}))));}}]);return LoadingModal;}(LoadingModal_React.Component);/* harmony default export */ var components_common_LoadingModal = (LoadingModal_LoadingModal);
// CONCATENATED MODULE: ./src/pages/App.js
var App_App=/*#__PURE__*/function(_React$Component){Object(inherits["a" /* default */])(App,_React$Component);function App(props){var _this;Object(classCallCheck["a" /* default */])(this,App);_this=Object(possibleConstructorReturn["a" /* default */])(this,Object(getPrototypeOf["a" /* default */])(App).call(this,props));_this.transitionateToPage=function(page){this.setState({actualPage:page});};_this.handleResponse=function(responseObject){if(responseObject.errorToShow){this.modifyAlert({error:{text:responseObject.errorToShow}});if(responseObject.shouldReLogInToSpotify){this.setState({isSpotifyUserLogged:false});}}else{this.modifyAlert({message:{text:responseObject.messageToShow}});}};_this.state={isSpotifyUserLogged:false,actualPage:enum_pages.PLAYLISTS,alert:{message:{toShow:false,text:''},error:{toShow:false,text:''}},showLoadingModal:false};_this.modifyAlert=_this.modifyAlert.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));_this.resetAlert=_this.resetAlert.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));_this.showLoadingModal=_this.showLoadingModal.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));_this.hideLoadingModal=_this.hideLoadingModal.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));_this.handleResponse=_this.handleResponse.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));return _this;}Object(createClass["a" /* default */])(App,[{key:"componentDidMount",value:function componentDidMount(){// if (new URLSearchParams(window.location.search).has('loginerror')){
//     window.history.pushState("object or string", "Title", "/");
//     this.modifyAlert({error: {text: 'There was some error when login to Spotify. Please retry'}});}
//
// fetch('/spotify/islogged', {
//     method: 'POST',
//     headers: {"Content-Type": "application/json"},
// }).then((result) => {
//         var state = this;
//         if (result.ok) {
//             result.json().then(function (userData) {
//                 state.setState({
//                     isSpotifyUserLogged: true,
//                     userInfo: userData
//                 });
//             });
//         } else {
//             this.setState({
//                 isSpotifyUserLogged: false
//             });
//         }
//     }
// )
}},{key:"render",value:function render(){return react_default.a.createElement(components_DefaultLayout,{isSpotifyUserLogged:this.state.isSpotifyUserLogged,actualPage:this.state.actualPage,onChange:this.transitionateToPage.bind(this)},react_default.a.createElement(components_common_LoadingModal,{showLoadingModal:this.state.showLoadingModal}),react_default.a.createElement(common_AlertDismissable,{alert:this.state.alert,showLoadingModal:this.state.showLoadingModal,resetAlert:this.resetAlert}),this.state.actualPage===enum_pages.PLAYLISTS?react_default.a.createElement(components_AppPages_RecipesPage,this.getPlaylistPageProps()):react_default.a.createElement(components_AppPages_ConfigurePage,this.getConfigurePageProps()));}},{key:"getPlaylistPageProps",value:function getPlaylistPageProps(){return{// isSpotifyUserLogged: this.state.isSpotifyUserLogged,
isSpotifyUserLogged:true,handleResponse:this.handleResponse,showError:this.showError,showMessage:this.showMessage,showLoadingModal:this.showLoadingModal,hideLoadingModal:this.hideLoadingModal};}},{key:"getConfigurePageProps",value:function getConfigurePageProps(){return{isSpotifyUserLogged:this.state.isSpotifyUserLogged,spotifyUserLoggedInfo:this.state.userInfo,showLoadingModal:this.showLoadingModal,hideLoadingModal:this.hideLoadingModal};}},{key:"modifyAlert",value:function modifyAlert(alert){var newAlertObject=this.state.alert;if(alert.error){if(this.state.alert.error.toShow){newAlertObject.error.text=this.state.alert.error.text+' '+alert.error.text;this.setState({alert:newAlertObject});}else{newAlertObject.error.text=alert.error.text;newAlertObject.error.toShow=true;this.setState({alert:newAlertObject});}}else{if(this.state.alert.message.toShow){newAlertObject.message.text=this.state.alert.message.text+' '+alert.message.text;this.setState({alert:newAlertObject});}else{newAlertObject.message.text=alert.message.text;newAlertObject.message.toShow=true;this.setState({alert:newAlertObject});}}}},{key:"resetAlert",value:function resetAlert(){this.setState({alert:{message:{toShow:false,text:''},error:{toShow:false,text:''}}});}},{key:"showLoadingModal",value:function showLoadingModal(){this.setState({showLoadingModal:true});}},{key:"hideLoadingModal",value:function hideLoadingModal(){this.setState({showLoadingModal:false});}}]);return App;}(react_default.a.Component);/* harmony default export */ var src_pages_App = (App_App);
// CONCATENATED MODULE: ./src/pages/serviceWorker.js
// This optional code is used to register a service worker.
// register() is not called by default.
// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.
// To learn more about the benefits of this model and instructions on how to
// opt-in, read http://bit.ly/CRA-PWA
var isLocalhost=Boolean(window.location.hostname==='localhost'||// [::1] is the IPv6 localhost address.
window.location.hostname==='[::1]'||// 127.0.0.1/8 is considered localhost for IPv4.
window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function register(config){if( true&&'serviceWorker'in navigator){// The URL constructor is available in all browsers that support SW.
var publicUrl=new URL("",window.location.href);if(publicUrl.origin!==window.location.origin){// Our service worker won't work if PUBLIC_URL is on a different origin
// from what our page is served on. This might happen if a CDN is used to
// serve assets; see https://github.com/facebook/create-react-app/issues/2374
return;}window.addEventListener('load',function(){var swUrl="".concat("","/service-worker.js");if(isLocalhost){// This is running on localhost. Let's check if a service worker still exists or not.
checkValidServiceWorker(swUrl,config);// Add some additional logging to localhost, pointing developers to the
// service worker/PWA documentation.
navigator.serviceWorker.ready.then(function(){console.log('This web app is being served cache-first by a service '+'worker. To learn more, visit http://bit.ly/CRA-PWA');});}else{// Is not localhost. Just register service worker
registerValidSW(swUrl,config);}});}}function registerValidSW(swUrl,config){navigator.serviceWorker.register(swUrl).then(function(registration){registration.onupdatefound=function(){var installingWorker=registration.installing;if(installingWorker==null){return;}installingWorker.onstatechange=function(){if(installingWorker.state==='installed'){if(navigator.serviceWorker.controller){// At this point, the updated precached content has been fetched,
// but the previous service worker will still serve the older
// content until all client tabs are closed.
console.log('New content is available and will be used when all '+'tabs for this page are closed. See http://bit.ly/CRA-PWA.');// Execute callback
if(config&&config.onUpdate){config.onUpdate(registration);}}else{// At this point, everything has been precached.
// It's the perfect time to display a
// "Content is cached for offline use." message.
console.log('Content is cached for offline use.');// Execute callback
if(config&&config.onSuccess){config.onSuccess(registration);}}}};};}).catch(function(error){console.error('Error during service worker registration:',error);});}function checkValidServiceWorker(swUrl,config){// Check if the service worker can be found. If it can't reload the page.
fetch(swUrl).then(function(response){// Ensure service worker exists, and that we really are getting a JS file.
var contentType=response.headers.get('content-type');if(response.status===404||contentType!=null&&contentType.indexOf('javascript')===-1){// No service worker found. Probably a different app. Reload the page.
navigator.serviceWorker.ready.then(function(registration){registration.unregister().then(function(){window.location.reload();});});}else{// Service worker found. Proceed as normal.
registerValidSW(swUrl,config);}}).catch(function(){console.log('No internet connection found. App is running in offline mode.');});}function unregister(){if('serviceWorker'in navigator){navigator.serviceWorker.ready.then(function(registration){registration.unregister();});}}
// CONCATENATED MODULE: ./src/pages/index.js
react_dom_default.a.render(react_default.a.createElement(src_pages_App,null),document.getElementById('root'));// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
unregister();

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=index.bundle.js.map