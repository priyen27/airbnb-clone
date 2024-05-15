import prisma from "@/app/libs/prismadb";

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeListings = listings.map(item => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (err) {
    throw new Error(err);
  }
}