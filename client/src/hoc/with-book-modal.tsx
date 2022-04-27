import { FC, ComponentType } from 'react';

import BookDetailModal from '~/components/BookDetailModal';

export function withBookModal<T>(Content: ComponentType<T>): FC<T> {
  return function BookModalContent(props: T) {
    return (
      <>
        <BookDetailModal />
        <Content {...props} />
      </>
    );
  };
}
