import { PaginationOptions } from "src/support/pagination/pagination-options";

type PaymentMethodFilters = {
  id: number;
  name: string;
};

export class PaymentMethodPaginationOptionsDto extends PaginationOptions {
  constructor(public page: number, protected _perPage: number, public filters: PaymentMethodFilters) {
    super(page, _perPage);
  }

  static fromQueryObject(query: Record<string, string>): PaymentMethodPaginationOptionsDto {
    const {
      page = 1,
      perPage = 10,
      id,
      name,
      ingredientTypeId,
    } = query;

    return new PaymentMethodPaginationOptionsDto(+page, +perPage, {
      id: +id,
      name,
    });
  }
}
