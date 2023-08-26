import { AcademicSemester, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
// import { IGenericErrorResponse } from '../../../interfaces/common';

const prisma = new PrismaClient();

const createAcademicSemester = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data,
  });

  return result;
};

const getAllSemesters = async (filters, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.academicSemester.findMany({
    skip,
    take: limit,
  });

  const total = await prisma.academicSemester.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemesters,
};
