import { parseSort } from "src/database/utils/sort";
import { PaginationOptions } from "src/support/pagination/pagination-options";

type ClientFilters = {
  id: string;
  name: string;
  email: string;
  status: string;
  phoneNumber: string;
  userStatusCode: string;
};

export class ClientPaginationOptionsDto extends PaginationOptions {
  constructor(
    public page: number,
    protected _perPage: number,
    public filters: ClientFilters,
    public sort: ReturnType<typeof parseSort>
  ) {
    super(page, _perPage);
  }

  static fromQueryObject(query: Record<string, string>): ClientPaginationOptionsDto {
    const {
      page = 1,
      perPage = 10,
      orderBy = '',
      id,
      name,
      email,
      status,
      phoneNumber,
      userStatusCode,
    } = query;
    return new ClientPaginationOptionsDto(+page, +perPage, {
      id,
      name,
      email,
      status,
      phoneNumber,
      userStatusCode
    }, parseSort(orderBy, ['createdAt']));
  }
}
