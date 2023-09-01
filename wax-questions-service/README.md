## Wax questions package

1. Multiple Choice and single correct variant

2. True / fallse and single correct variant

3. Matching

4. Essay

5. Multiple dropdowns

6. Fill in the blank

## How to use

### Editor's config

```
import { QuestionsService } from 'wax-questions-service';
```

### Styles(preferably in your layout)

```
import 'wax-questions-service/dist/index.css'
```


### Tools

```
MenuService: [
    {
      templateArea: 'mainMenuToolBar',
      toolGroups: [
        'QuestionsDropDown',
      ],
    },
    {
      templateArea: 'fillTheGap',
      toolGroups: ['FillTheGap'],
    },
    {
      templateArea: 'MultipleDropDown',
      toolGroups: ['MultipleDropDown'],
    },
  ],

```

### Start the Service

```
 services: [
    new QuestionsService(),
  ]
```
