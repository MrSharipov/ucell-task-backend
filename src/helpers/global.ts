import { HttpStatus } from '@nestjs/common';

export enum DefaultStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  DELETED = 2,
  BLOCKED = 3,
}

export interface IServiceResponse<T> {
  data: T | any;
  messages: Array<string>;
  statusCode: HttpStatus;
  time: Date | string;
}

export const appGenerateResponse = <T>(
  data: T = null,
  messages: string[] = [],
  statusCode: HttpStatus = HttpStatus.OK,
): IServiceResponse<T> => {
  return {
    data,
    messages,
    statusCode,
    time: new Date(),
  };
};

export interface ICrudListResponse<T> {
  list: Array<T>;
  pagination: IListPagination;
}

export interface IListPagination {
  total_count: number;
  total_pages: number;
  current_page: number;
  limit: number;
}

export const appGenerateCrudListResponse = <T>(
  list: Array<T> = [],
  pagination: IListPagination,
): ICrudListResponse<T> => {
  return {
    list,
    pagination,
  };
};

export const appGenerationPaginate = (
  total_count: number,
  page: number,
  limit: number,
): IListPagination => {
  return {
    total_count: total_count,
    total_pages: Math.ceil(total_count / limit),
    current_page: page,
    limit,
  };
};

export interface IAnyObject {
  [key: string]: any;
}

export const generateDefaultQueryFilters = <TQuery, TWhere>(
  query: TQuery,
  where: TWhere,
  filterList: Array<string> = [],
  searchList: Array<string> = [],
  defaultValues: IAnyObject = {},
  searchBy = 'id',
): TWhere => {
  filterList.forEach((item: string) => {
    if (typeof query[item] !== 'undefined' && query[item] !== null) {
      where[item] = query[item];
    }
  });
  if (query['statusList'] && query['statusList'].length > 0) {
    where['status'] = { in: query['statusList'] };
  }

  if (query['exclude'] && query['exclude'].length > 0) {
    where[searchBy] = { notIn: query['exclude'] };
  }
  if (query['include'] && query['include'].length > 0) {
    where[searchBy] = { in: query['include'] };
  }
  for (const key in defaultValues) {
    if (typeof query[key] === 'undefined') {
      where[key] = defaultValues[key];
    }
  }
  if (
    searchList.length > 0 &&
    typeof query['search'] !== 'undefined' &&
    !!query['search']
  ) {
    if (searchList.length === 1) {
      where[searchList[0]] = {
        contains: query['search'],
        mode: 'insensitive',
      };
    } else {
      where['AND'] = {
        OR: searchList.map((key) => {
          return {
            [key]: {
              contains: query['search'],
              mode: 'insensitive',
            },
          };
        }),
      };
    }
  }
  return where;
};
