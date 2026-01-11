import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Crown, XCircle, ExternalLink, FileText, CreditCard } from 'lucide-react';
import Link from 'next/link';

interface ChefDocumentCardProps {
  id: string;
  avatar: string;
  idCard: string | null;
  certificates: string | null;
  joinDate: string;
  chefName: string;
  location: string;
  onViewDetails?: () => void;
  onDelete?: () => void;
}

const ChefDocumentCard = ({
  id,
  avatar,
  idCard,
  certificates,
  joinDate,
  chefName,
  location,
  onViewDetails,
  onDelete,
}: ChefDocumentCardProps) => {
  const handleOpenDocument = (documentUrl: string) => {
    if (documentUrl) {
      window.open(documentUrl, '_blank');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const renderDocumentCell = (documentUrl: string | null, documentType: string, icon: React.ReactNode) => {
    return (
      <TableCell>
        {documentUrl ? (
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-2 w-full'>
              <div className='w-8 h-8 bg-red-500 rounded flex items-center justify-center'>
                {icon}
              </div>
              <span className='text-sm text-gray-900'>{documentType}</span>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => handleOpenDocument(documentUrl)}
                className='p-1 ml-auto'
              >
                <ExternalLink size={14} />
              </Button>
            </div>
          </div>
        ) : (
          <p className='text-center w-full text-gray-500'>No {documentType.toLowerCase()} uploaded</p>
        )}
      </TableCell>
    );
  };

  return (
    <TableRow className='hover:bg-gray-50'>
      {/* Chef ID */}
      <TableCell className='  text-gray-600'>
        <div className='w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-100'>
          <img
            src={
              avatar ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjKNpeICypw6HglgXH9dwb2Uj4rG0eH9DXcQ&s'
            }
            alt={chefName}
            className='w-full h-full object-cover'
          />
        </div>
      </TableCell>
      <TableCell className='text-sm text-gray-600'>
        <Link href={`/chef/${id}`}>{id.slice(id.length - 4)}</Link>
      </TableCell>

      {/* ID Card */}
      {renderDocumentCell(idCard, 'ID Card', <CreditCard className='text-white text-xs' size={16} />)}

      {/* Certificates */}
      {renderDocumentCell(certificates, 'Certificates', <FileText className='text-white text-xs' size={16} />)}

      {/* Join Date */}
      <TableCell className='text-sm text-gray-600'>{formatDate(joinDate)}</TableCell>

      {/* Chef Name */}
      <TableCell>
        <div className='flex items-center gap-2'>
          <Crown className='w-4 h-4 text-yellow-500' />
          <span className='text-sm text-gray-900'>{chefName}</span>
        </div>
      </TableCell>

      {/* Location */}
      <TableCell className='text-sm text-gray-600'>{location}</TableCell>

      {/* Actions */}
      <TableCell>
        <div className='flex items-center gap-2 justify-end'>
          <Button
            variant='ghost'
            size='sm'
            onClick={onViewDetails}
            className='text-green-600 bg-green-100 rounded-full px-5 py-4 hover:text-green-700 hover:bg-green-200'
          >
            View details
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={onDelete}
            className='w-8 h-8 text-red-500 hover:text-red-600 hover:bg-red-50'
          >
            <XCircle size={16} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ChefDocumentCard;
