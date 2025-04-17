import type { TExtendedFormulaFilterValue } from "./filtration";
import type { IAutoIdentifiedArrayItem } from "./settings/baseWidget";
import type { TColor } from "./color";

export enum EWidgetActionInputMethod {
  COLUMN = "COLUMN",
  VARIABLE = "VARIABLE",
  STATIC_LIST = "STATIC_LIST",
  DYNAMIC_LIST = "DYNAMIC_LIST",
  FORMULA = "FORMULA",
  MANUALLY = "MANUALLY",
  EVENT = "EVENT",
  START_EVENT = "START_EVENT",
  FINISH_EVENT = "FINISH_EVENT",
  AGGREGATION = "AGGREGATION",
  DATA_MODEL = "DATA_MODEL",
}

export enum EActionTypes {
  OPEN_URL = "OPEN_URL",
  UPDATE_VARIABLE = "UPDATE_VARIABLE",
  EXECUTE_SCRIPT = "EXECUTE_SCRIPT",
  OPEN_VIEW = "OPEN_VIEW",
}

export enum EViewMode {
  EXISTED_VIEW = "EXISTED_VIEW",
  GENERATED_BY_SCRIPT = "GENERATED_BY_SCRIPT",
  EMPTY = "EMPTY",
}

export enum EViewOpenIn {
  NEW_WINDOW = "NEW_WINDOW",
  CURRENT_WINDOW = "CURRENT_WINDOW",
  PLACEHOLDER = "PLACEHOLDER",
  MODAL_WINDOW = "MODAL_WINDOW",
  DRAWER_WINDOW = "DRAWER_WINDOW",
}

