import { X, MapPin, ExternalLink, CreditCard, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ChefProfileCardProps {
  isOpen: boolean;
  onClose: () => void;
  chef: any;
}

const ChefProfileCard = ({ isOpen, onClose, chef }: ChefProfileCardProps) => {
  const handleOpenDocument = (documentUrl: string, fileName: string) => {
    console.log('Opening document:', { documentUrl, fileName });
    if (documentUrl) {
      window.open(documentUrl, '_blank');
      console.log('Document opened in new tab');
    } else {
      console.log('No document URL provided for:', fileName);
    }
  };

  const renderDocumentSection = (documentUrl: string | null, documentType: string, icon: React.ReactNode) => {
    return (
      <div className='shadow-lg p-2 rounded-lg'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          {documentType}
        </label>
        <div className=' rounded-md px-3 py-2'>
          {documentUrl ? (
            <div className='flex items-center gap-2'>
              <div className='w-6 h-6 bg-red-500 rounded flex items-center justify-center'>
                {icon}
              </div>
              <span className='text-sm text-gray-900'>{documentType}</span>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => handleOpenDocument(documentUrl, `${documentType.toLowerCase()}.pdf`)}
                className='p-1 ml-auto'
              >
                <ExternalLink size={14} />
              </Button>
            </div>
          ) : (
            <p className='text-sm text-gray-500'>No {documentType.toLowerCase()} uploaded</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className=' w-full max-h-[90vh] overflow-y-auto p-0'>
        <DialogTitle className="DialogTitle text-2xl pl-8 pt-4">Profile</DialogTitle>
        <div className='relative bg-white rounded-lg'>

          {/* Profile Header */}
          <div className='p-6 pb-4'>
            <div className='flex items-start gap-4 mb-6'>
              <div className='w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-gray-100'>
                <img
                  src={
                    chef?.profilePicture ||
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjKNpeICypw6HglgXH9dwb2Uj4rG0eH9DXcQ&s'
                  }
                  alt={`${chef?.firstName} ${chef?.lastName}`}
                  className='w-full h-full object-cover'
                />
              </div>
            </div>

            {/* Profile Details Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
              {/* First Name */}
              <div className='shadow-lg p-2 rounded-lg'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  First Name
                </label>
                <div className=' rounded-md py-2'>
                  <span className='text-sm text-gray-900'>
                    {chef?.firstName || '-'}
                  </span>
                </div>
              </div>

              {/* Last Name */}
              <div className='shadow-lg p-2 rounded-lg'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Last Name
                </label>
                <div className=' rounded-md py-2'>
                  <span className='text-sm text-gray-900'>
                    {chef?.lastName || '-'}
                  </span>
                </div>
              </div>

              {/* Phone Number */}
              <div className='shadow-lg p-2 rounded-lg'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Phone Number
                </label>
                <div className=' rounded-md py-2'>
                  <span className='text-sm text-gray-900'>
                    {chef?.phoneNumber || '-'}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className='shadow-lg p-2 rounded-lg'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Email
                </label>
                <div className=' rounded-md  py-2'>
                  <span className='text-sm text-gray-900'>{chef?.email || '-'}</span>
                </div>
              </div>

              {/* Achievements */}
              <div className='shadow-lg p-2 rounded-lg'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Achievements
                </label>
                <div className=' rounded-md px-3 py-2'>
                  <div className='flex gap-1'>
                    {chef?.chef?.achievements?.length > 0 ? chef?.chef?.achievements?.map(
                      (achievement: any, index: number) => (
                        <div
                          key={index}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            achievement === 'gold'
                              ? 'bg-yellow-400 text-yellow-900'
                              : achievement === 'silver'
                                ? 'bg-gray-300 text-gray-700'
                                : 'bg-orange-400 text-orange-900'
                          }`}
                        >
                          {achievement === 'gold'
                            ? '🥇'
                            : achievement === 'silver'
                              ? '🥈'
                              : '🥉'}
                        </div>
                      ),
                    ) : (
                      <p>-</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className='shadow-lg p-2 rounded-lg'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Location
                </label>
                <div className=' rounded-md py-2 flex flex-wrap gap-1'>
                  {chef?.chef?.locations?.length > 0 ? chef?.chef?.locations?.map(
                    (loc: { name: string }, index: number) => (
                      <span
                        key={index}
                        className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded'
                      >
                        {loc?.name}
                      </span>
                    ),
                  ) : (
                    <p>-</p>
                  )}
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
              {/* ID Card */}
              {renderDocumentSection(
                chef?.chef?.idCard,
                'ID Card',
                <CreditCard className='text-white text-xs' size={16} />
              )}

              {/* Certificates */}
              {renderDocumentSection(
                chef?.chef?.certificates,
                'Certificates',
                <FileText className='text-white text-xs' size={16} />
              )}
            </div>

            {/* Chef Bio */}
            <div className='shadow-lg p-2 rounded-lg'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Chef Bio
              </label>
              <div className=' rounded-md p-3'>
                <p className='text-sm text-gray-700 leading-relaxed'>
                  {chef?.chef?.bio || 'No bio available'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChefProfileCard;
