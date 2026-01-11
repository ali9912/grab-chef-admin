'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { FC, useState } from 'react';
import editIcon from '../../../../../../../public/assets/icons/edit.svg';
import trashIcon from '../../../../../../../public/assets/icons/trash.svg';

import { DataTable } from '@/common/components/table-components/data-table';
import {
  AttendeeTableProps,
  CreatePropertyResponse,
} from '@/common/types/interfaces/project/property-management';
import { PropertyTypeEnum } from '@/common/types/enums/project/property-management';

const AttendeeTable: FC<AttendeeTableProps> = ({
  rowsPerPage,
  setRowsPerPage,
  currentPage,
  setCurrentPage,
  total,
  rowsOption,
  totalPages,
  data,
  setEditModal,
  setDiscardModal,
  fallback,
  isLoading,
  setProperty,
}) => {
  const [selectedProperties, setSelectedProperties] = useState<string[]>();

  const types = Object.entries(PropertyTypeEnum).map(([key, value]) => {
    return {
      label: key,
      value: value,
    };
  });

  const columns: ColumnDef<Partial<CreatePropertyResponse>>[] = [
    {
      id: 'select',
      accessorKey: '',
      header: () => null,
      cell: ({ row }) => {
        return (
          <Checkbox
            className='cursor-pointer'
            checked={
              (row.original.id &&
                selectedProperties?.includes(row.original.id)) ||
              false
            }
            onCheckedChange={value => {
              if (value) {
                setSelectedProperties((prev = []) => {
                  if (row.original.id) {
                    return [...prev, row.original.id];
                  }
                });
              } else {
                setSelectedProperties(prev =>
                  prev?.filter(id => id !== row.original.id),
                );
              }
            }}
          />
        );
      },
    },
    {
      accessorKey: 'property_name',
      header: 'Property Name',
      cell: ({ row }) => {
        return <div>{row.original.label}</div>;
      },
    },
    {
      accessorKey: 'property_type',
      header: 'Property Type',
      cell: ({ row }) => {
        return (
          <div>
            {types.find(item => item.value === row.original.type)?.label}
          </div>
        );
      },
    },
    {
      accessorKey: 'visibility',
      header: 'Visibility',
      cell: ({ row }) => {
        return <div className='capitalize'>{row.original.visibility}</div>;
      },
    },
    {
      accessorKey: 'action',
      header: 'Actions',
      cell: ({ row }) => {
        return (
          <div className='flex items-center gap-4'>
            <button
              onClick={() => {
                if (setProperty && setEditModal) {
                  setProperty(row.original);
                  setEditModal(true);
                }
              }}
            >
              <Image
                src={editIcon}
                alt='edit-icon'
                className='cursor-pointer'
                height={20}
                width={20}
              />
            </button>
            <button
              onClick={() => {
                if (setDiscardModal) {
                  setDiscardModal(true);
                }
              }}
            >
              <Image
                src={trashIcon}
                alt='trash-icon'
                className='cursor-pointer'
                height={20}
                width={20}
              />
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={total}
        rowsOption={rowsOption}
        totalPages={totalPages}
        fallback={fallback}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AttendeeTable;
