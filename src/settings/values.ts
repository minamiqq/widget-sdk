// Типы, используемые в значениях элементов управления.

import type { TNullable } from "../utilityTypes";

export enum EWidgetFilterMode {
  DEFAULT = "DEFAULT",
  SINGLE = "SINGLE",
  MULTI = "MULTI",
  DISABLED = "DISABLED",
}

export type TWidgetFiltering =
  | { ignore: true; mode: EWidgetFilterMode.SINGLE | EWidgetFilterMode.MULTI }
  | { ignore: false; mode: EWidgetFilterMode };

export enum EMarkdownDisplayMode {
  NONE = "NONE",
  INDICATOR = "INDICATOR",
}

export enum EDisplayConditionMode {
  DISABLED = "DISABLED",
  FORMULA = "FORMULA",
  VARIABLE = "VARIABLE",
}

/** Условие отображения для компонента и меры */
export type TDisplayCondition =
  | {
      mode: EDisplayConditionMode.DISABLED;
    }
  | {
      mode: EDisplayConditionMode.FORMULA;
      formula: TNullable<string>;
    }
  | {
      mode: EDisplayConditionMode.VARIABLE;
      variableName: TNullable<string>;
      variableValue: TNullable<string>;
    };

export interface IRange {
  unit?: string;
  min?: number;
  max?: number;
}

export enum EFontWeight {
  NORMAL = "NORMAL",
  BOLD = "BOLD",
}

export interface IAppearanceSettings {
  enabled?: boolean;
  horizontalPaddings?: string;
  verticalPaddings?: string;
  cornerRadius?: string;
}
