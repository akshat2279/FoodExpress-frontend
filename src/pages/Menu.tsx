import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import useInfiniteScroll from '../hooks/useInfiniteScrollLatest';
import { getMenu } from '../services/api';

import { MenuCard } from '../components/Menu/MenuCard';

import type { MenuItem } from '../types';

import { APP_LABELS } from '../constants/appConstants';

export const Menu = () => {
  const { data, loading, hasMore, loadMore, fetchData } = useInfiniteScroll<
    { offset?: number; limit?: number },
    MenuItem
  >({
    apiParams: { offset: 0, limit: 50 },
    apiService: getMenu,
    limit: 10,
  });

  useEffect(() => {
    fetchData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{APP_LABELS.LOADING_MENU}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">{APP_LABELS.OUR_MENU}</h2>
        <p className="text-gray-600">
          {APP_LABELS.MENU_DESCRIPTION}
        </p>
      </div>

      <InfiniteScroll
        dataLength={data.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          </div>
        }
        endMessage={
          <p className="text-center text-gray-600 py-4">
            {data?.length > 0 ? APP_LABELS.NO_MORE_ITEMS : APP_LABELS.NO_ITEMS_AVAILABLE}
          </p>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
