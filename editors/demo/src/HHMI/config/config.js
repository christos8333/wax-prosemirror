import { emDash, ellipsis } from 'prosemirror-inputrules';
import { columnResizing, tableEditing } from 'prosemirror-tables';
import {
  InlineAnnotationsService,
  AnnotationToolGroupService,
  ImageService,
  ImageToolGroupService,
  LinkService,
  ListsService,
  ListToolGroupService,
  TablesService,
  TableToolGroupService,
  BaseService,
  BaseToolGroupService,
  DisplayTextToolGroupService,
  MathService,
  FullScreenService,
  FullScreenToolGroupService,
  MultipleChoiceQuestionService,
  FillTheGapQuestionService,
  QuestionsDropDownToolGroupService,
  EssayService,
  MatchingService,
  MultipleDropDownService,
  ExternalAPIContentService,
} from 'wax-prosemirror-services';

import { DefaultSchema } from 'wax-prosemirror-core';
import invisibles, { hardBreak } from '@guardian/prosemirror-invisibles';

async function ExternalAPIContentTransformation(prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0,
      // max_tokens: 400,
      // n: 1,
      // stop: null,
    }),
  });

  try {
    const data = await response.json();
    console.log(data);
    return data.choices[0].message.content;
  } catch (e) {
    console.error(e);
  } finally {
  }
  return prompt;
}

// async function ExternalAPIContentTransformation(prompt) {
//   const response = await fetch('https://api.openai.com/v1/completions', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: 'text-davinci-003',
//       prompt: prompt,
//       max_tokens: 400,
//       n: 1,
//       stop: null,
//       temperature: 0.5,
//     }),
//   });

//   try {
//     const data = await response.json();
//     console.log(data);
//     return data.choices[0].text.trim();
//   } catch (e) {
//     console.error(e);
//   } finally {
//     console.log('We do cleanup here');
//   }
//   return 'Nothing found';
// }

export default {
  MenuService: [
    {
      templateArea: 'mainMenuToolBar',
      toolGroups: [
        'Base',
        {
          name: 'Annotations',
          // exclude: ['LinkTool'],
          more: [
            'Superscript',
            'Subscript',
            'SmallCaps',
            'Underline',
            'StrikeThrough',
          ],
        },
        'Lists',
        'Images',
        'Tables',
        'AnyStyle',
        'QuestionsDropDown',
        'FullScreen',
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
  ExternalAPIContentService: {
    ExternalAPIContentTransformation: ExternalAPIContentTransformation,
  },

  SchemaService: DefaultSchema,
  RulesService: [emDash, ellipsis],
  ImageService: { showAlt: true },

  PmPlugins: [columnResizing(), tableEditing(), invisibles([hardBreak()])],
  services: [
    new ExternalAPIContentService(),
    new MatchingService(),
    new FillTheGapQuestionService(),
    new MultipleChoiceQuestionService(),
    new QuestionsDropDownToolGroupService(),
    new MultipleDropDownService(),
    new EssayService(),
    new ListsService(),
    new LinkService(),
    new InlineAnnotationsService(),
    new ImageService(),
    new TablesService(),
    new BaseService(),
    new BaseToolGroupService(),
    new TableToolGroupService(),
    new ImageToolGroupService(),
    new AnnotationToolGroupService(),
    new ListToolGroupService(),
    new DisplayTextToolGroupService(),
    new MathService(),
    new FullScreenService(),
    new FullScreenToolGroupService(),
  ],
};
