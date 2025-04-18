import type { IWidgetAction } from "../actions";
import type { TExtendedFormulaFilterValue } from "../filtration";
import type { EFontWeight, EWidgetFilterMode } from "./values";
import type { IMarkdownMeasure, IWidgetSortingIndicator } from "../indicators";
import type { TColor } from "../color";

export interface IAutoIdentifiedArrayItem {
  /**
   * Идентификатор, добавляемый системой "на лету" для удобства разработки, не сохраняется на сервер.
   * Гарантируется уникальность id в пределах settings виджета.
   */
  id: number;
}

export interface IBaseWidgetSettings {
  title?: string;
  titleSize?: number;
  titleColor?: TColor;
  titleWeight?: EFontWeight;
  stateName?: string | null;
  showMarkdown?: boolean;
  markdownMeasures?: IMarkdownMeasure[];
  markdownText?: string;
  markdownTextSize?: number;
  filters?: TExtendedFormulaFilterValue[];
  filterMode?: EWidgetFilterMode;
  ignoreFilters?: boolean;
  sorting?: IWidgetSortingIndicator[];
  actions?: IWidgetAction[];
  paddings?: number | string;
}
