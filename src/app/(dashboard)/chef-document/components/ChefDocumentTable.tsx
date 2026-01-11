'use client';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ChefDocumentCard from './ChefDocumentCard';
import { useCallback, useEffect, useState } from 'react';
import ChefProfileCard from './ChefProfileCard';
import { getCookie } from 'cookies-next/client';
import axios from 'axios';
import { BASE_API_URL } from '@/common/constants';
import { toast } from 'sonner';

interface ChefDocument {
  id: string;
  avatar: string;
  idCard: string;
  certificates: string;
  joinDate: string;
  chefName: string;
  location: string;
}

const ChefDocumentTable = () => {
  const [selectedChef, setSelectedChef] = useState<ChefDocument | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getChefs = useCallback(async () => {
    try {
      setLoading(true);
      const token = getCookie('token');
      const response = await axios.get(`${BASE_API_URL}/admin/get-chefs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    
      console.log('API Response:', response?.data);
      setData(response?.data?.chef || []);
    } catch (error: any) {
      console.error('Error fetching chefs:', error);
      toast(error?.message || 'Failed to fetch chefs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getChefs();
  }, [getChefs]);

  const handleViewDetails = (documentId: string) => {
    const chef = data.find(doc => doc?._id === documentId);
    if (chef) {
      console.log('Selected Chef:', chef);
      setSelectedChef(chef);
      setIsProfileOpen(true);
    }
  };

  const handleDelete = (documentId: string) => {
    console.log('Delete document:', documentId);
  };

  if (loading) {
    return (
      <div className='w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8'>
        <div className='flex items-center justify-center'>
          <div className='text-lg'>Loading chef documents...</div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className='w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8'>
        <div className='flex items-center justify-center'>
          <div className='text-lg text-gray-500'>No chef documents found</div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full bg-white rounded-lg shadow-sm border border-gray-200'>
      {/* Header */}

      {/* Scrollable Table Container */}
      <div className='w-full overflow-x-auto'>
        <div className='min-w-[1300px]'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[120px]'></TableHead>
                <TableHead className='w-[120px]'>Chef ID</TableHead>
                <TableHead className='w-[250px]'>ID Card</TableHead>
                <TableHead className='w-[250px]'>Certificates</TableHead>
                <TableHead className='w-[200px]'>Join Date</TableHead>
                <TableHead className='w-[150px]'>Chef Name</TableHead>
                <TableHead className='w-[200px]'>Location</TableHead>
                <TableHead className='w-[150px] text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((doc, index) => {
                console.log(`Chef ${index}:`, {
                  id: doc._id,
                  idCard: doc?.chef?.idCard,
                  certificates: doc?.chef?.certificates,
                  name: `${doc.firstName} ${doc.lastName}`
                });
                
                return (
                  <ChefDocumentCard
                    key={`${doc._id}-${index}`}
                    id={doc._id}
                    avatar={doc?.profilePicture || ''}
                    idCard={doc?.chef?.idCard}
                    certificates={doc?.chef?.certificates}
                    joinDate={doc?.createdAt}
                    chefName={`${doc?.firstName || ''} ${doc?.lastName || ''}`.trim()}
                    location={
                      Array.isArray(doc.chef?.locations) &&
                      doc.chef?.locations.length
                        ? doc.chef?.locations[0].name
                        : "N/A"
                    }
                    onViewDetails={() => handleViewDetails(doc._id)}
                    onDelete={() => handleDelete(`${doc.id}`)}
                  />
                );
              })}
            </TableBody>
          </Table>
        </div>

        {selectedChef && (
          <ChefProfileCard
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            chef={selectedChef}
          />
        )}
      </div>
    </div>
  );
};

export default ChefDocumentTable;
