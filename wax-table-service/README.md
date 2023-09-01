## Wax Table package

Wax Table Package is a fork of [prosemirror-tables](https://github.com/ProseMirror/prosemirror-tables) with added Table Caption 
funcionality

## How to use

### Editor's config

```
import { TablesService, tableEditing, columnResizing } from 'wax-table-service';
```

### Styles(preferably in your layout)

```
import 'wax-table-service/dist/index.css'
```


### Tools

```
MenuService: [
    {
      templateArea: 'mainMenuToolBar',
      toolGroups: [
        'Tables',
      ],
    },
  ],

```

### ProseMirror Plugins

In case you need tableEditing or columnResizing plugins add the to the array of `PmPlugins` in your editor's config
```
 PmPlugins: [
    tableEditing(),
    columnResizing(),
  ],
```

### Start the Service

```
 services: [
    new TablesService(),
  ]
```


