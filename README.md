<div width="100%" align="center">
  <h1>Wax Editor</h1>
</div>

| [![MIT license](https://img.shields.io/badge/license-MIT-e51879.svg)](https://gitlab.coko.foundation/wax/wax-prosemirror/raw/master/LICENSE) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |

This application is being developed by the [Coko Foundation](https://coko.foundation/), for the [University of California Press](http://www.ucpress.edu/) as part of the [Editoria](https://gitlab.coko.foundation/editoria/editoria/) application.

Wax Editor is build against Prosemirror libraries. Check Prosemirror [website](https://prosemirror.net/) and [GitHub repo](https://github.com/ProseMirror) for more information. 


Wax depends on the following libraries.
  

*  React for the view(ui)

*  Styled-components for theming and styling.

*  Inversify.io as service containers

## Introduction

<h2> wax-prosemirror-core </h2>

The role of wax-core is

*  Mount a prosemirror instance

*  Initiate default services (link)
        
    1.  LayoutService 
    
    2.  SchemaService
        
    3.  MenuService
        
    4.  RulesService
        
    5.  ShortCutsService

A big part of wax-core is the application layer(link), which is responsible for the application’s lifecycle by registering and booting services, merging configs, using the schema 
and gathering all prosemirror plugins.
For more information about Default Services and services in general visit (link)
Holds some default prosemirror plugins that are necessary like the dropCursor, gapCursor, history and some optional  as the placeholder.


<h2> wax-prosemirror-schema </h2>

Holds all the nodes and marks currently supported by Wax. You can either have a node/mark in “Wax node/mark structure” or a default prosemirror node/mark. 
For more information on how a Wax node/mark is different check the SchemaService(link)

<h2> wax-prosemirror-components </h2>

React components to support  various features of the editor from buttons to overlays to comment discussions etc. right now really basic (link)


<h2> wax-prosemirror-themes </h2>
**TO DO**

<h2> wax-prosemirror-layouts </h2>
Holds different layouts of the editor. Through the layout service you can configure the areas of different components (as an example see EditoriaLayout -link-)

<h2> wax-prosemirror-utilities </h2>
 **TO DO HELPERS**
 
  <h2> Editors </h2>
 
 Editors are private pakages inside the monorepo, for development/demo purposes.

 <h2> wax-prosemirror-services</h2>
 Service providers are the central place of Wax bootstrapping. Your own services, as well as all of Wax's core services are bootstrapped via application provider and are initiated before everything else.

But, what do we mean by "bootstrapped"? In general, we mean registering things, including registering service container bindings and event listeners. Service providers are the central place to configure your application.

If you open [editoria's config file]( https://gitlab.coko.foundation/wax/wax-prosemirror/blob/wax-plugins/editors/editoria/src/config/config.js), 
you will see the config file where you can configure the extra services (apart from those Wax will load on init) of your editor.
These are all of the service provider classes that will be loaded for your application. 
  
    
In the following overview we will see how to write our own service providers and register them within the Editor.
    

<h3>Writing Service Providers</h2>

All service providers extend the [Service](https://gitlab.coko.foundation/wax/wax-prosemirror/blob/wax-plugins/wax-prosemirror-core/src/services/Service.js) class. Most service providers contain a register and a boot method. Within the register method, you should only bind things into the service container.

<h3>The Register Method</h3>

Let’s take a look  at a simple service like the StrongService. Within any of your service provider methods, you always have access to the config and schema properties and also you have access to the service container using [inversify.io](http://inversify.io/).

```
import { toggleMark } from "prosemirror-commands";
import Service from "wax-prosemirror-core/src/services/Service";
import { strongMark } from "wax-prosemirror-schema";
import Strong from "./Strong";

class StrongService extends Service {
  boot() {
    const shortCuts = this.container.get("ShortCuts");
    shortCuts.addShortCut({ "Mod-b": toggleMark(this.schema.marks.strong) });
  }

  register() {
    this.container.bind("Strong").to(Strong);
    const createMark = this.container.get("CreateMark");
    createMark(
      {
        strong: strongMark
      },
      { toWaxSchema: true }
    );
  }
}

export default StrongService;
```
This service provider defines a register method, it registers a class and in this case is the strong tool. For more information on how to use service container check inversify.io documentation. 

A slightly more complicated example could be the ShortCutsService register method.
```
register() {
    const PmPlugins = this.app.PmPlugins;
    this.container
      .bind("ShortCuts")
      .toDynamicValue(() => {
        const { schema: { schema } } = this.app;

        return new ShortCuts(PmPlugins, schema);
      })
      .inSingletonScope();
  }
```

In the above example we bind  ShortCuts to a factory method which injects PmPlugins and schema into ShortCuts class.


### The Boot Method

So, what if we need to register a view component within our service provider? This should be done within the boot method. This method is called after all other service providers have been registered, meaning you have access to all other services that have been registered.

In the StrongService when the boot method is called all other services will have been registered, so we get the ShortCuts Service and execute a method for registering a new ShortCut.

Another example could be the MenuSerivce  (link)

```
boot() {
    const { menus } = this.container.get("MenuCollection");
    const layout = this.container.get("Layout");
    menus.forEach(menu => {
      layout.addComponent(menu.config.templateArea, menu.render());
    });
  }
```
In Menu’s boot method we get Layout and we add components to the already defined areas from our Layout.


### Extra functionalities include


1. Registering Services from within a Service. 

```
class InlineAnnotationsService extends Service {
  dependencies = [
  new CodeService(),
  new StrongService(),
  new EmphasisService(),
  new SubscriptService(),
  new SuperscriptService(),
  new StrikeThroughService(),
  new UnderlineService(),
  new SmallCapsService()
];
}
```



2. Within any of your service provider methods, you always have access to the app, config properties . 
3. Dependant functionality between services. An example of the dependency between two services is linkService(link) and OverLayService (links) where OverLayService registers a function 
   that adds a component to the overlay area and LinkService calls OverLay and adds it’s component. ShortCut Service could be another example where each of the services like Strong, paragraph etc can call it to add a shortcut.

## Core Services

### SchemaService

Schema service enable us to add marks and nodes into prosemirror. We have two functions for that scope CreateNode and CreateMark.
In prosemirror all attributes are in the node so you might have on the same node a class , href, user attribute etc. This attributes might be used from different services. 

So for example on the pararaph node Service A adds the class attribute while Service B adds the user attribute. 
If you only use Service A the user attribute still exists in the schema for that node. 
So if we want to add the user attribute only through service B , we have “toWaxSchema” option .

Service A register method.
```
  CreateNode({
        paragraph: {
          group: "block",
          content: "inline*",
          attrs: {
            class: { default: "paragraph" }
          },
          parseDOM: {
            tag: "p.paragraph",
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook.dom.getAttribute("class")
              });
              next();
            }
          },
          toDOM(hook, next) {
            const attrs = { class: hook.node.attrs.class };
    
            hook.value = ["p", attrs, 0];
            next();
          }
        }
      },{ toWaxSchema: true })
```

Service B register method.

```
     CreateNode({
        paragraph: {
          group: "block",
          content: "inline*",
          attrs: {
            user: { default: [] }
          },
          parseDOM: {
            tag: "p.paragraph",
            getAttrs(hook, next) {
              Object.assign(hook, {
                user: parseUser(hook.dom.dataset.user)
              });
              next();
            }
          },
          toDOM(hook, next) {
            Object.assign(hook.value[1], {
              "data-track": JSON.stringify(hook.node.attrs.user)
            });
            next();
          }
        }
      },{ toWaxSchema: true })
```

If the above 2 services are registed SchemaService will merge those 2 nodes into a single prosemirror one having both attributes. 

LayoutService


This service enables us to set a layout for the editor. Internally Wax calls the setLayout method to apply a layout. How can you write your own layout. (link editoria layout). 

A layout is a react component which has a prop the mounted prosemirror instance in order to place within the layout. You can also have your own “Areas”. For example in EditoriaLayout we have the following 

```
const LeftSideBar = componentPlugin("leftSideBar");
const RightSideBar = componentPlugin("rightSideBar");
const TopBar = componentPlugin("topBar");
const BottomBar = componentPlugin("bottomBar");
const WaxOverlays = componentPlugin("waxOverlays");

const EditoriaLayout = ({ editor }) => {
  return (
    <ThemeProvider theme={cokoTheme}>
      <LayoutWrapper>
        <MainMenuContainer>
          <MainMenuInner>
            <TopBar />
          </MainMenuInner>
        </MainMenuContainer>
        <WaxSurfaceContainer>
          <SideMenuContainer>
            <SideMenuInner>
              <LeftSideBar />
            </SideMenuInner>
          </SideMenuContainer>
          <WaxSurfaceScroll className="wax-surface-scroll">
            {editor}
            <WaxOverlays />
          </WaxSurfaceScroll>
          <RightSideBar />
        </WaxSurfaceContainer>
        <BottomBar />
        <InfoArea />
      </LayoutWrapper>
    </ThemeProvider>
  );
};
```


 `<LeftSideBar />` is placed accordingly to our design in the left of the editor as ui element.
So we define a “leftSideBar” area. Area is like a “tag” for the editor so it knows where to place certain components. So by defining the leftSideBar Area we can use that area in our services to add components into it.





An example of using areas in editoria config.

```
MenuService: [
    {
      templateArea: "topBar",
      toolGroups: ["Base", "Annotations", "Lists", "Images", "Tables"]
    },
    {
      templateArea: "leftSideBar",
      toolGroups: ["Display"]
    }
  ],
```


Lastly Layout has a core method which is called ComponentPlugin. Is used in order to render the components to the area and to provide the view state of the editor in order to get updates.


### ShortCuts Service
**TO DO**

### Rules Service
**TO DO**


### Menu Service

Is used for adding menus to the editor. **TO DO How to create a group/tool and add it to the menu.**
     

## Get up and running

Run a local version of the editor
  
1)  `git@gitlab.coko.foundation:wax/wax-prosemirror.git`
  
2) `yarn with node > 11`
  
3) `yarn editoria` Will bring up a demo of the Editoria Ediitor

4) `yarn default` Will bring up a basic version will only an editing surface accepting paragragraphs

Scripts: `yarn` , `yarn clean`, `yarn reset`
