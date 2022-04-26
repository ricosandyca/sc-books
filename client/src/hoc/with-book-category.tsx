import { Center, Spinner } from '@chakra-ui/react';
import { FC, ComponentType } from 'react';

import { useCategoryListFetcher } from '~/hooks/use-category';

// globally load categories data from API
export function withBookCategory<T>(Content: ComponentType<T>): FC<T> {
  return function ContainerContent(props: T) {
    const { isLoading } = useCategoryListFetcher();

    if (isLoading)
      return (
        <Center w="full" h="100vh">
          <Spinner size="xl" />
        </Center>
      );

    return <Content {...props} />;
  };
}
