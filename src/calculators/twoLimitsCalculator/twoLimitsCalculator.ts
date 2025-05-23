import type { ISortOrder } from "../../sorting";

import type {
  ICalculator,
  ICalculatorDimensionInput,
  ICalculatorDimensionOutput,
  ICalculatorFilter,
  ICalculatorMeasureInput,
  ICalculatorMeasureOutput,
} from "../calculator";
import type { IExportColumnOrder } from "../calculator/calculator";

export interface ITwoLimitsCalculatorInput {
  /** Разрезы первой группы*/
  dimensionsFirstGroup: ICalculatorDimensionInput[];
  /** Разрезы второй группы */
  dimensionsSecondGroup: ICalculatorDimensionInput[];
  /** Меры */
  measures: ICalculatorMeasureInput[];
  /** Фильтры, использующие WHERE */
  filters: ICalculatorFilter[];
  /** Фильтры, использующие HAVING */
  postFilters?: ICalculatorFilter[];
  /** Лимит мер (будут вычислены первые measuresLimit мер, попавшие под условие отображения) */
  measuresLimit?: number;
  /** Удалять ли строки, в которых значения всех мер пустые */
  isHideEmptyMeasures?: boolean;
  /** Сортировка */
  sortOrders?: ISortOrder[];
  /** Лимит строк */
  limit?: number;
  /** Второй лимит */
  secondLimit?: number;
  /** Смещение при выборе строк */
  offset?: number;
}

export interface ITwoLimitsCalculatorExportInput extends ITwoLimitsCalculatorInput {
  fileName: string;
  columnsOrder: IExportColumnOrder[];
}

export interface ITwoLimitsCalculatorOutput {
  dimensions: Map<string, ICalculatorDimensionOutput>;
  measures: Map<string, ICalculatorMeasureOutput>;
  isValuesEmpty: boolean;
}

export interface ITwoLimitsCalculator
  extends ICalculator<ITwoLimitsCalculatorInput, ITwoLimitsCalculatorOutput> {
  export(input: ITwoLimitsCalculatorExportInput): Promise<void>;
}