export enum EDrawerPlacement {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export enum EAutoUpdateMode {
  NONE = "NONE",
  THIS_WIDGET = "THIS_WIDGET",
  ALL_WIDGETS = "ALL_WIDGETS",
}

export enum EDataModelOption {
  TABLE_LIST = "TABLE_LIST",
  COLUMN_LIST = "COLUMN_LIST",
}

export interface IParameterFromColumn {
  inputMethod: EWidgetActionInputMethod.COLUMN;
  tableName: string;
  columnName: string;
}

export interface IParameterFromVariable {
  inputMethod: EWidgetActionInputMethod.VARIABLE;
  sourceVariable: string;
}

export interface IParameterFromFormula {
  inputMethod: EWidgetActionInputMethod.FORMULA;
  formula: string;
}

export interface IParameterFromAggregation {
  inputMethod: EWidgetActionInputMethod.AGGREGATION;
  formula: string;
}

export interface IParameterFromEvent {
  inputMethod: EWidgetActionInputMethod.EVENT;
}

export interface IParameterFromStartEvent {
  inputMethod: EWidgetActionInputMethod.START_EVENT;
}

export interface IParameterFromEndEvent {
  inputMethod: EWidgetActionInputMethod.FINISH_EVENT;
}

export interface IParameterFromManualInput {
  inputMethod: EWidgetActionInputMethod.MANUALLY;
  description: string;
  defaultValue?: string;
  filterByRows?: boolean;
}

export interface IParameterFromStaticList {
  inputMethod: EWidgetActionInputMethod.STATIC_LIST;
  options: string;
  defaultOptionIndexes: number[];
}

export interface IParameterFromDynamicList {
  inputMethod: EWidgetActionInputMethod.DYNAMIC_LIST;
  options: string;
  defaultValue: string;
  displayOptions: string;
  filters: TExtendedFormulaFilterValue[];
  filterByRows?: boolean;
}

interface IParameterFromDataModelBase {
  inputMethod: EWidgetActionInputMethod.DATA_MODEL;
  option: EDataModelOption;
}

export interface IParameterColumnList extends IParameterFromDataModelBase {
  option: EDataModelOption.COLUMN_LIST;
  /* Название параметра, содержащего имя таблицы, от которой зависит текущий параметр   */
  parent: string;
}

export interface IParameterTableList extends IParameterFromDataModelBase {
  option: EDataModelOption.TABLE_LIST;
}

export type TParameterFromDataModel = IParameterColumnList | IParameterTableList;

interface IWidgetActionParameterCommon {
  name: string;
  displayName: string;
  isHidden: boolean;
}

export type TWidgetActionParameter = IWidgetActionParameterCommon &
  (
    | IParameterFromColumn
    | IParameterFromVariable
    | IParameterFromFormula
    | IParameterFromManualInput
    | IParameterFromStaticList
    | IParameterFromDynamicList
    | IParameterFromAggregation
    | TParameterFromDataModel
  );

interface IActionOnClickParameterCommon extends IAutoIdentifiedArrayItem {
  name: string;
}

export type TActionOnClickParameter = IActionOnClickParameterCommon &
  (
    | IParameterFromColumn
    | IParameterFromVariable
    | IParameterFromFormula
    | IParameterFromEvent
    | IParameterFromStartEvent
    | IParameterFromEndEvent
    | IParameterFromAggregation
    | IParameterFromManualInput
    | IParameterFromStaticList
    | IParameterFromDynamicList
    | TParameterFromDataModel
  );

interface IActionCommon extends IAutoIdentifiedArrayItem {
  name: string;
}

export interface IActionGoToUrl extends IActionCommon {
  type: EActionTypes.OPEN_URL;
  url: string;
  newWindow: boolean;
}

export interface IActionRunScript extends IActionCommon {
  type: EActionTypes.EXECUTE_SCRIPT;
  parameters: TActionOnClickParameter[];
  scriptKey: string;
  autoUpdate: EAutoUpdateMode;
}

export interface IActionUpdateVariable extends IActionCommon {
  type: EActionTypes.UPDATE_VARIABLE;
  variables: TActionOnClickParameter[];
}

type TActionOpenIn =
  | {
      openIn: EViewOpenIn.DRAWER_WINDOW;
      alignment: EDrawerPlacement;
    }
  | {
      openIn: EViewOpenIn.PLACEHOLDER;
      placeholderName: string;
    }
  | {
      openIn: EViewOpenIn.NEW_WINDOW;
    }
  | {
      openIn: EViewOpenIn.MODAL_WINDOW;
    }
  | {
      openIn: EViewOpenIn.CURRENT_WINDOW;
    };

export type TActionOpenView = IActionCommon & {
  type: EActionTypes.OPEN_VIEW;
} & (
    | ({
        mode: EViewMode.GENERATED_BY_SCRIPT;
        scriptKey: string;
        parameters: TActionOnClickParameter[];
        displayName: string;
      } & TActionOpenIn)
    | ({
        mode: EViewMode.EXISTED_VIEW;
        viewKey: string;
        parameters: TActionOnClickParameter[];
      } & TActionOpenIn)
    | ({
        mode: EViewMode.EMPTY;
        placeholderName: string;
      } & Extract<TActionOpenIn, { openIn: EViewOpenIn.PLACEHOLDER }>)
  );

export type TActionsOnClick =
  | IActionGoToUrl
  | IActionRunScript
  | IActionUpdateVariable
  | TActionOpenView;

export enum EBlockingConditionMode {
  FORMULA = "FORMULA",
  VARIABLE = "VARIABLE",
}

export interface IWidgetAction extends IActionCommon {
  parameters: TWidgetActionParameter[];
  type: EActionTypes.EXECUTE_SCRIPT;
  scriptKey: string;
  autoUpdate: EAutoUpdateMode;
  description: string;
  blockingCondition:
    | {
        mode: EBlockingConditionMode.FORMULA;
        formula: string;
      }
    | {
        mode: EBlockingConditionMode.VARIABLE;
        variableName: string;
        variableValue: string;
      };
  buttonType: EActionButtonsTypes;
  backgroundColor?: TColor;
  borderColor?: TColor;
  color: TColor;
}

export type TAction = TActionsOnClick | IWidgetAction;

export type TActionValidator = (action: TAction) => boolean;

export enum EActionButtonsTypes {
  LINK = "link",
  BASE = "primary",
  SECONDARY = "primary-outlined",
}
