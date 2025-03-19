import { IPaginationOptions } from '../types/pagination';

const calculatePagination = (options: IPaginationOptions) => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);

  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';
  
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

const customPaginationInfo = (query:Record<string,any>,total:number)=>{

  const limit = Number(query?.limit) || 10;
  const page = Number(query?.page) || 1;
  const totalPage = Math.ceil(total / limit);

  return {
    total,
    limit,
    page,
    totalPage,
  };
}

const paginateArray = (array: any[], query:Record<string,any>) => {
  let limit = Number(query?.limit) || 10;
  let page = Number(query?.page) || 1;
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const arr = array.slice(startIndex, endIndex)
  const total = arr.length;
  return {
      data:arr ,
      pagination: {
          total,
          page,
          limit,
          totalPage: Math.ceil(total / limit),
      }
  };
};

export const paginationHelper = {
  calculatePagination,
  customPaginationInfo,
  paginateArray
};
