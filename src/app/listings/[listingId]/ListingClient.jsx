'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Reservation } from '@prisma/client';
import { eachDayOfInterval } from 'date-fns';

import { categories } from '@/app/components/navbar/Categories';
import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import useLoginModal from '@/app/hooks/useLoginModal';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

const ListingClient = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates = [];
    reservations.forEach((item) => {
      const range = eachDayOfInterval({
        start: new Date(item.startDate),
        end: new Date(item.endDate)
      });

      dates = [...dates, ...range];
      return dates;
    })
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);

  const category = useMemo(() => {
    return categories.find(item => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient;
