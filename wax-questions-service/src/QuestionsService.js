import { Service } from 'wax-prosemirror-core';
import EssayService from './EssayService/EssayService';
import FillTheGapQuestionService from './FillTheGapQuestionService/FillTheGapQuestionService';
import MatchingService from './MatchingService/MatchingService';
import MultipleDropDownService from './MultipleDropDownService/MultipleDropDownService';
import QuestionsDropDownToolGroupService from './QuestionsDropDownToolGroupService/QuestionsDropDownToolGroupService';
import MultipleChoiceQuestionService from './MultipleChoiceQuestionService/MultipleChoiceQuestionService';

class QuestionsService extends Service {
  name = 'QuestionsService';

  dependencies = [
    new MultipleChoiceQuestionService(),
    new EssayService(),
    new FillTheGapQuestionService(),
    new MatchingService(),
    new MultipleDropDownService(),
    new QuestionsDropDownToolGroupService(),
  ];
}

export default QuestionsService;
