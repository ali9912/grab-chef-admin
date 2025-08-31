'use client';
import { FC, SetStateAction, useState } from 'react';
import ReviewCard from './ReviewCard';

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  review: string;
  date: string;
}

interface IProps {
  selectedReviews: string[];
  setSelectedReviews: React.Dispatch<SetStateAction<string[]>>;
  data: any[];
  setData: React.Dispatch<SetStateAction<any[]>>;
  updateReviewStatus: (reviewId: string, status: boolean) => Promise<void>;
}

const ReviewTable: FC<IProps> = ({
  selectedReviews,
  setSelectedReviews,
  updateReviewStatus,
  data,
}) => {
  const handleSelectReview = (reviewId: string) => {
    setSelectedReviews(prev =>
      prev.includes(reviewId)
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId],
    );
  };

  const handleApprove = async (reviewId: string) => {
    console.log('Approved review:', reviewId);
    await updateReviewStatus(reviewId, true);
  };

  const handleReject = async (reviewId: string) => {
    console.log('Rejected review:', reviewId);
    await updateReviewStatus(reviewId, false);
  };

  return (
    <div className='w-full'>
      {/* Scrollable Container */}
      <div className='w-full overflow-x-auto'>
        <div className='min-w-[800px] bg-white rounded-lg p-4'>
          <div className='space-y-3'>
            {data &&
              Array.isArray(data) &&
              data?.map((review, index) => (
                <ReviewCard
                  key={`${review._id}-${index}`}
                  id={review?._id?.slice(review?._id?.length - 4)}
                  name={`${review?.customer?.firstName} ${review?.customer?.lastName}`}
                  avatar={
                    review?.customer?.profilePicture ||
                    '/lovable-uploads/c8d472db-732b-4c96-9ce2-63db87a64640.png'
                  }
                  statusUpdated={review?.statusUpdated}
                  rating={review.rating}
                  review={review.review}
                  date={`${new Date(review?.createdAt).getDate()}-${new Date(review?.createdAt).getMonth()}-${new Date(review?.createdAt).getFullYear()} `}
                  isSelected={selectedReviews.includes(review._id)}
                  onSelect={() => handleSelectReview(review._id)}
                  onApprove={() => handleApprove(review._id)}
                  onReject={() => handleReject(review._id)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewTable;
